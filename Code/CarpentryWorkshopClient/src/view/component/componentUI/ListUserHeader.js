import React, { useEffect, useState } from 'react';
import user from "../../assets/images/Ellipse 69.svg";
import notification from "../../assets/images/icons/notification.svg";
import "../../scss/index.scss";

function ListUserHeader() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName') || sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);
  return (
    <div className="list-user-header">
      <span>{userName ? `${userName}` : 'User'}</span>
      <img className="user-list" src={user} alt="" />
      <img className="notification-list" src={notification} alt="" />
    </div>
  );
}
export default ListUserHeader;
