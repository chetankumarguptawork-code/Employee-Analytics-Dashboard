import KPICard from "./KPICard";
import "../../styles/dashboard.css";


export default function KPISection({metrics}){
    return(
        <section className="kpi-section">
            <KPICard
            title="Total Employees"
            value={metrics.totalEmployees}
            />

            <KPICard
            title="Active Employees"
            value={metrics.activeEmployees}
            />

            <KPICard
            title="Average Salary"
            value={`$${metrics.averageSalary.toLocaleString()}`}
            />

            <KPICard
            title="Average Rating"
            value={metrics.averageRating}
            />
        </section>
    )
}