import React from "react";
import { Input, Modal, Select } from "antd";

const Holiday = ({
  isModalOpenHoliday,
  handleOkHoliday,
  handleCancelHoliday,
  handleChange,
}) => {
  return (
    <>
      {/* Modal Thưởng cá nhân */}
      <Modal
        className="modal"
        open={isModalOpenHoliday}
        onOk={handleOkHoliday}
        onCancel={handleCancelHoliday}
      >
        <div className="modal-detail-all">
          <div className="head-modal">
            <p>Hiếu hỉ</p>
          </div>
          <div className="body-modal">
            <div className="item-modal">
              <p>Loại hiếu hỉ:</p>
              <Input type="text" placeholder="Viếng thăm"></Input>
            </div>
            <div className="item-modal">
              <p>Số tiền thưởng:</p>
              <Input type="text" placeholder="500.000"></Input>
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
            <div className="item-modal">
              <p>Chi tiết thưởng</p>
              <Input
                type="text"
                placeholder="Ví lý do gì đấy nên được thưởng các quyền lợi"
              ></Input>
            </div>

            <div className="footer-modal">
              <span className="back" onClick={handleOkHoliday}>
                Hủy bỏ
              </span>
              <span className="edit save" onClick={handleCancelHoliday}>
                Lưu
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Holiday;
