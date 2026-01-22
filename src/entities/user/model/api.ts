import axios from "axios";
import {User, CreateUserDto} from './types';

const API_BASE_URL = 'https://696e0425d7bacd2dd71568b0.mockapi.io/testtask';

export const usersApi = {
    // Получение пользователей
    getUsers: () => axios.get<User[]>(`${API_BASE_URL}/users`),
    // Созданрие пользователя
    createUser: (data: CreateUserDto) => axios.post<User>(`${API_BASE_URL}/users`, data),
    // Изменение пользователя
    updateUser: (id: string, data: CreateUserDto) => axios.put<User>(`${API_BASE_URL}/users/${id}`, data),
    // Удаление пользователя
    deleteUser: (id: string) => axios.delete(`${API_BASE_URL}/users/${id}`),
}