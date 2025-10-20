import SearchBox from "./UI/search"
import CreateBtn from "./UI/createBtn"
import Chart from "./UI/chart"
import { useState } from "react"

const TaskTable = () => {
     const [showForm, setShowForm] = useState(false);
    return (
        <div className=" border border-[#2c2f3f] rounded-md">
            <div className="p-[20px] flex justify-between items-center border-b border-[#2c2f3f]">
                <SearchBox/>
                <CreateBtn onClick = {() => {setShowForm(true)}}/>
            </div>
            <div>
                <Chart showForm = {showForm} setShowForm = {setShowForm} />
            </div>
        </div>
    )
}

export default TaskTable