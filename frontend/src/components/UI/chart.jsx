import { useEffect, useState } from "react";
import Showing from "./showing";
import Lists from "./lists";
import Taskform from "./taskform";

const Chart = ({ showForm, setShowForm, searchQuery }) => {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;

    const fetchTasks = async () => {
        try {
            const res = await fetch("http://localhost:4000/tasks");
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error("Failed to fetch tasks:", err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // ✅ filter tasks based on search
    const filteredTasks = tasks.filter(
        (task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div>
            {!showForm ? (
                <div className="lg:p-4 p-0">
                    <div className="lg:rounded-2xl border border-[#2c2f3f] overflow-auto mt-4">
                        <Lists currentTasks={currentTasks} fetchTasks={fetchTasks} setTasks={setTasks} />
                        <div className="p-[20px] flex justify-between items-center">
                            <Showing
                                currentPage={currentPage}
                                totalTasks={filteredTasks.length}
                                handleNext={handleNext}
                                handlePrev={handlePrev}
                                tasksPerPage={tasksPerPage}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-black py-[60px]">
                    <Taskform onClose={() => setShowForm(false)} onUpdate={fetchTasks} setTasks={setTasks} />
                </div>
            )}
        </div>
    );
};

export default Chart;
