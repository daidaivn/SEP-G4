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
              <div className="item-child-change">
                <input
                  type="text"
                  placeholder="Nhập tài khoản"
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="item-change-body ">
              <p>Mật khẩu:</p>
              <div className="item-child-change ">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleShowPassword}>
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21.2699 9.18029C20.9799 8.72029 20.6699 8.29029 20.3499 7.89029C19.9799 7.42029 19.2799 7.38029 18.8599 7.80029L15.8599 10.8003C16.0799 11.4603 16.1199 12.2203 15.9199 13.0103C15.5699 14.4203 14.4299 15.5603 13.0199 15.9103C12.2299 16.1103 11.4699 16.0703 10.8099 15.8503C10.8099 15.8503 9.37995 17.2803 8.34995 18.3103C7.84995 18.8103 8.00995 19.6903 8.67995 19.9503C9.74995 20.3603 10.8599 20.5703 11.9999 20.5703C13.7799 20.5703 15.5099 20.0503 17.0899 19.0803C18.6999 18.0803 20.1499 16.6103 21.3199 14.7403C22.2699 13.2303 22.2199 10.6903 21.2699 9.18029Z"
                        fill="#060606"
                      />
                      <path
                        d="M14.0201 9.98062L9.98014 14.0206C9.47014 13.5006 9.14014 12.7806 9.14014 12.0006C9.14014 10.4306 10.4201 9.14062 12.0001 9.14062C12.7801 9.14062 13.5001 9.47062 14.0201 9.98062Z"
                        fill="#060606"
                      />
                      <path
                        d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
                        fill="#060606"
                      />
                      <path
                        d="M14.8601 12.0001C14.8601 13.5701 13.5801 14.8601 12.0001 14.8601C11.9401 14.8601 11.8901 14.8601 11.8301 14.8401L14.8401 11.8301C14.8601 11.8901 14.8601 11.9401 14.8601 12.0001Z"
                        fill="#060606"
                      />
                      <path
                        d="M21.7699 2.23086C21.4699 1.93086 20.9799 1.93086 20.6799 2.23086L2.22988 20.6909C1.92988 20.9909 1.92988 21.4809 2.22988 21.7809C2.37988 21.9209 2.56988 22.0009 2.76988 22.0009C2.96988 22.0009 3.15988 21.9209 3.30988 21.7709L21.7699 3.31086C22.0799 3.01086 22.0799 2.53086 21.7699 2.23086Z"
                        fill="#060606"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
                        fill="#070707"
                      />
                      <path
                        d="M11.9999 9.14062C10.4299 9.14062 9.1499 10.4206 9.1499 12.0006C9.1499 13.5706 10.4299 14.8506 11.9999 14.8506C13.5699 14.8506 14.8599 13.5706 14.8599 12.0006C14.8599 10.4306 13.5699 9.14062 11.9999 9.14062Z"
                        fill="#070707"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="item-change-body">
              <p>Xác nhận mật khẩu</p>
              <div className="item-child-change">
                {" "}
                <input
                  type={showVeryPassword ? "text" : "password"}
                  placeholder="Xác nhận mật khẩu"
                  onChange={(e) => setRePassword(e.target.value)}
                ></input>
                <button onClick={handleShowVeryPassword}>
                  {showVeryPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21.2699 9.18029C20.9799 8.72029 20.6699 8.29029 20.3499 7.89029C19.9799 7.42029 19.2799 7.38029 18.8599 7.80029L15.8599 10.8003C16.0799 11.4603 16.1199 12.2203 15.9199 13.0103C15.5699 14.4203 14.4299 15.5603 13.0199 15.9103C12.2299 16.1103 11.4699 16.0703 10.8099 15.8503C10.8099 15.8503 9.37995 17.2803 8.34995 18.3103C7.84995 18.8103 8.00995 19.6903 8.67995 19.9503C9.74995 20.3603 10.8599 20.5703 11.9999 20.5703C13.7799 20.5703 15.5099 20.0503 17.0899 19.0803C18.6999 18.0803 20.1499 16.6103 21.3199 14.7403C22.2699 13.2303 22.2199 10.6903 21.2699 9.18029Z"
                        fill="#060606"
                      />
                      <path
                        d="M14.0201 9.98062L9.98014 14.0206C9.47014 13.5006 9.14014 12.7806 9.14014 12.0006C9.14014 10.4306 10.4201 9.14062 12.0001 9.14062C12.7801 9.14062 13.5001 9.47062 14.0201 9.98062Z"
                        fill="#060606"
                      />
                      <path
                        d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
                        fill="#060606"
                      />
                      <path
                        d="M14.8601 12.0001C14.8601 13.5701 13.5801 14.8601 12.0001 14.8601C11.9401 14.8601 11.8901 14.8601 11.8301 14.8401L14.8401 11.8301C14.8601 11.8901 14.8601 11.9401 14.8601 12.0001Z"
                        fill="#060606"
                      />
                      <path
                        d="M21.7699 2.23086C21.4699 1.93086 20.9799 1.93086 20.6799 2.23086L2.22988 20.6909C1.92988 20.9909 1.92988 21.4809 2.22988 21.7809C2.37988 21.9209 2.56988 22.0009 2.76988 22.0009C2.96988 22.0009 3.15988 21.9209 3.30988 21.7709L21.7699 3.31086C22.0799 3.01086 22.0799 2.53086 21.7699 2.23086Z"
                        fill="#060606"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
                        fill="#070707"
                      />
                      <path
                        d="M11.9999 9.14062C10.4299 9.14062 9.1499 10.4206 9.1499 12.0006C9.1499 13.5706 10.4299 14.8506 11.9999 14.8506C13.5699 14.8506 14.8599 13.5706 14.8599 12.0006C14.8599 10.4306 13.5699 9.14062 11.9999 9.14062Z"
                        fill="#070707"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="item-change-body ">
              <p>Capcha</p>
              <div className="item-child-change ">
                <div className="capcha" type="text" contentEditable={false}>
                  {capcha.split("").join(" ")}
                </div>
                <button onClick={handleRefresh}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6.70817 6C8.11909 4.75448 9.9715 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12H2C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C9.27396 2 6.80296 3.09136 5 4.85869L5 2H3L3 8H9V6H6.70817Z"
                      fill="#262626"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="item-change-body item-capcha">
              <p>Xác nhận Capcha</p>
              <div className="item-child-change">
                {" "}
                <input
                  type="text"
                  placeholder="Nhập capcha"
                  onChange={(e) => setReCapcha(e.target.value)}
                ></input>
              </div>
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
