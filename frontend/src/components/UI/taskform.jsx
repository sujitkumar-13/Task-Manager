import { LuSave } from "react-icons/lu";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Taskform = ({ onClose, task, onUpdate, onAuditRefresh }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description };

    try {
      if (task) {
        const res = await fetch(`${BASE_URL}/tasks/${task._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData)
        });

        if (res.ok) {
          toast.success('Task Updated Successfully');
          onUpdate?.();
          onAuditRefresh?.();
          setTimeout(() => onClose(), 600);
        } else {
          toast.error('Failed to update task');
        }
      } else {
        const res = await fetch(`${BASE_URL}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData)
        });

        if (res.ok) {
          toast.success('Task Created Successfully');
          onUpdate?.();
          onAuditRefresh?.();
          setTimeout(() => onClose(), 600);
        } else {
          toast.error('Failed to create task');
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Server Error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-2 sm:p-0">
      <div className="border bg-[#101624] w-full sm:w-[70%] md:w-[60%] lg:w-[50%] rounded-2xl border-[#2c2f3f]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between border-b border-[#2c2f3f] items-start sm:items-center p-4 sm:p-5">
          <h1 className="text-[20px] sm:text-[22px] font-semibold">
            {task ? "Edit Task" : "Create Task"}
          </h1>
          <button
            type="button"
            className="border-[#2c2f3f] border px-4 py-2 sm:px-5 sm:py-2 rounded-xl text-[16px] sm:text-[18px] hover:bg-[#1b253d] mt-2 sm:mt-0"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {/* Form */}
        <form className="border-b border-[#2c2f3f] p-4 sm:p-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <label htmlFor="title" className="text-[#c4c0c0] text-sm sm:text-base">
              Title
            </label>
            <input
              value={title}
              type="text"
              id="title"
              className="border-[#2c2f3f] border outline-none rounded-xl p-2 sm:p-3 pl-4 sm:pl-5 text-sm sm:text-base"
              placeholder="e.g., Plain sprint backlog"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mt-4 flex flex-col gap-3 pb-24 border-b border-[#2c2f3f]">
            <label htmlFor="description" className="text-[#c4c0c0] text-sm sm:text-base">
              Description
            </label>
            <input
              value={description}
              type="text"
              id="description"
              className="border-[#2c2f3f] border outline-none rounded-xl p-2 sm:p-3 pl-4 sm:pl-5 text-sm sm:text-base"
              placeholder="Add scope, owner, and due dates"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row p-4 sm:p-5 gap-3 justify-end">
            <button
              type="button"
              className="px-4 py-2 sm:px-6 sm:py-2 border border-[#2c2f3f] rounded-2xl hover:bg-[#1b253d]"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex px-4 py-2 sm:px-6 sm:py-2 border border-[#2c2f3f] rounded-2xl items-center gap-2 sm:gap-3 bg-blue-800 hover:bg-blue-900"
            >
              <LuSave className="text-lg sm:text-xl" />
              {task ? "Update Task" : "Save Task"}
            </button>
          </div>
        </form>
      </div>

      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Taskform;
