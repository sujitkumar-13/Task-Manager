import { useEffect, useState } from "react";

const AuditLists = () => {
    const [logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 5;

    const fetchAuditLogs = async () => {
        try {
            const res = await fetch("http://localhost:4000/audit");
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
        <div>
            <table className="w-full text-left border-collapse">
                <thead className="text-[18px] border-b border-[#2c2f3f] text-gray-300 ">
                    <tr>
                        <th className="px-6 py-4 font-normal w-[200px]">Timestamp</th>
                        <th className="px-6 py-4 font-normal w-[180px]">Action</th>
                        <th className="px-6 py-4 font-normal w-[200px]">Task ID</th>
                        <th className="px-6 py-4 font-normal">Updated Content</th>
                        <th className="px-6 py-4 font-normal text-center w-[150px]">Notes</th>
                    </tr>
                </thead>

                <tbody className="border-b border-[#2c2f3f]">
                    {currentLogs.length > 0 ? (
                     
                        currentLogs.map((log) => (
                            <tr key={log._id} className="border-b border-[#2c2f3f]">
                                {console.log(log.updatedContent)}
                                <td className="px-6 py-4 font-medium">{log.timestamp}</td>
                                <td className="px-4 py-4">
                                    <button
                                        className={`py-[6px] px-[10px] rounded-2xl ${log.action === "Create Task"
                                                ? "bg-green-600 hover:bg-green-800"
                                                : log.action === "Update Task"
                                                    ? "bg-orange-600 hover:bg-orange-800"
                                                    : "bg-red-700 hover:bg-red-900"
                                            }`}
                                    >
                                        {log.action}
                                    </button>
                                </td>
                                <td className="px-6 py-4">{log.taskId}</td>
                                <td className="px-6 py-4 w-[400px]"><h1 className="">
                                    {log.updatedContent.split()}</h1></td>
                                <td className="px-6 py-4 text-center">{log.notes}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-6 text-gray-400">
                                No audit logs found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="p-[20px] flex justify-between items-center ">
                <h1 className="text-[#c4c0c0]">
                    Showing {Math.min(logsPerPage, logs.length - indexOfFirstLog)} of{" "}
                    <span>{logs.length}</span> logs
                </h1>

                <div className="flex gap-[10px]">
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
