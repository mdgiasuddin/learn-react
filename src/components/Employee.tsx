import {type Employee} from "../services/EmployeeService.ts";
import {Edit, Trash2} from "lucide-react";

interface EmployeeRowProps {
    employee: Employee;
}

export function Employee({employee}: EmployeeRowProps) {
    return (
        <tr key={employee.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {employee.id}
            </td>
            <td className="px-6 py-4">
                {employee.firstName} {employee.lastName}
            </td>
            <td className="px-6 py-4">
                {employee.email}
            </td>
            <td className="px-6 py-4 flex space-x-3">
                <button className="text-blue-600 dark:text-blue-500 hover:underline">
                    <Edit size={18}/>
                </button>
                <button className="text-red-600 dark:text-red-500 hover:underline">
                    <Trash2 size={18}/>
                </button>
            </td>
        </tr>
    );
}
