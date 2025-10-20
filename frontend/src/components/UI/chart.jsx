import { useEffect, useState } from "react";
import Showing from "./showing";
import Lists from "./lists";
import Taskform from "./taskform";

const Chart = ({ showForm, setShowForm }) => {
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

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      {!showForm ? (
        <div className="p-4">
          <div className="rounded-2xl border border-[#2c2f3f] overflow-auto">
            <Lists
              currentTasks={currentTasks}
              fetchTasks={fetchTasks}
              setTasks={setTasks}
              tasks={tasks}
            />
            <div className="p-[20px] flex justify-between items-center">
              <Showing
                currentPage={currentPage}
                totalTasks={tasks.length}
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
