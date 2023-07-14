import AppLayout from "@app/layouts/AppLayout";
import Error404 from "@app/pages/404";
import Home from "@app/pages/Home";
import Login from "@app/pages/Login";
import { Navigate, createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import QuizDashboard from "./dashboard/QuizDashboard";
import HomeDashboard from "./dashboard/HomeDashboard";
import Devotional from "./devotional/Devotional";
import Quiz from "./quiz/Quiz";
import DevotionalDashboard from "./dashboard/DevotionalDashboard";
import DevotionalDetail from "./devotional/DevotionalDetail";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "devotional",
        children: [
          { index: true, element: <Devotional /> },
          { path: ":devotionalId", element: <DevotionalDetail /> },
        ],
      },
      {
        path: "quiz",
        element: <Quiz />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <HomeDashboard /> },
      { path: "devotional", element: <DevotionalDashboard /> },
      { path: "quiz", element: <QuizDashboard /> },
    ],
  },
  { path: "/404", element: <Error404 /> },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);

export default routes;
