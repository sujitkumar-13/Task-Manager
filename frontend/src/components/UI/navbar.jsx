import { IoMdCheckboxOutline } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { RiHistoryFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-[#0b1330] max-w-[300px] w-full h-screen text-[#8FA5C0]">
            <div className=" flex p-[20px] gap-[10px] items-center border-b border-[#142052]">
                <IoMdCheckboxOutline className="text-[30px] " />
                <h1 className="text-[21px] font-semibold"> Task Manager</h1>
            </div>
            <nav className="py-[20px] px-[10px] hovborder border-[#142052] ">
                <ul className=" flex flex-col gap-[10px]">
                    <li>
                        <NavLink
                            to="/"

                            className={({ isActive }) =>
                                `p-[10px] rounded-xl hover:bg-[rgb(17,38,59)] flex gap-[10px] items-center ${isActive ? 'bg-[rgb(17,38,59)] font-semibold text-white' : ''}`
                            }
                            end
                        >
                            <FaTasks className="text-[16px]" />
                            <span className="text-[18px]">Tasks</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/audit"
                            className={({ isActive }) =>
                                `p-[10px] rounded-xl hover:bg-[rgb(17,38,59)] flex gap-[10px] items-center ${isActive ? 'bg-[rgb(17,38,59)] font-semibold text-white' : ''}`
                            }
                        >
                            <RiHistoryFill className="text-[18px]" />
                            <span className="text-[18px]">Audit Logs</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar