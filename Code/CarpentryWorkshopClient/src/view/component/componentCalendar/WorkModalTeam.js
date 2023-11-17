import React from "react";
import { Input, Modal, Select, Form, Switch } from "antd";

const WorkModalTeam = ({
  isModalOpenDetailShift,
  handleSaveDetailShift,
  handleCancelDetailShift,
  handleChange,
  handleBackDetailShift,
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
            <p>Phân công công việc nhóm 3</p>
          </div>
          <div className="body-modal">
            <div className="item-modal">
              <p>Tên công việc</p>
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
              <p>Số ngày làm:</p>
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
              <p>Ngày bắt đầu:</p>
              <Input type="date"></Input>
            </div>
            <div className="item-modal-last">
              <p>Trạng thái:</p>
              <div className="item-right">
                <p className="switch">
                  <Form.Item valuePropName="checked">
                    <Switch checked="true" />
                  </Form.Item>
                </p>
                <p>Làm việc</p>
              </div>
            </div>

            <div className="footer-modal">
              <span className="back" onClick={handleCancelDetailShift}>
                Hủy bỏ
              </span>
              <span className="edit save" onClick={handleSaveDetailShift}>
                Lưu
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WorkModalTeam;
