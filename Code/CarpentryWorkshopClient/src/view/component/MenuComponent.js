import "../scss/reset.scss";
import "../scss/responsive.scss";
import "../scss/MenuComponent.scss";
import { Col, Row } from "antd";
import { Link, NavLink } from "react-router-dom";
import React, { useState } from "react";
const MenuComponent = () => {
  const [activeDiv, setActiveDiv] = useState("div1");

  const handleDivClick = (divId) => {
    setActiveDiv(divId);
  };
  return (
    <div className="list-menu">
      <div className="menu">
        <div className="logo-menu">
          <Link to="../">
            <svg
              width="55"
              height="55"
              viewBox="0 0 55 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                id="Ellipse 70"
                cx="27.5"
                cy="27.5"
                r="27.5"
                fill="white"
              />
            </svg>
          </Link>
          <h1 className="logo-name">Tên app</h1>
        </div>
        <div className="body-menu">
          <div className="item-link">
            <NavLink
              to={"/"}
              id="item-menu"
              onClick={() => handleDivClick("div1")}
              activeClassName={activeDiv === "div1" ? "active" : ""}
            >
              <i className="icon-activity"></i>

              <span className="text">Dashboard</span>
            </NavLink>
          </div>
          <div className="item-link">
            <NavLink
              to={"/list-employee"}
              id="item-menu"
              onClick={() => handleDivClick("div2")}
              activeClassName={activeDiv === "div2" ? "active" : ""}
            >
              <i className="icon-profile"></i>

              <span className="text">Danh sách</span>
            </NavLink>
          </div>
          <div className="item-link">
            <NavLink
              to={"/list-department"}
              id="item-menu"
              onClick={() => handleDivClick("div2")}
              activeClassName={activeDiv === "div2" ? "active" : ""}
            >
              <i className="icon-profile"></i>

              <span className="text">Danh sách Phòng - Ban</span>
            </NavLink>
          </div>
        </div>
        <div className="footer-body">
          <div className="item-menu" id="item-menu">
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

export default MenuComponent;
