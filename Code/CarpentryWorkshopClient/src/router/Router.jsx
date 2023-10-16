import NotFoundComponent from "../view/component/NotFoundComponent";
import ListEmployeeComponent from "../view/component/ListEmployeeComponent";
import ListDepartmentComponent from "../view/component/DepartmentComponent";
import Home from "../view/component/Home";
import DashboardComponnet from "../view/component/DashboardComponnet";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <DashboardComponnet />,
  },
  {
    path: "/list-employee",
    element: <ListEmployeeComponent />,
  },
  {
    path: "/list-department",
    element: <ListDepartmentComponent />,
  },
  {
    path: "*",
    element: <NotFoundComponent />,
  },
];

export default routes;
