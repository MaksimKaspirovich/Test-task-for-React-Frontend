import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "./api";
import { CreateUserDto, UpdateUserDto } from "./types";

export const useUsers = () => {
  const queryClient = useQueryClient();

  // Получение списка пользователей
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => usersApi.getUsers().then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  // Создание пользователя
  const createMutation = useMutation({
    mutationFn: (data: CreateUserDto) => usersApi.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Обновление пользователя
  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }: UpdateUserDto) =>
      usersApi.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    // Данные
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    error: usersQuery.error,
    refetch: usersQuery.refetch,

    // Создание
    createUser: createMutation.mutate,
    createUserAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,

    // Обновление
    updateUser: updateMutation.mutate,
    updateUserAsync: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
};
