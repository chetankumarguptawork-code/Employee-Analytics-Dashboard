import React, { useMemo } from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function DepartmentChart({ employees }) {
    const chartData = useMemo(() => {
        const count = {};
        employees.forEach((employee) => {
            const dept = employee.department;
            count[dept] = (count[dept] || 0) + 1;
        });

        return Object.entries(count).map(
            ([department, count]) => ({
                department,
                count
            })
        );
    },[employees]);
    return(
        <div className="chart-container">
            <h2>Employees by Department</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={chartData}
                    dataKey="count"
                    nameKey="department"
                    outerRadius={100}
                    label={({ department, percent }) =>
                    `${department} ${(percent * 100).toFixed(0)}%`}
                    />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}