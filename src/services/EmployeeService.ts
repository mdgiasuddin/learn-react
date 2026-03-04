import axiosApi from './AxiosApi.ts';

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

const API_URL = 'http://localhost:8194/api/employees';

const EmployeeService = {
    getAllEmployees: async (): Promise<Employee[]> => {
        try {
            const response = await axiosApi.get<Employee[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching employees:', error);
            return [];
        }
    }
};

export default EmployeeService;
