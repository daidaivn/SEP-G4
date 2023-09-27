import { Route } from "react-router-dom";
import "../view/scss/responsive.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardComponnet from "../view/component/DashboardComponnet";
import NotFoundComponent from "../view/component/NotFoundComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardComponnet />,
  },

  {
    path: "*",
    element: <NotFoundComponent />,
  },
]);
export default router;
