import {useNavigate} from "react-router-dom";
import {ChevronDown, LogOut, Moon, Sun, User} from "lucide-react";
import {useEffect, useState} from "react";
import AuthService from "../services/AuthService.ts";
import {useAuth} from "../context/UseAuth.ts";

export function Navbar() {
    const navigate = useNavigate();
    const {name, logout} = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    const handleLogout = async () => {
        try {
            await AuthService.logout();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            logout();
            setIsDropdownOpen(false);
            navigate("/login");
        }
    };

    return (
        <div
            className="flex w-full justify-between bg-teal-500 dark:bg-slate-900 text-teal-100 px-4 py-2 transition-colors duration-300">
            <div className="text-lg font-semibold flex items-center">My Website</div>
            <nav className="flex gap-4 items-center">
                <div className="cursor-pointer hover:text-white" onClick={() => navigate('/employees')}>Employees</div>
                <div className="cursor-pointer hover:text-white" onClick={() => navigate('/store')}>Store</div>
                <div className="cursor-pointer hover:text-white" onClick={() => navigate('/about')}>About</div>

                {name && (
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-1 hover:text-white transition-colors focus:outline-none"
                        >
                            <span>{name}</span>
                            <ChevronDown size={16}
                                         className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}/>
                        </button>

                        {isDropdownOpen && (
                            <div
                                className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border dark:border-slate-700 py-1 z-50">
                                <button
                                    onClick={() => {
                                        navigate('/profile');
                                        setIsDropdownOpen(false);
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                                >
                                    <User size={16} className="mr-2"/>
                                    Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                                >
                                    <LogOut size={16} className="mr-2"/>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}

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