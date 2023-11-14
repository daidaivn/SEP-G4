import React from "react";
import { Input, Modal, Select } from "antd";

const RewardPersonal = ({
  isModalOpenRewardPersonal,
  handleOkRewardPersonal,
  handleCancelRewardPersonal,
  handleChange,
}) => {
  return (
    <>
      {/* Modal Thưởng cá nhân */}
      <Modal
        className="modal"
        open={isModalOpenRewardPersonal}
        onOk={handleOkRewardPersonal}
        onCancel={handleCancelRewardPersonal}
      >
        <div className="modal-detail-all">
          <div className="head-modal">
            <p>Thưởng cá nhân</p>
          </div>
          <div className="body-modal">
            <div className="item-modal">
              <p>Loại thưởng</p>
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
              <p>Số tiền thưởng:</p>
              <Input type="text"></Input>
            </div>
            <div className="item-modal">
              <p>Chọn nhân viên</p>
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

            <div className="footer-modal">
              <span className="back" onClick={handleOkRewardPersonal}>
                Hủy bỏ
              </span>
              <span className="edit save" onClick={handleCancelRewardPersonal}>
                Lưu
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default RewardPersonal;
