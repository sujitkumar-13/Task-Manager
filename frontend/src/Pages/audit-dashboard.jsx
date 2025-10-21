import Logo from "../components/UI/logo"
import AuditChart from "../components/UI/Audit-chart"

const Audit = () => {
    return (
        <div>
            <Logo />
            <div className="sm:p-[20px]">
                <AuditChart />
            </div>
        </div>
    )
}

export default Audit