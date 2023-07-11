import AppLayout from "@app/layouts/AppLayout";
import Error404 from "@app/pages/404";
import Home from "@app/pages/Home";
import Login from "@app/pages/Login";
import { Navigate, createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import AfterthoughtDashboard from "./dashboard/AfterthoughtDashboard";
import QuizDashboard from "./dashboard/QuizDashboard";
import HomeDashboard from "./dashboard/HomeDashboard";
import Renungan from "./renungan/Renungan";
import Quiz from "./quiz/Quiz";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "renungan",
        element: <Renungan />,
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
      { path: "renungan", element: <AfterthoughtDashboard /> },
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
