import axiosInstance from './axiosInstance';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = (data: RegisterPayload) =>
  axiosInstance.post('/auth/register', data);

export const loginUser = (data: LoginPayload) =>
  axiosInstance.post('/auth/login', data);

export const forgotPassword = (email: string) =>
  axiosInstance.post('/auth/forgot-password', { email });

export const resetPassword = (token: string, newPassword: string) =>
  axiosInstance.post('/auth/reset-password', { token, newPassword });
