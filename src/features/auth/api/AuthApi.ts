import axios from "axios";

export interface LoginData {
  login: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

// Имитация API запроса
export const AuthApi = {
  login: (data: LoginData): Promise<LoginResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.login === "admin" && data.password === "admin") {
          resolve({ token: "fake-jwt-token-12345" });
        } else {
          reject(new Error("Неверный логин или пароль"));
        }
      }, 2000);
    });
  },
  // Валидация токена для проверки авторизации
  validateToken: (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const token = localStorage.getItem("token");
        resolve(!!token);
      }, 500);
    });
  },
};
