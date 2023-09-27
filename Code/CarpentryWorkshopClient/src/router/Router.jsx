import { Route } from "react-router-dom";
import "../view/scss/responsive.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardComponnet from "../view/component/DashboardComponnet";
import NotFoundComponent from "../view/component/NotFoundComponent";
import ListEmployeeComponent from "../view/component/ListEmployeeComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardComponnet />,
  },
  {
    path: "/list-employee",
    element: <ListEmployeeComponent />,
  },
  {
    path: "*",
    element: <NotFoundComponent />,
  },
]);
export default router;
