import React from "react";
import "../src/view/scss/index.scss";
import { Routes, Route } from "react-router-dom";
import ListEmployeeComponent from "./view/component/ListEmployeeComponent";
import ListDepartmentComponent from "./view/component/DepartmentComponent";
import DashboardComponent from "./view/component/DashboardComponnet";
import NotFoundComponent from "./view/component/NotFoundComponent";
import Menucomponent from "./view/component/MenuComponent";
import Home from "./view/component/Home";
import DependentPerson from "./view/component/DependentPerson";
import Role from "./view/component/Role";

function App() {
  return (
    <div className="screen">
      <Menucomponent />
      <div className="col-right">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardComponent />} />
          <Route path="/list-employee" element={<ListEmployeeComponent />} />
          <Route
            path="/list-department"
            element={<ListDepartmentComponent />}
          />
          <Route path="/dependent-person" element={<DependentPerson />} />
          <Route path="/role" element={<Role />} />
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
