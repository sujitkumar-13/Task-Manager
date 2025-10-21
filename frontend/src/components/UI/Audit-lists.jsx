import { useEffect, useState } from "react";

const AuditLists = () => {
    const [logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 5;

    const fetchAuditLogs = async () => {
        try {
            const res = await fetch("https://task-manager-ten-fawn.vercel.app/audit");
            const data = await res.json();
            setLogs(data);
        } catch (err) {
            console.error("Failed to fetch audit logs:", err);
        }
    };

    useEffect(() => {
        fetchAuditLogs();
    }, []);

    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
    const totalPages = Math.ceil(logs.length / logsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div className="w-full">
            {/* Table wrapper for horizontal scroll */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left border-collapse">
                    <thead className="text-sm sm:text-base border-b border-[#2c2f3f] text-gray-300">
                        <tr>
                            <th className="px-4 sm:px-6 py-3 font-normal w-[200px]">Timestamp</th>
                            <th className="px-4 sm:px-6 py-3 font-normal w-[180px]">Action</th>
                            <th className="px-4 sm:px-6 py-3 font-normal w-[200px]">Task ID</th>
                            <th className="px-4 sm:px-6 py-3 font-normal">Updated Content</th>
                            <th className="px-4 sm:px-6 py-3 font-normal text-center w-[150px]">Notes</th>
                        </tr>
                    </thead>

                    <tbody className="border-b border-[#2c2f3f]">
                        {currentLogs.length > 0 ? (
                            currentLogs.map((log) => (
                                <tr key={log._id} className="border-b border-[#2c2f3f]">
                                    <td className="px-4 sm:px-6 py-3 font-medium">{log.timestamp}</td>
                                    <td className="px-4 sm:px-6 py-3">
                                        <button
                                            className={`py-1 sm:py-2 px-2 sm:px-3 rounded-2xl text-xs sm:text-sm ${
                                                log.action === "Create Task"
                                                    ? "bg-green-600 hover:bg-green-800"
                                                    : log.action === "Update Task"
                                                    ? "bg-orange-600 hover:bg-orange-800"
                                                    : "bg-red-700 hover:bg-red-900"
                                            }`}
                                        >
                                            {log.action}
                                        </button>
                                    </td>
                                    <td className="px-4 sm:px-6 py-3">{log.taskId}</td>
                                    <td className="px-4 sm:px-6 py-3 max-w-[150px] sm:max-w-[400px] truncate">
                                        {log.updatedContent}
                                    </td>
                                    <td className="px-4 sm:px-6 py-3 text-center">{log.notes}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-400 text-sm sm:text-base">
                                    No audit logs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
             <div className="p-[20px] flex justify-between items-center ">
                <h1 className="text-[#c4c0c0]">
                    Showing {Math.min(logsPerPage, logs.length - indexOfFirstLog)} of{" "}
                    <span>{logs.length}</span> logs
                </h1>

                <div className="flex gap-[10px] ">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="flex items-center gap-[5px] border border-[#2c2f3f] px-[16px] py-[8px] text-[#c4c0c0] rounded-xl hover:bg-[#1b253d] disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <span className="px-[16px] py-[8px] text-[#c4c0c0] border border-[#2c2f3f] rounded-xl">
                        Page {currentPage}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-[5px] text-[#c4c0c0] border border-[#2c2f3f] px-[16px] py-[8px] rounded-xl hover:bg-[#1b253d] disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuditLists;
