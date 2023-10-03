import React from "react";
import "../src/view/scss/index.scss"
import { Outlet, Routes, Route } from "react-router-dom";
import MenuComponent from "./view/component/MenuComponent";
import ListEmployeeComponent from "./view/component/ListEmployeeComponent";
import ListDepartmentComponent from "./view/component/DepartmentComponent";
import DashboardComponent from "./view/component/DashboardComponnet";
import NotFoundComponent from "./view/component/NotFoundComponent";
import { Col, Row } from "antd";
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div className="screen">
        <div xxl={4} span={4}>
          <MenuComponent />
        </div>
        <div className="col-right">
          <Routes>
            <Route path="/" element={<DashboardComponent />} />
            <Route path="/list-employee" element={<ListEmployeeComponent />} />
            <Route path="/list-department" element={<ListDepartmentComponent />} />
            <Route path="*" element={<NotFoundComponent />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
