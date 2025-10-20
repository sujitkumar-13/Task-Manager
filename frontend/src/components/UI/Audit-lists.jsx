const AuditLists = () => {
    return (
        <table className="w-full text-left border-collapse">
            <thead className="text-[18px] border-b border-[#2c2f3f] text-gray-300 ">
                <tr>
                    <th className="px-6 py-4 font-normal w-[250px]">Timestamp</th>
                    <th className="px-6 py-4 font-normal w-[200px]">Action</th>
                    <th className="px-6 py-4 font-normal w-[150px]">Task ID</th>
                    <th className="px-6 py-4 font-normal">Updated Content</th>
                    <th className="px-6 py-4 font-normal text-center w-[200px]">Notes</th>
                </tr>
            </thead>

            <tbody>
                <tr className="border-b border-[#2c2f3f]">
                    <td className="px-6 py-4 font-medium ">2025-10-19</td>
                    <td className="px-4 py-4 ">
                        <button className=" py-[6px] px-[10px] rounded-2xl bg-green-600 hover:bg-green-800">
                            Create Task
                        </button>
                    </td>
                    <td className="px-6 py-4 ">1</td>
                    <td className="px-6 py-4 w-[400px]">Updated the homepage design with new hero section lorem10</td>
                    <td className="px-6 py-4 text-center">-</td>
                </tr>

                <tr className="border-b border-[#2c2f3f]">
                    <td className="px-6 py-4 font-medium ">2025-10-19</td>
                    <td className="px-4 py-4 ">
                        <button className=" py-[6px] px-[10px] rounded-2xl bg-orange-600 hover:bg-orange-800">
                            Update Task
                        </button>
                    </td>
                    <td className="px-6 py-4 ">1</td>
                    <td className="px-6 py-4 w-[400px]">Updated the homepage design with new hero section lorem10</td>
                    <td className="px-6 py-4 text-center">-</td>
                </tr>

                <tr className="border-b border-[#2c2f3f]">
                    <td className="px-6 py-4 font-medium ">2025-10-19</td>
                    <td className="px-4 py-4 ">
                        <button className=" py-[6px] px-[10px] rounded-2xl bg-red-700 hover:bg-red-900">
                            Delete Task
                        </button>
                    </td>
                    <td className="px-6 py-4 ">1</td>
                    <td className="px-6 py-4 w-[400px]">Updated the homepage design with new hero section lorem10</td>
                    <td className="px-6 py-4 text-center">-</td>
                </tr>

            </tbody>
        </table>
    );
};

export default AuditLists;
