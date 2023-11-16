import React from "react";
import { Input, Modal, Select } from "antd";

const RewardAll = ({
  isModalOpenRewardAll,
  handleOkRewardAll,
  handleCancelRewardAll,
  handleChange,
}) => {
  return (
    <>
      {/* Modal Thưởng toàn thể công ty */}
      <Modal
        className="modal"
        open={isModalOpenRewardAll}
        onOk={handleOkRewardAll}
        onCancel={handleCancelRewardAll}
      >
        <div className="modal-detail-all">
          <div className="head-modal">
            <p>Thưởng toàn thể công ty</p>
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
              <p>Chi tiết thưởng</p>
              <Input
                type="text"
                placeholder="Ví lý do gì đấy nên được thưởng các quyền lợi"
              ></Input>
            </div>

            <div className="footer-modal">
              <span className="back" onClick={handleOkRewardAll}>
                Hủy bỏ
              </span>
              <span className="edit save" onClick={handleCancelRewardAll}>
                Lưu
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default RewardAll;
