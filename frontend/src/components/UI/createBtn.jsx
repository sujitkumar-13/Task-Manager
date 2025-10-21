import { IoAdd } from "react-icons/io5";

const CreateBtn = ({ onClick }) => {
    return (
        <div>
            <button className="flex items-center gap-[2px] bg-blue-800 hover:bg-blue-900 transition-all duration-150 pl-[10px] pr-[20px] py-[10px] rounded-xl" onClick={onClick} id="createBtn">
                <IoAdd className="text-[26px]" />
                <span className="text-[16px]">Create Task</span>
            </button>
        </div>
    )
}

export default CreateBtn