import { LuSave } from "react-icons/lu";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Taskform = ({ onClose, task, onUpdate, onAuditRefresh }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

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
                const res = await fetch(`http://localhost:4000/tasks/${task._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(taskData)
                });

                if (res.ok) {
                    toast.success('Task Updated Successfully');
                    if (onUpdate) onUpdate();             
                    if (onAuditRefresh) onAuditRefresh(); 
                    setTimeout(() => onClose(), 600);
                } else {
                    toast.error('Failed to update task');
                }
            } else {
                const res = await fetch("http://localhost:4000/tasks", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(taskData)
                });

                if (res.ok) {
                    toast.success('Task Created Successfully');
                    if (onUpdate) onUpdate();             
                    if (onAuditRefresh) onAuditRefresh();
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
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
            <div className="border bg-[#101624] w-[50%] rounded-2xl border-[#2c2f3f]">
                <div className="flex justify-between border-b border-[#2c2f3f] items-center p-[20px]">
                    <h1 className="text-[22px] font-semibold">{task ? "Edit Task" : "Create Task"}</h1>
                    <button
                        type="button"
                        className="border-[#2c2f3f] border px-[20px] py-[8px] rounded-xl text-[18px] hover:bg-[#1b253d]"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>

                <form className="border-b border-[#2c2f3f] p-[20px]" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-[10px] ">
                        <label htmlFor="title" className="text-[#c4c0c0]">Title</label>
                        <input
                            value={title}
                            type="text"
                            id="title"
                            className="border-[#2c2f3f] border outline-none rounded-xl p-[10px] pl-[20px]"
                            placeholder="e.g., Plain sprint backlog"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="mt-[20px] flex flex-col gap-[10px] pb-[100px] border-b border-[#2c2f3f]">
                        <label htmlFor="description" className="text-[#c4c0c0]">Description</label>
                        <input
                            value={description}
                            type="text"
                            id="description"
                            className="border-[#2c2f3f] border outline-none rounded-xl p-[10px] pl-[20px]"
                            placeholder="Add scope, owner, and due dates"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex p-[20px] gap-[20px] justify-end">
                        <button
                            type="button"
                            className="px-[24px] py-[10px] border border-[#2c2f3f] rounded-2xl hover:bg-[#1b253d]"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex px-[20px] py-[10px] border border-[#2c2f3f] rounded-2xl items-center gap-[10px] bg-blue-800 hover:bg-blue-900"
                        >
                            <LuSave />
                            {task ? "Update Task" : "Save Task"}
                        </button>
                    </div>
                </form>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </div>
        </div>
    )
}

export default Taskform;
