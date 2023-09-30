import DashboardComponent from "../view/component/DashboardComponent";
import NotFoundComponent from "../view/component/NotFoundComponent";
import ListEmployeeComponent from "../view/component/ListEmployeeComponent";
import Test from "../view/component/Test";

const routes = [
  {
    path: "/",
    element: <DashboardComponent />,
  },
  {
    path: "/list-employee",
  element: <ListEmployeeComponent />,
  },
  {
    path: "*",
    element: <NotFoundComponent />,
  },
  {
    path: "/test",
    element: <Test />,
  },
];

export default routes;
