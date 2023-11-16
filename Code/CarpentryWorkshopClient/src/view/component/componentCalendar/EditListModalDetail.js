import React from "react";
import { Input, Modal, Select } from "antd";

const EditListModalDetail = ({
  isModalOpenDetail,
  handleSave,
  handleCancelDetail,
  workDetailById,
  handleChange,
  setWorkDetailById,
  handleCancel,
}) => {
  return (
    <div className="modal-edit">
      <Modal
        className="modal"
        open={isModalOpenDetail}
        onOk={handleSave}
        onCancel={handleCancelDetail}
      >
        <div className="modal-detail-all">
          <div className="head-modal">
            <p>Sửa công việc</p>
          </div>
          <div className="body-edit">
            <div className="item-modal">
              <p>Tên công việc</p>
              <Input type="text" value={workDetailById.workName}></Input>
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
              <Input
                type="text"
                placeholder="ví dụ: 20.000"
                value={workDetailById.uniCost}
                onChange={(e) =>
                  setWorkDetailById({
                    ...workDetailById,
                    uniCost: e.target.value,
                  })
                }
              />
            </div>
            <div className="item-modal">
              <p>Số sản phẩm cần sản xuất</p>
              <Input
                type="text"
                placeholder="ví dụ: 20.000"
                value={workDetailById.numberProduct}
                onChange={(e) =>
                  setWorkDetailById({
                    ...workDetailById,
                    numberProduct: e.target.value,
                  })
                }
              ></Input>
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
              <p>Thời gian bắt đầu:</p>
              <Input type="date"></Input>
            </div>
            <div className="item-modal">
              <p>Thời gian kết thúc</p>
              <Input type="date"></Input>
            </div>
            <div className="footer-modal">
              <span className="back" onClick={handleCancel}>
                Hủy bỏ
              </span>
              <span className="edit save" onClick={handleSave}>
                Lưu
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditListModalDetail;
