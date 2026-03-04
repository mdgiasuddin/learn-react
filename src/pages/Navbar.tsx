import {useNavigate} from "react-router-dom";
import {Moon, Sun} from "lucide-react";
import {useEffect, useState} from "react";

export function Navbar() {
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <div
            className="flex w-full justify-between bg-teal-500 dark:bg-slate-900 text-teal-100 px-4 py-2 transition-colors duration-300">
            <div className="text-lg font-semibold">My Website</div>
            <nav className="flex gap-4 items-center">
                <div className="cursor-pointer hover:text-white" onClick={() => navigate('/employees')}>Employees</div>
                <div className="cursor-pointer hover:text-white" onClick={() => navigate('/store')}>Store</div>
                <div className="cursor-pointer hover:text-white" onClick={() => navigate('/about')}>About</div>
                <button
                    onClick={toggleTheme}
                    className="p-1 rounded-full hover:bg-teal-600 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Toggle theme"
                    title={theme === "light" ? "Dark mode" : "Light mode"}
                >
                    {theme === "light" ? <Moon size={20}/> : <Sun size={20}/>}
                </button>
            </nav>
        </div>
    )
}