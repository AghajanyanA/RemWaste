import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const register = (data: { username: string; email: string; password: string }) =>
  axios.post(`${API_URL}/register`, data);

export const login = (data: { username: string; password: string }) =>
  axios.post(`${API_URL}/login`, data);

export const fetchTodos = (username: string) =>
  axios.get(`${API_URL}/todos`, { params: { username } });

export const addTodo = (username: string, title: string) =>
  axios.post(`${API_URL}/todos`, { username, title });

export const updateTodo = (username: string, todoId: number, updates: Partial<{ title: string; completed: boolean }>) =>
  axios.put(`${API_URL}/todos/${todoId}`, { username, ...updates });

export const deleteTodo = (username: string, todoId: number) =>
  axios.delete(`${API_URL}/todos/${todoId}`, { params: { username } });
