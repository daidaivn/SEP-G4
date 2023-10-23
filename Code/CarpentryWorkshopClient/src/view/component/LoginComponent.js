import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../scss/loginComponent.scss";
import "../scss/index.scss";
import "../scss/fonts.scss";
import logo from "../assets/images/logo.png";
import { Checkbox } from "antd";
import { Link } from "react-router-dom";
import apiLogin from '../../sevices/Login';

const LoginComponent = () => {
  const [userData, setUserData] = useState({
    userName: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra nếu đã đăng nhập sau khi component được render
    if (sessionStorage.getItem("userToken") || localStorage.getItem("userToken")) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = () => {
    apiLogin.login(userData)
      .then(response => {
        console.log('Phản hồi thành công:', response);
        if (rememberMe) {
          localStorage.setItem('userToken', response.token);
          localStorage.setItem('userName', response.name);
          localStorage.setItem('userRoles', JSON.stringify(response.roles));
          localStorage.setItem('userPages', JSON.stringify(response.pages)); 
        } else {
          sessionStorage.setItem('userToken', response.token);
          sessionStorage.setItem('userName', response.name);
          sessionStorage.setItem('userRoles', JSON.stringify(response.roles));
          sessionStorage.setItem('userPages', JSON.stringify(response.pages)); 
        }
        navigate('/');
      })
      .catch(error => {
        console.error('Lỗi:', error);
      });

  };

  return (
    <div className="main-login">
      <div className="body-main-login">
        <div className="head-login">
          <div className="logo-login">
            <div className="img-logo">
              <img src={logo} alt="" />
            </div>
            <div className="name-logo">Phú Cầu</div>
          </div>
          <div className="text-login">Đăng nhập tài khoản</div>
        </div>
        <div className="body-login">
          <div className="title-login">
            <p>
              Vui lòng điền thông tin tài khoản và mật khẩu của bạn đã được công
              ty cung cấp.
            </p>
          </div>
          <div className="input-user">
            <div className="text-user">Tài khoản: </div>
            <input type="text" placeholder="Nhập tên đăng nhập"
              value={userData.userName}
              onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
            />
          </div>
          <div className="input-user">
            <div className="text-user">Mật khẩu: </div>
            <input type="password" placeholder="Nhập mật khẩu"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
          </div>
          <div className="box-forget">
            <div className="save-user">
              <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              <p>Lưu tài khoản</p>
            </div>
            <div className="forget-pass">
              <Link to={"/forget"}>Quên mật khẩu ?</Link>
            </div>
          </div>
          <div className="submit">
            <button className="btn-login" onClick={handleLogin}>
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;