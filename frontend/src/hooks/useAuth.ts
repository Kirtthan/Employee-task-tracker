import { useMutation } from '@tanstack/react-query';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (credentials: any) => {
            console.log('Login attempt:', credentials);
            const { data } = await api.post('/auth/login', credentials);
            console.log('Login response:', data);
            return data;
        },
        onSuccess: (data) => {
            console.log('Login successful, setting auth');
            setAuth(data.user, data.access_token);
            navigate('/dashboard');
        },
        onError: (error: any) => {
            console.error('Login error:', error);
            alert(`Login failed: ${error.response?.data?.message || error.message}`);
        },
    });
};

export const useRegister = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (credentials: any) => {
            console.log('Register attempt:', credentials);
            const { data } = await api.post('/auth/register', credentials);
            console.log('Register response:', data);
            return data;
        },
        onSuccess: (data) => {
            console.log('Registration successful, setting auth');
            setAuth(data.user, data.access_token);
            navigate('/dashboard');
        },
        onError: (error: any) => {
            console.error('Registration error:', error);
            alert(`Registration failed: ${error.response?.data?.message || error.message}`);
        },
    });
};
