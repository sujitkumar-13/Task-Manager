
import Showing from "./showing";
import AuditLists from "./Audit-lists";

const AuditChart = () => {
    return (
        <div className="p-4">
            <div className=" rounded-2xl border border-[#2c2f3f] overflow-auto">
                <AuditLists />
            </div>
        </div>
    );
};

export default AuditChart;
