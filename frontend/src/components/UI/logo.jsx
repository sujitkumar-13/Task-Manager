import { LuRocket } from "react-icons/lu";
import { useLocation } from "react-router-dom";


const Logo = () => {
    const location = useLocation();
    const pageName = location.pathname === "/audit" ? "Audit Logs" : "Tasks";
    return (
        <div className=" p-[18px] flex items-center justify-between border-b border-[#2c2f3f]">
            <div className="  flex items-center gap-[10px] ">
                <LuRocket className="text-[26px]" />
                <h1 className="text-[20px] font-semibold">{pageName}</h1>
            </div>
            <div className="border border-[#2c2f3f] py-[5px] px-[15px] rounded-3xl">
                <h1 className="text-[15px]">v1.0</h1>
            </div>
        </div>
    )
}

export default Logo