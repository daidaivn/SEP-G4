import React from "react";
import { Input, Modal } from "antd";

const ListModuleDetail2 = ({
  isModalOpenDetail,
  handleOkDetail,
  handleCancelDetail,
  handleEdit,
}) => {
  return (
    <div className="modal-detail ">
      <Modal
        className="modal"
        open={isModalOpenDetail}
        onOk={handleOkDetail}
        onCancel={handleCancelDetail}
      >
        <div className="modal-detail-all">
          <div className="head-modal">
            <p>Chi tiết công việc</p>
          </div>
          <div className="body-modal">
            <div className="item-modal">
              <p>Tên công việc</p>
              <div className="item-right">
                <p>Lắp ghép sản phẩm</p>
              </div>
            </div>
            <div className="item-modal">
              <p>Loại sản phẩm:</p>
              <div className="item-right">
                <p>Ghế</p>
              </div>
            </div>
            <div className="item-modal">
              <p>Đơn giá 1 sản phẩm</p>
              <div className="item-right">
                <p>20000</p>
              </div>
            </div>
            <div className="item-modal">
              <p>Số sản phẩm cần sản xuất</p>
              <div className="item-right">
                <p>500.000</p>
              </div>
            </div>
            <div className="item-modal">
              <p>Khu vục sản xuất</p>
              <div className="item-right">
                <p>Nhà A</p>
              </div>
            </div>
            <div className="item-modal">
              <p>Thời gian bắt đầu:</p>
              <div className="item-right">
                <p>20-11-2023 :00:00:00</p>
              </div>
            </div>
            <div className="item-modal">
              <p>Thời gian kết thúc</p>
              <div className="item-right">
                <p>21-11-2023 :00:00:00</p>
              </div>
            </div>
            <div className="footer-modal">
              <span className="back" onClick={handleCancelDetail}>
                Quay lại
              </span>
              <span className="edit" onClick={handleEdit}>
                Sửa
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListModuleDetail2;
