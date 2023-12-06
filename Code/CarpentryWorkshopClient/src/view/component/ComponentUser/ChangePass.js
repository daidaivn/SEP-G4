import React from "react";
import { Input, Modal } from "antd";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ChangeUserNameAndPassWord } from "../../../sevices/AccountService";
const ChangePass = ({
  isModalOpenChange,
  setIsModalOpenChange,
  userEmployeeID,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [capcha, setCapcha] = useState("");
  const validateData = () => {
    const errors = [];
    const passRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!password || (password && !passRegex.test(password))) {
      errors.push("Password không hợp lệ.");
    }

    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.warning(error);
      });
      return false;
    }
    return true;
  };
  const handleOkChange = () => {
    const vali = validateData();
    if(!vali){
      return;
    }
    if(password == rePassword){
      toast.warning("Mật khẩu phải giống khi nhập lại");
    }
    toast.promise(
      ChangeUserNameAndPassWord(userEmployeeID, username, password)
        .then((data) => {
          return data;
        })
        .catch((error) => {
          throw toast.error(error.response.data);
        }),
      {
        pending: "Đang xử lý",
        success: "Success",
      }
    );
    setIsModalOpenChange(false);
  };
  const handleCancelChange = () => {
    setIsModalOpenChange(false);
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
          <div className="change-head">Tài khoản / mật khẩu</div>
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
                type="text"
                placeholder="Nhập mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </div>
            <div className="item-change-body">
              <p>Nhập mật khẩu</p>
              <Input
                type="text"
                placeholder="Nhập mật khẩu"
                onChange={(e) => setRePassword(e.target.value)}
              ></Input>
            </div>
            <div className="item-change-body">
              <p>Capcha</p>
              <div className="capcha" type="text">
                I O Q R 4 M T
              </div>
            </div>
            <div className="item-change-body">
              <p>Xác nhận Capcha</p>
              <Input type="text" placeholder="Nhập capcha"></Input>
            </div>
            <div className="change-footer">
              <button className="cancel" onClick={handleCancelChange}>
                Hủy bỏ
              </button>
              <button className="edit" onClick={handleCancelChange}>
                Sửa
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
