import React from "react";
import "../src/view/scss/index.scss";
import { Routes, Route, Outlet } from "react-router-dom";
import ListEmployeeComponent from "./view/component/ListEmployeeComponent";
import ListDepartmentComponent from "./view/component/DepartmentComponent";
import DashboardComponent from "./view/component/DashboardComponnet";
import NotFoundComponent from "./view/component/NotFoundComponent";
import Menucomponent from "./view/component/MenuComponent";
import Home from "./view/component/Home";
import DependentPerson from "./view/component/DependentPerson";
import Role from "./view/component/Role";
import GroupComponent from "./view/component/GroupComponent";
import Decentralization from "./view/component/Decentralization";
import TimekeepingComponent from "./view/component/TimekeepingComponent";
import MenuResponsive from "./view/component/componentUI/MenuResponsive";
import CalendarComponent from "./view/component/CalendarComponent";
import PayrollComponent from "./view/component/PayrollComponent";
import SeeWorkComponent from "./view/component/SeeWorkComponent";
import ShiftComponent from "./view/component/ShiftComponent";
function App() {
  let userPages = JSON.parse(localStorage.getItem("userPages")) || [];
  if (!userPages.length) {
    userPages = JSON.parse(sessionStorage.getItem("userPages")) || [];
  }
  return (
    <div className="screen">
      <Menucomponent />
      <MenuResponsive />

      <div className="col-right">
        <Routes>
          <Route path="/" element={<Home />} />
          {userPages.includes("Dashboard") && (
            <Route path="/dashboard" element={<DashboardComponent />} />
          )}
          {userPages.includes("ListEmployee") && (
            <Route path="/list-employee" element={<ListEmployeeComponent />} />
          )}
          {userPages.includes("ListDepartment") && (
            <Route
              path="/list-department"
              element={<ListDepartmentComponent />}
            />
          )}
          {userPages.includes("DependentPerson") && (
            <Route path="/dependent-person" element={<DependentPerson />} />
          )}
          {userPages.includes("ListGroup") && (
            <Route path="/list-group" element={<GroupComponent />} />
          )}
          {userPages.includes("Role") && (
            <Route path="/role" element={<Role />} />
          )}
          {userPages.includes("Decentralization") && (
            <Route path="/decentralization" element={<Decentralization />} />
          )}
          {userPages.includes("TimeKeeping") && (
            <Route path="/timekeeping" element={<TimekeepingComponent />} />
          )}
          {userPages.includes("Calendar") && (
            <Route path="/calendar" element={<CalendarComponent />} />
          )}
          {userPages.includes("Payroll") && (
            <Route path="/payroll" element={<PayrollComponent />} />
          )}
          {userPages.includes("SeeWork") && (
            <Route path="/seeWork" element={<SeeWorkComponent />} />
          )}
          {userPages.includes("Shift") && (
            <Route path="/shift" element={<ShiftComponent />} />
          )}
          <Route
            path="*"
            element={
              <>
                <NotFoundComponent />
                <Outlet />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
