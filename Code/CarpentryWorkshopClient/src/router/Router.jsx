import NotFoundComponent from "../view/component/NotFoundComponent";
import ListEmployeeComponent from "../view/component/ListEmployeeComponent";
import ListDepartmentComponent from "../view/component/DepartmentComponent";
import Home from "../view/component/Home";
import DashboardComponnet from "../view/component/DashboardComponnet";
import LoginComponent from "../view/component/LoginComponent";
import ForgetComponent from "../view/component/ForgetComponent";
import GroupComponent from "../view/component/GroupComponent";
import Decentralization from "../view/component/Decentralization";

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
    path: "/list-group",
    element: <GroupComponent />,
  },
  {
    path: "/login",
    element: <LoginComponent />,
  },
  {
    path: "/forget",
    element: <ForgetComponent />,
  },
  {
    path: "/decentralization",
    element: <Decentralization />,
  },

  {
    path: "*",
    element: <NotFoundComponent />,
  },
];

export default routes;
