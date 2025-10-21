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
    try {
      const res = await fetch(`http://localhost:4000/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        if (setTasks) setTasks((prev) => prev.filter((t) => t._id !== taskId));
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

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[600px] sm:min-w-full">
          <thead className="text-[16px] sm:text-[18px] border-b border-[#2c2f3f] text-gray-300">
            <tr>
              <th className="px-4 py-2 font-normal">ID</th>
              <th className="px-4 py-2 font-normal">Title</th>
              <th className="px-4 py-2 font-normal">Description</th>
              <th className="px-4 py-2 font-normal">Created At</th>
              <th className="px-4 py-2 font-normal text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="border-b border-[#2c2f3f]">
            {currentTasks.length > 0 ? (
              currentTasks.map((task) => (
                <tr key={task._id} className="border-b border-[#2c2f3f]">
                  <td className="px-4 py-2 font-medium whitespace-nowrap">{task.id}</td>
                  <td className="px-4 py-2">{task.title}</td>
                  <td className="px-4 py-2 max-w-[200px] sm:max-w-[500px] truncate">{task.description}</td>
                  <td className="px-4 py-2">{task.createdAt.split(" ")[0]}</td>
                  <td className="py-2 flex flex-col sm:flex-row justify-center sm:gap-3 gap-2 items-center">
                    <button
                      onClick={() => handleEdit(task)}
                      className="px-4 py-1 sm:px-6 sm:py-2 rounded-lg border border-[#2c2f3f] text-[14px] sm:text-[17px] hover:bg-[#1b253d] text-[#8FA5C0] transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg bg-red-600/70 hover:bg-red-600 text-white text-[14px] sm:text-[17px] transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400 text-sm sm:text-base">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Lists;
