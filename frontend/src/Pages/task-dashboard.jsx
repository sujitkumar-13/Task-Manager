import Logo from "../components/UI/logo"
import TaskTable from "../components/table"

const Task = () => {
    return (
        <div>
            <Logo />
            <div className="p-[20px]">
                <TaskTable />
            </div>
        </div>
    )
}

export default Task