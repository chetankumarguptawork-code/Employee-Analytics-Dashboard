import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function SalaryChart({ employees }) {
    const chartData = useMemo(() => {
        const salaryTotals = {};
        const employeeTotals = {};

        employees.forEach((employee) => {
            const dept = employee.department;
            salaryTotals[dept] = (salaryTotals[dept] || 0) + employee.salary;
            employeeTotals[dept] = (employeeTotals[dept] || 0) + 1;
        });

        return Object.keys(salaryTotals).map(
            (dept) => ({
                department : dept,
                averageSalary : Math.round(
                    salaryTotals[dept] /employeeTotals[dept]
                )
            })
        );
    },[employees]);

    return(
        <div className="chart-container">
            <h2>Average Salary by Department</h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray= "3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip formatter={(value) =>
                        `$${value.toLocaleString()}`
                    }
                    />
                    <Bar dataKey= "averageSalary"
                    radius={[8,8,0,0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}