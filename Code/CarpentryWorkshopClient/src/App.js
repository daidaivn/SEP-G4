import React from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import MenuComponent from "./view/component/MenuComponent";
import ListEmployeeComponent from "./view/component/ListEmployeeComponent";
import DashboardComponent from "./view/component/DashboardComponnet";
import NotFoundComponent from "./view/component/NotFoundComponent";
import { Col, Row } from "antd";
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div className="layout-menu">
      <Container fluid>
      <Row>
        <Col xxl={4} span={4}>
          <MenuComponent />
        </Col>
        <Col xxl={20} span={20}>
          <Routes>
            <Route path="/" element={<DashboardComponent />} />
            <Route path="/list-employee" element={<ListEmployeeComponent />} />
            <Route path="*" element={<NotFoundComponent />} />
          </Routes>
        </Col>
      </Row>
      </Container>
    </div>
  );
}

export default App;
