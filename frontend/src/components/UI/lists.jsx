import { useState } from "react";
import Taskform from "./taskform";

const Lists = ({ currentTasks, fetchTasks, setTasks }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleDelete = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch(`http://localhost:4000/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        if (setTasks) {
          setTasks((prev) => prev.filter((task) => task._id !== taskId));
        }
        if (fetchTasks) fetchTasks();
      } else {
        alert("Failed to delete task");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <>
      {showForm && (
        <Taskform task={editingTask} onClose={handleCloseForm} onUpdate={fetchTasks} />
      )}

      <table className="w-full text-left">
        <thead className="text-[18px] border-b border-[#2c2f3f] text-gray-300">
          <tr>
            <th className="px-6 py-4 font-normal">ID</th>
            <th className="px-6 py-4 font-normal">Title</th>
            <th className="px-6 py-4 font-normal">Description</th>
            <th className="px-6 py-4 font-normal">Created At</th>
            <th className="px-6 py-4 font-normal text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentTasks.map((task) => (
            <tr key={task._id} className="border-b border-[#2c2f3f]">
              <td className="px-6 py-4 font-medium whitespace-nowrap">{task.id}</td>
              <td className="px-6 py-6">{task.title}</td>
              <td className="px-6 py-6 w-[600px]">{task.description}</td>
              <td className="px-6 py-6">{task.createdAt}</td>
              <td className="py-6 flex justify-center gap-3">
                <button
                  onClick={() => handleEdit(task)}
                  className="px-[24px] py-[8px] rounded-lg border border-[#2c2f3f] text-[17px] transition-all hover:bg-[#1b253d] text-[#8FA5C0]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-[16px] py-[6px] rounded-lg bg-red-600/70 hover:bg-red-600 text-white text-[17px] transition-all"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Lists;
