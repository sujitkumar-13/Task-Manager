import SearchBox from "./UI/search";
import CreateBtn from "./UI/createBtn";
import Chart from "./UI/chart";
import { useState } from "react";

const TaskTable = () => {
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // ✅ search state here

    return (
        <div className="border border-[#2c2f3f] rounded-md">
            <div className="sm:p-[20px] p-[10px] flex flex-row justify-between md:items-center border-b border-[#2c2f3f]" id="searching">
                <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <CreateBtn onClick={() => setShowForm(true)} />
            </div>

            <div>
                <Chart showForm={showForm} setShowForm={setShowForm} searchQuery={searchQuery} />
            </div>
        </div>
    );
};

export default TaskTable;
