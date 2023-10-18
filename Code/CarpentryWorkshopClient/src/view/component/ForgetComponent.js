import "../scss/loginComponent.scss";
import "../scss/index.scss";
import "../scss/fonts.scss";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
const ForgetComponent = () => {
  const [mess, setMess] = useState("");
  const btnSent = () => {
    setMess("Tài khoản của bạn đã được gủi đến Email. Vui lòng kiểm tra");
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
          <div className="text-login">Quên tài khoản - Mật khẩu</div>
        </div>
        <div className="body-login">
          <div className="title-login">
            <p>
              Chúng tôi sẽ gửi cho bạn tài khoản hiện tại của bạn và mật khẩu
              mới. Vui lòng điền Email của bạn.
            </p>
          </div>
          <div className="input-user">
            <div className="text-user">Email: </div>
            <input type="email" placeholder="Nhập email của bạn" />
          </div>
          <div className="input-user-null">
            <p>{mess}</p>
          </div>
          <div className="submit-forget">
            <button className="btn-back">
              <Link to={"/login"}>Quay lại</Link>
            </button>
            <button className="btn-login" onClick={btnSent}>
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgetComponent;
