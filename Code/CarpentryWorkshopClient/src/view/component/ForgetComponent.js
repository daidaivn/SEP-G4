import "../scss/loginComponent.scss";
import "../scss/index.scss";
import "../scss/fonts.scss";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { forgotPassword } from "../../sevices/AccountService";
const ForgetComponent = () => {
  const [mess, setMess] = useState("");
  const [email, setEmail] = useState("");
  const validateData = () => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || (email && !emailRegex.test(email))) {
      errors.push("Email không hợp lệ.");
    }

    if (errors.length > 0) {
      errors.forEach((error) => {
        setMess(error);;
      });
      return false;
    }
    return true;
  };
  const btnSent = () => {
    const vali = validateData();
    if(!vali){
      return;
    }
    toast.promise(
      forgotPassword(email)
        .then((data) => {
          setEmail("");
          return data;
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            setMess(error.response.data);
          }
          else {
            setMess(error.response.data);
          }
        }),
      {
        pending: "Đang xử lý",
        success: "Success",
      }
    );
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
            <input type="email" placeholder="Nhập email của bạn" onChange={(e)=>setEmail(e.target.value)}/>
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
