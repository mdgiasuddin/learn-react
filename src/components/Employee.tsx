import {type EmployeeEntity} from "../services/EmployeeService.ts";
import {Edit, Trash2} from "lucide-react";

interface EmployeeRowProps {
    employee: EmployeeEntity;
    onEdit: (employee: EmployeeEntity) => void;
    onDelete: (id: number) => void;
}

export function Employee({employee, onEdit, onDelete}: EmployeeRowProps) {
    return (
        <tr key={employee.id}
            className="bg-white even:bg-gray-50 border-b dark:bg-gray-800 dark:even:bg-gray-700/50 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
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
                <button
                    onClick={() => onEdit(employee)}
                    className="text-blue-600 dark:text-blue-500 hover:underline">
                    <Edit size={18}/>
                </button>
                <button
                    onClick={() => onDelete(employee.id)}
                    className="text-red-600 dark:text-red-500 hover:underline">
                    <Trash2 size={18}/>
                </button>
            </td>
        </tr>
    );
}
