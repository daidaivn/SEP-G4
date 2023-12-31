import { useNavigate } from "react-router-dom";
import "../scss/reset.scss";
import "../scss/responsive/responsive.scss";
import "../scss/MenuComponent.scss";
import "../scss/fonts.scss";
import { Link, NavLink } from "react-router-dom";
import React, { useState } from "react";
import logo from "../assets/images/logo.png";

const Menucomponent = () => {
  const [activeDiv, setActiveDiv] = useState("div1");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleDivClick = (divId) => {
    setActiveDiv(divId);
  };

  let userPages = JSON.parse(localStorage.getItem("userPages")) || [];
  if (!userPages.length) {
    userPages = JSON.parse(sessionStorage.getItem("userPages")) || [];
  }

  let department = JSON.parse(localStorage.getItem("department")) || [];
  if (!department.length) {
    department = JSON.parse(sessionStorage.getItem("department")) || [];
  }

  const isHumanResourcesDepartment = department.includes("Phòng nhân sự");
  const isProductioneManager = department.includes("Phòng sản xuất");
  
  const hasAccessiblePage = userPages.some((page) =>
    [
      "ListEmployee",
      "ListDepartment",
      "DependentPerson",
      "Role",
      "ListGroup",
    ].includes(page)
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRoles");
    localStorage.removeItem("userPages");
    localStorage.removeItem("userEmployeeID");
    localStorage.removeItem("department");


    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userRoles");
    sessionStorage.removeItem("userPages");
    sessionStorage.removeItem("userEmployeeID");
    sessionStorage.removeItem("department");


    navigate("/login");
  };
  const hasPayrollAccess =
    userPages.includes("Payroll");

  return (
    <div className="list-menu">
      <div className="menu">
        <div className="logo-menu">
          <Link to="../">
            <img src={logo} />
          </Link>
          <h1 className="logo-name">Phú Cầu</h1>
        </div>
        <div className="body-menu scrollbar" id="style-15">
          <div className="item-link">
            <NavLink
              to={"/"}
              id="item-menu"
              onClick={() => handleDivClick("div1")}
              activeClassName={activeDiv === "div1" ? "active" : ""}
            >
              <i className="icon-home"></i>

              <span className="text">Trang chủ</span>
            </NavLink>
          </div>
          {userPages.includes("Dashboard") && (
            <div className="item-link">
              <NavLink
                to={"/dashboard"}
                id="item-menu"
                onClick={() => handleDivClick("div2")}
                activeClassName={activeDiv === "div2" ? "active" : ""}
              >
                <i className="icon-activity"></i>

                <span className="text">Biểu đồ</span>
              </NavLink>
            </div>
          )}
          {userPages.includes("Calendar") && (
            <div className="item-link">
              <NavLink
                to={"/calendar"}
                id="item-menu"
                onClick={() => handleDivClick("div10")}
                activeClassName={activeDiv === "div10" ? "active" : ""}
              >
                <i className="icon-grid"></i>

                <span className="text">Lên lịch làm việc</span>
              </NavLink>
            </div>
          )}
          {userPages.includes("Holiday") && (
            <div className="item-link">
              <NavLink
                to={"/holiday"}
                id="item-menu"
                onClick={() => handleDivClick("div11")}
                activeClassName={activeDiv === "div11" ? "active" : ""}
              >
                <i className="icon-plane"></i>

                <span className="text">{isHumanResourcesDepartment ? "Quản lý nghỉ lễ" : "Lịch nghỉ lễ"}</span>
              </NavLink>
            </div>
          )}
          {userPages.includes("Advance") && (
            <div className="item-link">
              <NavLink
                to={"/advance"}
                id="item-menu"
                onClick={() => handleDivClick("div12")}
                activeClassName={activeDiv === "div12" ? "active" : ""}
              >
                <i className="icon-wallet"></i>

                <span className="text">Danh sách tạm ứng</span>
              </NavLink>
            </div>
          )}
          {hasPayrollAccess && (
            <div className="item-link">
              <NavLink
                to={"/payroll"}
                id="item-menu"
                onClick={() => handleDivClick("div13")}
                activeClassName={activeDiv === "div13" ? "active" : ""}
              >
                <i className="icon-table"></i>

                <span className="text">Lương | Thưởng</span>
              </NavLink>
            </div>
          )}
          {userPages.includes("Decentralization") && (
            <div className="item-link">
              <NavLink
                to={"/decentralization"}
                id="item-menu"
                onClick={() => handleDivClick("div8")}
                activeClassName={activeDiv === "div8" ? "active" : ""}
              >
                <i className="icon-people "></i>

                <span className="text">Phân quyền</span>
              </NavLink>
            </div>
          )}
          {userPages.includes("TimeKeeping") && (
            <div className="item-link">
              <NavLink
                to={"/timekeeping"}
                id="item-menu"
                onClick={() => handleDivClick("div9")}
                activeClassName={activeDiv === "div9" ? "active" : ""}
              >
                <i className="icon-caseworker"></i>

                <span className="text">{isProductioneManager ? "Công việc | Điểm danh" : "Điểm danh"}</span>
              </NavLink>
            </div>
          )}
          {hasAccessiblePage && (
            <div className="dropdown-item">
              <div className="item-link item-link-all">
                <div id="item-menu" onClick={toggleDropdown}>
                  <i className="icon-profile"></i>
                  <span className="text">Danh sách</span>
                  <i
                    className={`dropdown-icon ${isDropdownOpen ? "open" : ""}`}
                  ></i>
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-content">
                    {userPages.includes("ListEmployee") && (
                      <div className="item-link">
                        <NavLink
                          to={"/list-employee"}
                          id="item-menu"
                          onClick={() => handleDivClick("div3")}
                          activeClassName={activeDiv === "div3" ? "active" : ""}
                          className={"item-child"}
                        >
                          <i className="icon-list"></i>

                          <span className="text">Người lao động </span>
                        </NavLink>
                      </div>
                    )}
                    {userPages.includes("ListDepartment") && (
                      <div className="item-link">
                        <NavLink
                          to={"/list-department"}
                          id="item-menu"
                          onClick={() => handleDivClick("div4")}
                          activeClassName={activeDiv === "div4" ? "active" : ""}
                          className={"item-child"}
                        >
                          <i className="icon-add1"></i>

                          <span className="text">Phòng - Ban </span>
                        </NavLink>
                      </div>
                    )}
                    {userPages.includes("DependentPerson") && (
                      <div className="item-link">
                        <NavLink
                          to={"/dependent-person"}
                          id="item-menu"
                          onClick={() => handleDivClick("div5")}
                          activeClassName={activeDiv === "div5" ? "active" : ""}
                          className={"item-child"}
                        >
                          <i className="icon-add1"></i>

                          <span className="text">Người phụ thuộc </span>
                        </NavLink>
                      </div>
                    )}
                    {userPages.includes("Role") && (
                      <div className="item-link">
                        <NavLink
                          to={"/role"}
                          id="item-menu"
                          onClick={() => handleDivClick("div6")}
                          activeClassName={activeDiv === "div6" ? "active" : ""}
                          className={"item-child"}
                        >
                          <i className="icon-add1"></i>

                          <span className="text">Chức vụ </span>
                        </NavLink>
                      </div>
                    )}
                    {userPages.includes("ListGroup") && (
                      <div className="item-link">
                        <NavLink
                          to={"/list-group"}
                          id="item-menu"
                          onClick={() => handleDivClick("div7")}
                          activeClassName={activeDiv === "div7" ? "active" : ""}
                          className={"item-child"}
                        >
                          <i className="icon-Meeting"></i>

                          <span className="text">Nhóm</span>
                        </NavLink>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="footer-body">
          <div className="item-menu" id="item-menu" onClick={handleLogout}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="vuesax/bold/logout">
                <g id="logout">
                  <path
                    id="Vector"
                    d="M28 3.33334H23.6667C18.3333 3.33334 15 6.66668 15 12V18.75H25.4167C26.1 18.75 26.6667 19.3167 26.6667 20C26.6667 20.6833 26.1 21.25 25.4167 21.25H15V28C15 33.3333 18.3333 36.6667 23.6667 36.6667H27.9833C33.3167 36.6667 36.65 33.3333 36.65 28V12C36.6667 6.66668 33.3333 3.33334 28 3.33334Z"
                    fill="white"
                  />
                  <path
                    id="Vector_2"
                    d="M7.60002 18.75L11.05 15.3C11.3 15.05 11.4167 14.7333 11.4167 14.4167C11.4167 14.1 11.3 13.7667 11.05 13.5333C10.5667 13.05 9.76669 13.05 9.28336 13.5333L3.70002 19.1167C3.21669 19.6 3.21669 20.4 3.70002 20.8833L9.28336 26.4667C9.76669 26.95 10.5667 26.95 11.05 26.4667C11.5334 25.9833 11.5334 25.1833 11.05 24.7L7.60002 21.25H15V18.75H7.60002Z"
                    fill="white"
                  />
                </g>
              </g>
            </svg>
            <span className="text">Đăng xuất</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menucomponent;
