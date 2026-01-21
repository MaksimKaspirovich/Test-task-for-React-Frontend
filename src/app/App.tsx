import React, { useEffect } from "react";
import { QueryProvider } from "./providers/QueryProvider";
import { RouterProvider } from "./providers/RouterProvider";
import { ConfigProvider } from "antd";

const App: React.FC = () => {
  // Проверяем авторизацию при загрузке приложения
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Пользователь авторизован");
    }
  });

  return (
    <ConfigProvider>
      <QueryProvider>
        <RouterProvider />
      </QueryProvider>
    </ConfigProvider>
  );
};

export default App;
