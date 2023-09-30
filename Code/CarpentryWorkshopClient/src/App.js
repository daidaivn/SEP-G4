import React from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import MenuComponent from "./view/component/MenuComponent";
import ListEmployeeComponent from "./view/component/ListEmployeeComponent";
import DashboardComponent from "./view/component/DashboardComponnet";
import NotFoundComponent from "./view/component/NotFoundComponent";
import Test from "./view/component/Test";
import { Col, Row } from "antd";

function App() {
  return (
    <div className="list-employee">
      <Row>
        <Col span={4}>
          <MenuComponent />
        </Col>
        <Col span={20}>
          <Routes>
            <Route path="/" element={<DashboardComponent />} />
            <Route path="/list-employee" element={<ListEmployeeComponent />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<NotFoundComponent />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
}

export default App;
