import { IoMdCheckboxOutline } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { RiHistoryFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className="xl:hidden fixed top-[13px] left-4 z-50  p-2 rounded-xl "
                onClick={() => setOpen(true)}
                aria-label="Open navigation"
            >
                <GiHamburgerMenu className="text-[28px] text-[#8FA5C0]" />
            </button>

            <div
                className={`bg-[#0b1330] max-w-[300px] w-full xl:h-auto h-screen text-[#8FA5C0] fixed top-0  left-0 z-40 transition-transform duration-300
                ${open ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0 xl:static xl:block`}
                style={{ boxShadow: open ? "0 0 0 100vw rgba(0,0,0,0.5)" : "none" }}
            >
                <div className="xl:hidden flex justify-end  border-b border-[#142052] pb-[10px] ">
                    <button
                        onClick={() => setOpen(false)}
                        className="text-[#8FA5C0] text-[26px] px-4 py-1  mt-[10px]"
                        aria-label="Close navigation"
                    >
                        ✕
                    </button>
                </div>
                <div className="xl:flex xl:items-center hidden p-[20px] gap-[10px] border-b border-[#142052]">
                    <IoMdCheckboxOutline className="text-[30px]" />
                    <h1 className="text-[21px] font-semibold">Task Manager</h1>
                </div>

                <nav className="py-[20px] px-[10px] hovborder border-[#142052]">
                    <ul className="flex flex-col gap-[10px]">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `p-[10px] rounded-xl hover:bg-[rgb(17,38,59)] flex gap-[10px] items-center ${isActive ? 'bg-[rgb(17,38,59)] font-semibold text-white' : ''}`
                                }
                                end
                                onClick={() => setOpen(false)}
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
                                onClick={() => setOpen(false)}
                            >
                                <RiHistoryFill className="text-[18px]" />
                                <span className="text-[18px]">Audit Logs</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            {open && (
                <div
                    className="fixed inset-0  xl:hidden"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
};

export default Navbar;