import React, { useState } from "react";
import { employees } from "./data/employees";
import { useDashboardMetrics } from "./hooks/useDashboardMetrics";
import KPISection from "./Components/KPI/KPISection";
import DashboardHeader from "./Components/Header/DashboardHeader";
import DepartmentChart from "./Components/Charts/DepartmentChart";
import SalaryChart from "./Components/Charts/SalaryChart";
import EmployeeGrid from "./Components/Grid/EmployeeGrid";
import "./styles/dashboard.css";
import "./styles/grid.css"

function App() {
  const [darkMode, setDarkMode] = useState("dark");
  const metrics = useDashboardMetrics(employees);
  console.log(metrics);

  return (
    <>
    <div className={`app ${darkMode ? "dark" : "light"}`}>
    <DashboardHeader darkMode={darkMode} setDarkMode={setDarkMode} />
    <KPISection metrics={metrics} />
    <div className="charts-row">
      <section>
        <h2>Analytics Overview</h2>
        <div className="charts-grid">
          <DepartmentChart employees={employees}/>
          <SalaryChart employees={employees}/>
        </div>
      </section>
    </div>
    <section>
    <h2>Employee Records</h2>
    <EmployeeGrid employees={employees} darkMode={darkMode}/>
    </section>
    </div>
    <footer className="footer">
      Employee Dashboard • React + AG Grid + Recharts
    </footer>
    </>
  );
}

export default App;