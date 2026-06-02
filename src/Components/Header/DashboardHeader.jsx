import ThemeToggle from "../Theme/ThemeToggle";

export default function DashboardHeader({darkMode, setDarkMode}) {
    return(
        <header className="dashboard-header">
            <div>
                <h1>Employee Analytics Dashboard</h1>
                <p>Workforce insights and employee metrics
                </p>
            </div>
                <ThemeToggle darkMode={darkMode} 
                setDarkMode={setDarkMode}
                />
        </header>
    );
}