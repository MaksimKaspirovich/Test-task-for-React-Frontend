export interface User {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}

export interface CreateUserDto {
  name: string;
  avatar: string;
}

export type UpdateUserDto = CreateUserDto & { id: string };