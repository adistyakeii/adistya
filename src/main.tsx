import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./contexts/ThemeContext";
import { RouterProvider } from "react-router-dom";
import routes from "@app/pages/Routes";

import "@app/styles/global.css";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
