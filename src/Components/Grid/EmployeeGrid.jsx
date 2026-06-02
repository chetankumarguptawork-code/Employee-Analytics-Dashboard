import React, { useState, useEffect, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import StatusRenderer from "../Renderers/StatusRenderer";
import SkillsRenderer from "../Renderers/SkillRenderer";

export default function EmployeeGrid ({ employees, darkMode}) {
    const[searchText, setSearchText] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("All");
    const gridRef = useRef(null);

    const departments = useMemo(() => {
        return [
        "All",
        ...new Set(
        employees.map(
            employee => employee.department
            )
        )
        ];
    },[employees]);

    const columnDefs = useMemo(() => [
        {
            headerName: "ID",
            field: "id",
            width: 50
        },
        {
            headerName: "Name",
            minWidth: 140,
            valueGetter: (params) =>
                `${params.data.firstName} ${params.data.lastName}`
        },
        {
            field: "department",
            minWidth: 140
        },
        {
            field: "position",
            minWidth: 160
        },
        {
            field: "salary",
            valueFormatter: (params) =>
                `$${params.value.toLocaleString()}`
        },
        {
            headerName: "Status",
            field: "isActive",
            cellRenderer: StatusRenderer
        },
        {
            field: "skills",
            cellRenderer: SkillsRenderer
        },
        {
            field: "manager",
            minWidth: 180,
            valueFormatter: (params) =>
            params.value || "—"
        },
        {
        headerName: "Rating",
        field: "performanceRating",
        width: 120
        }
    ],
    []
    );

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true
    }),
    []
    );

    const onGridReady = (params) => {
        gridRef.current = params.api;
        params.api.sizeColumnsToFit();
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);

        gridRef.current?.setGridOption(
            "quickFilterText",
            value
        );
    };

    const exportToCsv = () => {
        gridRef.current?.exportDataAsCsv({
        fileName: "employees.csv"
        });
    };

    useEffect(() => {
    const handleResize = () => {
        gridRef.current?.sizeColumnsToFit();
    };

    window.addEventListener(
        "resize",
        handleResize
    );

    return () =>
        window.removeEventListener(
        "resize",
        handleResize
        );
    }, []);

    const filteredEmployees = 
    selectedDepartment === "All" ? employees
    : employees.filter(
        employee => employee.department === selectedDepartment
    );

    return(
        <>
        <div className="grid-toolbar">
            <div className="toolbar-left">
                <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchText}
                    onChange={handleSearch}
                />
            </div>
            <div className="toolbar-right">
                <select value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                ))}
                </select>
                <button onClick={exportToCsv}>
                    Export CSV
                </button>
            </div>
        </div>
        <div className={`ag-theme-quartz ${
        darkMode ? "grid-dark" : "grid-light"
        }`} style ={{ height: 620, width: "100%"}} 
        >
            <AgGridReact rowData={filteredEmployees} 
            columnDefs={columnDefs} 
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10,20]}
            rowSelection= "multiple"
            animateRows={true}
            overlayNoRowsTemplate={
            '<span>No employees found</span>'
            }
            rowHeight={55}
            headerHeight={55}
            />
        </div>
        </>
    )
}