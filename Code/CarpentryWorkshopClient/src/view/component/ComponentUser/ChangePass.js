import React from "react";
import { Input, Modal } from "antd";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ChangeUserNameAndPassWord } from "../../../sevices/AccountService";
import { set } from "date-fns";
const ChangePass = ({
  isModalOpenChange,
  setIsModalOpenChange,
  userEmployeeID,
  capcha,
  setCapcha,
  generateCaptcha,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [reCapcha, setReCapcha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVeryPassword, setShowVeryPassword] = useState(false);

  const accountName =
    localStorage.getItem("accountName") ||
    sessionStorage.getItem("accountName");

  console.log('accountName', accountName);


  const validateData = () => {
    const errors = [];
    const passRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  
    if (!password) {
      // Không có thông báo lỗi
    } else if (!passRegex.test(password)) {
      errors.push(
        "Mật khẩu phải có độ dài tối thiểu 8 ký tự, bao gồm ít nhất một chữ cái in hoa và một chữ số."
      );
    }
  
    if (!username) {
      errors.push("Xin vui lòng nhập tài khoản.");
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.push(
        "Tài khoản chỉ có thể chứa các ký tự chữ cái, số và dấu gạch dưới."
      );
    }
  
    if (!rePassword) {
      errors.push("Xin vui lòng xác nhận mật khẩu.");
    } else if (password !== rePassword) {
      errors.push("Mật khẩu xác nhận không khớp.");
    }
  
    if (!reCapcha) {
      errors.push("Xin vui lòng nhập mã captcha.");
    } else if (reCapcha !== capcha) {
      errors.push("Mã captcha không chính xác. Vui lòng thử lại.");
      setCapcha(generateCaptcha());
    }
  
    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.warning(error, {
          position: "top-right",
        });
      });
      return false;
    }
    return true;
  };
  

  const reset = () => {
    setUsername("");
    setPassword("");
    setReCapcha("");
  };
  const handleOkChange = () => {
    const vali = validateData();
    if (!vali) {
      return;
    }
    if (password != rePassword) {
      toast.warning("Mật khẩu phải giống khi nhập lại");
      return;
    }
    if (reCapcha != capcha) {
      toast.warning("Bạn cần phải nhập đúng capcha");
      setCapcha(generateCaptcha());
      return;
    }
    toast.promise(
      ChangeUserNameAndPassWord(userEmployeeID, username, password)
        .then((data) => {
          reset();
          setIsModalOpenChange(false);
          return data;
        })
        .catch((error) => {
          throw toast.error(error.response.data);
        }),
      {
        pending: "Đang xử lý",
        success: "Thay đổi thành tài khoản thành công",
      }
    );
  };
  const handleCancelChange = () => {
    reset();
    setIsModalOpenChange(false);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowVeryPassword = () => {
    setShowVeryPassword(!showVeryPassword);
  };

  const handleRefresh = () => {
    setCapcha(generateCaptcha());
  };

  return (
    <>
      {/* modal doi mat khau */}
      <Modal
        className="modal"
        open={isModalOpenChange}
        onOk={handleOkChange}
        onCancel={handleCancelChange}
      >
        <div className="change-all">
          <div className="change-head">Đổi tài khoản / mật khẩu</div>
          <div className="change-body">
            <div className="item-change-body">
              <p>Tài khoản:</p>
              <Input
                type="text"
                placeholder="Nhập tài khoản"
                onChange={(e) => setUsername(e.target.value)}
              ></Input>
            </div>
            <div className="item-change-body">
              <p>Mật khẩu:</p>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={(handleShowPassword)}>
                {showPassword ? "Ẩn" : "Hiển thị"}
              </button>
            </div>
            <div className="item-change-body">
              <p>Xác nhận mật khẩu</p>
              <Input
                type={showVeryPassword ? "text" : "password"}
                placeholder="Xác nhận mật khẩu"
                onChange={(e) => setRePassword(e.target.value)}
              ></Input>
              <button onClick={(handleShowVeryPassword)}>
                {showVeryPassword ? "Ẩn" : "Hiển thị"}
              </button>
            </div>
            <div className="item-change-body">
              <p>Capcha</p>
              <div className="capcha" type="text" contentEditable={false}>
                {capcha.split('').join(' ')}
              </div>
              <button onClick={handleRefresh}>Refresh</button>
            </div>
            <div className="item-change-body">
              <p>Xác nhận Capcha</p>
              <Input type="text" placeholder="Nhập capcha" onChange={(e) => setReCapcha(e.target.value)}></Input>
            </div>
            <div className="change-footer">
              <button className="cancel" onClick={handleCancelChange}>
                Hủy bỏ
              </button>
              <button className="save" onClick={handleOkChange}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ChangePass;
