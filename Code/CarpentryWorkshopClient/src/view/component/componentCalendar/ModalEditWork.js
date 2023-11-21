import React from "react";
import { Input, Modal, Select, Form, Switch } from "antd";

const EditWork = ({
  isModalOpenEditWork,
  handleOkEditWork,
  handleCancelEditWork,
  handleChange,
}) => {
  return (
    <>
      {" "}
      <Modal
        className="modal"
        open={isModalOpenEditWork}
        onOk={handleOkEditWork}
        onCancel={handleCancelEditWork}
      >
        <div className="modal-detail-all">
          <div className="head-modal">
            <p>Chỉnh sửa công việc</p>
          </div>
          <div className="body-modal">
            <div className="item-modal">
              <p>Tên công việc</p>
              <Input type="text"></Input>
            </div>
            <div className="item-modal">
              <p>Loại sản phẩm:</p>
              <Select
                defaultValue="lucy"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "Yiminghe",
                    label: "yiminghe",
                  },
                ]}
              />
            </div>
            <div className="item-modal">
              <p>Đơn giá 1 sản phẩm</p>
              <Input type="text" placeholder="ví dụ: 20.000"></Input>
            </div>
            <div className="item-modal">
              <p>Số sản phẩm cần sản xuất</p>
              <Input type="text" placeholder="ví dụ: 500.000"></Input>
            </div>
            <div className="item-modal">
              <p>Khu vục sản xuất</p>
              <Select
                defaultValue="lucy"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "Yiminghe",
                    label: "yiminghe",
                  },
                ]}
              />
            </div>
            <div className="item-modal">
              <p>Ngày</p>
              <Input type="date"></Input>
            </div>
            <div className="footer-modal">
              <span className="back" onClick={handleCancelEditWork}>
                Hủy bỏ
              </span>
              <span className="save" onClick={handleOkEditWork}>
                Lưu
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default EditWork;
