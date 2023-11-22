import React from "react";
import { Input, Modal, Switch, Form, Select } from "antd";

const ListModuleDetail3 = ({
  isModalOpenDetailShift,
  handleOkDetailShift,
  handleCancelDetailShift,
  showModalEditWork,
  showModalDetail,
  handleChange,
  actionWork
}) => {
  return (
    <div className="modal-detail ">
      <Modal
        className="modal"
        open={isModalOpenDetailShift}
        onOk={handleOkDetailShift}
      >
        <div className="modal-detail-all">
          <div className="head-modal">
            {
              actionWork === "addWork" ? (<p>Thêm công việc</p>) : (<p>Sửa công việc</p>)
            }
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
              <span className="back" onClick={handleCancelDetailShift}>
                Hủy bỏ
              </span>
              {
                actionWork === "addWork" ? (<span className="save" onClick={handleOkDetailShift}>
                  Lưu
                </span>) : (<span className="edit" onClick={showModalEditWork}>
                  Sửa
                </span>)
              }
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListModuleDetail3;
