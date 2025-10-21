import Logo from "../components/UI/logo"
import TaskTable from "../components/table"

const Task = () => {
    return (
        <div>
            <Logo />
            <div className="lg:p-[20px] p-[10px]">
                <TaskTable />
            </div>
        </div>
    )
}

export default Task