import React, { useEffect, useState } from "react";
import user from "../../assets/images/Ellipse 69.svg";
import notification from "../../assets/images/icons/notification.svg";
import "../../scss/index.scss";

function ListUserHeader() {
  const [userName, setUserName] = useState("");
  const [userAllVisible, setUserAllVisible] = useState(false);

  const toggleUserAll = () => {
    setUserAllVisible(!userAllVisible);
  };

  const closeUserAll = () => {
    setUserAllVisible(false);
  };
  useEffect(() => {
    const storedUserName =
      localStorage.getItem("userName") || sessionStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);
  return (
    <>
      <div className="list-user-header">
        <span onClick={toggleUserAll}>{userName ? `${userName}` : "User"}</span>
        <img onClick={toggleUserAll} className="user-list" src={user} alt="" />
        <img className="notification-list" src={notification} alt="" />
      </div>
      {userAllVisible && (
        <div className="user-all">
          <div className="view-info">
            <svg
              onClick={closeUserAll}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.5 3.65385L11.1538 10L17.5 16.3462L16.3462 17.5L10 11.1538L3.65385 17.5L2.5 16.3462L8.84615 10L2.5 3.65385L3.65385 2.5L10 8.84615L16.3462 2.5L17.5 3.65385Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="view-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M22.6749 27.0254C21.5749 27.3504 20.275 27.5004 18.75 27.5004H11.25C9.72495 27.5004 8.42495 27.3504 7.32495 27.0254C7.59995 23.7754 10.9375 21.2129 15 21.2129C19.0625 21.2129 22.3999 23.7754 22.6749 27.0254Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.75 2.5H11.25C5 2.5 2.5 5 2.5 11.25V18.75C2.5 23.475 3.925 26.0625 7.325 27.025C7.6 23.775 10.9375 21.2125 15 21.2125C19.0625 21.2125 22.4 23.775 22.675 27.025C26.075 26.0625 27.5 23.475 27.5 18.75V11.25C27.5 5 25 2.5 18.75 2.5ZM15 17.7125C12.525 17.7125 10.525 15.7 10.525 13.225C10.525 10.75 12.525 8.75 15 8.75C17.475 8.75 19.475 10.75 19.475 13.225C19.475 15.7 17.475 17.7125 15 17.7125Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.4749 13.225C19.4749 15.7 17.4749 17.7125 14.9999 17.7125C12.5249 17.7125 10.5249 15.7 10.5249 13.225C10.5249 10.75 12.5249 8.75 14.9999 8.75C17.4749 8.75 19.4749 10.75 19.4749 13.225Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>Xem thông tin</p>
          </div>
          <div className="view-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="26"
              viewBox="0 0 25 24"
              fill="none"
            >
              <g clip-path="url(#clip0_902_1589)">
                <path
                  d="M7.14286 0C8.13058 0 8.92857 0.670312 8.92857 1.5V3H16.0714V1.5C16.0714 0.670312 16.8694 0 17.8571 0C18.8449 0 19.6429 0.670312 19.6429 1.5V3H22.3214C23.8002 3 25 4.00781 25 5.25V7.5H0V5.25C0 4.00781 1.19978 3 2.67857 3H5.35714V1.5C5.35714 0.670312 6.15513 0 7.14286 0ZM0 9H25V21.75C25 22.9922 23.8002 24 22.3214 24H2.67857C1.19978 24 0 22.9922 0 21.75V9ZM4.46429 12C3.97321 12 3.57143 12.3375 3.57143 12.75V15.75C3.57143 16.1625 3.97321 16.5 4.46429 16.5H20.5357C21.0268 16.5 21.4286 16.1625 21.4286 15.75V12.75C21.4286 12.3375 21.0268 12 20.5357 12H4.46429Z"
                  fill="#F7F7F7"
                />
              </g>
              <defs>
                <clipPath id="clip0_902_1589">
                  <rect width="25" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p>Xem lương</p>
          </div>
        </div>
      )}
    </>
  );
}
export default ListUserHeader;
