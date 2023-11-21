import React from "react";
import { Input, Modal } from "antd";

const ListModuleDetail2 = ({
  isModalOpenDetail,
  handleOkDetail,
  handleCancelDetail,
  handleEditWork,
  workDetailById,
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
                <p>{workDetailById.workName}</p>
              </div>
            </div>
            <div className="item-modal">
              <p>Loại sản phẩm:</p>
              <div className="item-right">
                <p>{workDetailById.unitCostName}</p>
              </div>
            </div>
            <div className="item-modal">
              <p>Đơn giá 1 sản phẩm</p>
              <div className="item-right">
                <p>{workDetailById.unitCost}</p>
              </div>
            </div>
            <div className="item-modal">
              <p>Số sản phẩm cần sản xuất</p>
              <div className="item-right">
                <p>{workDetailById.totalProduct}</p>
              </div>
            </div>
            <div className="item-modal">
              <p>Khu vục sản xuất</p>
              <div className="item-right">
                <p>{workDetailById.workArea}</p>
              </div>
            </div>
            <div className="item-modal">
              <p>Thời gian bắt đầu:</p>
              <div className="item-right">
                <p>{workDetailById.timeStart}</p>
              </div>
            </div>
            <div className="item-modal">
              <p>Thời gian kết thúc</p>
              <div className="item-right">
                <p>{workDetailById.timeEnd}</p>
              </div>
            </div>
            <div className="footer-modal">
              <span className="back" onClick={handleCancelDetail}>
                Quay lại
              </span>
              <span
                className={`edit ${
                  workDetailById.status !== "WorkNotStart" ? "disabled" : ""
                }`}
                onClick={handleEditWork}
              >
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
