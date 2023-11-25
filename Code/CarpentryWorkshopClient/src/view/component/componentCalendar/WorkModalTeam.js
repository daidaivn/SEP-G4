import React from "react";
import { Input, Modal, Select, Form, Switch } from "antd";

const WorkModalTeam = ({
  isModalOpenDetailShift,
  handleSaveDetailShift,
  handleCancelDetailShift,
  handleChange,
}) => {
  return (
    <div className="modal-detail ">
      <Modal
        className="modal"
        open={isModalOpenDetailShift}
        onOk={handleSaveDetailShift}
        onCancel={handleCancelDetailShift}
      >
        <div className="modal-detail-all">
          <div className="head-modal">
            <p>Chi tiết công việc</p>
            <div className="close">
              <svg
                onClick={handleCancelDetailShift}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M30 2.30769L17.3077 15L30 27.6923L27.6923 30L15 17.3077L2.30769 30L0 27.6923L12.6923 15L0 2.30769L2.30769 0L15 12.6923L27.6923 0L30 2.30769Z"
                  fill="white"
                />
              </svg>
            </div>
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
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WorkModalTeam;
