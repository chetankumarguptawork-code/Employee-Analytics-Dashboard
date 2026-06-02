import React, { useMemo } from "react";

export const useDashboardMetrics = (employees) => {
    const metrics = useMemo(() => {
        const totalEmployees = employees.length;

        const activeEmployees = employees.filter(
            (employee) => employee.isActive
        ).length;

        const totalSalary = employees.reduce((sum, employee) =>
        sum + employee.salary, 0);

        const averageSalary = Math.round(
            totalSalary / totalEmployees
        );

        const totalRating = employees.reduce((sum,employee) =>
        sum + employee.performanceRating, 0 );

        const averageRating = (
            totalRating / totalEmployees
        ).toFixed(1);

        return {
            totalEmployees,
            activeEmployees,
            averageSalary,
            averageRating
        };
    },[employees]);

    return metrics;
}