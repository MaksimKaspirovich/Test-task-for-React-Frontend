import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "./api";
import { CreateUserDto, UpdateUserDto, User } from "./types";

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
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      
      const previousUsers = queryClient.getQueryData<User[]>(["users"]);
      
      queryClient.setQueryData<User[]>(["users"], (old = []) => [
        ...old,
        {
          id: "temp-id",
          ...newUser,
          createdAt: new Date().toISOString(),
        },
      ]);
      
      return { previousUsers };
    },
    onError: (err, newUser, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData<User[]>(["users"], context.previousUsers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Обновление пользователя 
  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }: UpdateUserDto) =>
      usersApi.updateUser(id, data),
    onMutate: async (updatedUser) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      
      const previousUsers = queryClient.getQueryData<User[]>(["users"]);
      
      queryClient.setQueryData<User[]>(["users"], (old = []) =>
        old.map((user) =>
          user.id === updatedUser.id
            ? { ...user, ...updatedUser }
            : user
        )
      );
      
      return { previousUsers };
    },
    onError: (err, updatedUser, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData<User[]>(["users"], context.previousUsers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Удаление пользователя
  const deleteMutation = useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      
      const previousUsers = queryClient.getQueryData<User[]>(["users"]);
      
      queryClient.setQueryData<User[]>(["users"], (old = []) =>
        old.filter((user) => user.id !== id)
      );
      
      return { previousUsers };
    },
    onError: (err, id, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData<User[]>(["users"], context.previousUsers);
      }
    },
    onSettled: () => {
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

    // Удаление
    deleteUser: deleteMutation.mutate,
    deleteUserAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
  };
};