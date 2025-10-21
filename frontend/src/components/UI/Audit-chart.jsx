import AuditLists from "./Audit-lists";

const AuditChart = () => {
    return (
        <div className="p-0 sm:p-4">
            <div className="w-full border border-[#2c2f3f] rounded-2xl overflow-auto">
                <AuditLists />
            </div>
        </div>
    );
};

export default AuditChart;
