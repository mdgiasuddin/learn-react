import axiosApi from './AxiosApi.ts';

export interface EmployeeEntity {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

const API_URL = 'http://localhost:8194/api/employees';

const EmployeeService = {
    getAllEmployees: async (): Promise<EmployeeEntity[]> => {
        try {
            const response = await axiosApi.get<EmployeeEntity[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching employees:', error);
            return [];
        }
    },
    createEmployee: async (employee: Omit<EmployeeEntity, 'id'>): Promise<EmployeeEntity> => {
        const response = await axiosApi.post<EmployeeEntity>(API_URL, employee);
        return response.data;
    },
    updateEmployee: async (id: number, employee: Omit<EmployeeEntity, 'id'>): Promise<EmployeeEntity> => {
        const response = await axiosApi.put<EmployeeEntity>(`${API_URL}/${id}`, employee);
        return response.data;
    },
    deleteEmployee: async (id: number): Promise<void> => {
        await axiosApi.delete(`${API_URL}/${id}`);
    }
};

export default EmployeeService;
