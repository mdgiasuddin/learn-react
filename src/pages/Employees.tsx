import {useEffect, useState} from "react";
import EmployeeService, {type Employee} from "../services/EmployeeService.ts";
import {Employee} from "../components/Employee.tsx";

export function Employees() {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        let isMounted = true;
        const fetchEmployees = async () => {
            const data = await EmployeeService.getAllEmployees();
            if (isMounted) {
                setEmployees(data);
            }
        };

        fetchEmployees().then(() => isMounted = false);
    }, []);

    return (
        <div
            className="min-h-screen bg-white dark:bg-slate-800 text-black dark:text-white transition-colors duration-300 p-4">
            <h1 className="text-2xl font-bold mb-6">Employee List</h1>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map(employee => (
                        <Employee key={employee.id} employee={employee}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}