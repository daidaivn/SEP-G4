import "../scss/loginComponent.scss";
import "../scss/index.scss";
import "../scss/fonts.scss";
import logo from "../assets/images/logo.png";
import { Checkbox } from "antd";
const LoginComponent = () => {
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
              Vui lòng điền thông tin tài khoản đã được công ty cung cấp và mật
              khẩu của bạn.
            </p>
          </div>
          <div className="input-user">
            <div className="text-user">Tài khoản: </div>
            <input type="text" placeholder="Nhập tên đăng nhập" />
          </div>
          <div className="input-user">
            <div className="text-user">Mật khẩu: </div>
            <input type="password" placeholder="Nhập mật khẩu" />
          </div>
          <div className="box-forget">
            <div className="save-user">
              <Checkbox></Checkbox>
              <p>Lưu tài khoản</p>
            </div>
            <div className="forget-pass">Quên mật khẩu ?</div>
          </div>
          <div className="submit">
            <button className="btn-login">Đăng nhâp</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;
