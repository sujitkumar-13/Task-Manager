const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

connectDB();

async function logAudit(actionType, taskId, updatedContent = "", notes = "-") {
  const logEntry = {
    timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
    action: actionType,
    taskId,
    updatedContent,
    notes,
  };
  await db.collection("auditLogs").insertOne(logEntry);
}

app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return res.status(400).json({ message: "Title and Description required" });

    const count = await db.collection("tasks").countDocuments();
    const newTask = {
      id: `#${count + 1}`,
      title,
      description,
      createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
    };

    await db.collection("tasks").insertOne(newTask);
    await logAudit("Create Task", newTask.id, `title: "${title}", description: "${description}"`);

    res.status(201).json(newTask);
  } catch (error) {
    console.error("POST /tasks error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await db.collection("tasks").find().sort({ _id: -1 }).toArray();
    res.status(200).json(tasks);
  } catch (err) {
    console.error("GET /tasks error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description)
      return res.status(400).json({ message: "Title and Description required" });

    const task = await db.collection("tasks").findOne({ _id: new ObjectId(id) });
    if (!task) return res.status(404).json({ message: "Task not found" });

    await db.collection("tasks").updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, description } }
    );

    await logAudit("Update Task", task.id, `title: "${title}", description: "${description}"`);
    res.status(200).json({ message: "Task updated" });
  } catch (err) {
    console.error("PUT /tasks error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await db.collection("tasks").findOne({ _id: new ObjectId(id) });
    const result = await db.collection("tasks").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      await logAudit("Delete Task", task ? task.id : id, "-");
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    console.error("DELETE /tasks error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/audit", async (req, res) => {
  try {
    const logs = await db.collection("auditLogs").find().sort({ _id: -1 }).toArray();
    res.status(200).json(logs);
  } catch (err) {
    console.error("GET /audit error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = app;
