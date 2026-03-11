import {useCallback, useEffect, useState} from "react";
import EmployeeService, {type EmployeeEntity} from "../services/EmployeeService.ts";
import {Employee} from "../components/Employee.tsx";
import {EmployeeModal} from "../components/EmployeeModal.tsx";
import {Plus} from "lucide-react";

export function Employees() {
    const [employees, setEmployees] = useState<EmployeeEntity[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeEntity | null>(null);

    const fetchEmployees = useCallback(async () => {
        const data = await EmployeeService.getAllEmployees();
        setEmployees(data);
    }, []);

    useEffect(() => {
        const init = async () => {
            await fetchEmployees();
        };
        init();
    }, [fetchEmployees]);

    const handleAddClick = () => {
        setSelectedEmployee(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (employee: EmployeeEntity) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await EmployeeService.deleteEmployee(id);
                await fetchEmployees();
            } catch (error) {
                console.error('Error deleting employee:', error);
                alert('Failed to delete employee. Please try again.');
            }
        }
    };

    return (
        <div
            className="min-h-screen bg-white dark:bg-slate-800 text-black dark:text-white transition-colors duration-300 p-4">
            <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Employee List</h1>
                <button
                    onClick={handleAddClick}
                    className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                    <Plus size={20}/>
                    <span>Add Employee</span>
                </button>
            </div>
            <div className="max-w-4xl mx-auto overflow-x-auto shadow-md sm:rounded-lg">
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
                        <Employee
                            key={employee.id}
                            employee={employee}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                        />
                    ))}
                    </tbody>
                </table>
            </div>

            <EmployeeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={fetchEmployees}
                employee={selectedEmployee}
            />
        </div>
    )
}