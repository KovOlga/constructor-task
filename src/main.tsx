import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AdaptivityProvider, ConfigProvider } from "@vkontakte/vkui";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider>
      <AdaptivityProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        y
      </AdaptivityProvider>
    </ConfigProvider>
  </React.StrictMode>
);
