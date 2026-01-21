import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthApi, LoginData } from "../api/AuthApi";

export const useAuth = () => {
    // Мутации для входа
    const loginMutation = useMutation({
        mutationFn: AuthApi.login,
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
        },
    });

    // Проверка авторизации
    const checkAuthQuery = useQuery({
        queryKey: ['auth'],
        queryFn: AuthApi.validateToken,
        retry: false,
        enabled: false,
    });

    // Выход
    const logout = () => {
        localStorage.removeItem('token');
        loginMutation.reset();
    };

    // Проверка авторизован ли пользователь
    const isAuth = () => {
        return !!localStorage.getItem('token');
    };

    return {
        login: loginMutation.mutate,
        loginAsync: loginMutation.mutateAsync,
        isLoading: loginMutation.isPending,
        error: loginMutation.error,
        isAuth,
        logout,
        checkAuth: checkAuthQuery.refetch,
    };
};