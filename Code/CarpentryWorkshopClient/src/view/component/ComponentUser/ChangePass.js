import React from "react";
import { Input, Modal } from "antd";
const ChangePass = ({
  isModalOpenChange,
  handleOkChange,
  handleCancelChange,
}) => {
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
              <Input type="text" placeholder="Nhập tài khoản"></Input>
            </div>
            <div className="item-change-body">
              <p>Mật khẩu:</p>
              <Input type="text" placeholder="Nhập mật khẩu"></Input>
            </div>
            <div className="item-change-body">
              <p>Nhập mật khẩu</p>
              <Input type="text" placeholder="Nhập mật khẩu"></Input>
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
