import React from "react";
import { Input, Modal, Switch, Form } from "antd";

const ListModuleDetail3 = ({
  isModalOpenDetailShift,
  handleOkDetailShift,
  handleCancelDetailShift,
  handleEditDetailShift,
  showModalDetail,
}) => {
  return (
    <div className="modal-detail ">
      <Modal
        className="modal"
        open={isModalOpenDetailShift}
        onOk={handleOkDetailShift}
        onCancel={handleCancelDetailShift}
      >
        <div className="modal-detail-all">
          <div className="head-modal">
            <p>Chi tiết phân công việc</p>
          </div>
          <div className="body-modal">
            <div className="item-modal">
              <p>Công việc</p>
              <div className="item-right">
                <p>Nhóm 1</p>
              </div>
            </div>
            <div className="item-modal">
              <p>Ca làm việc</p>
              <div className="item-right">
                <p>Chọn ca làm</p>
              </div>
            </div>
            <div className="item-modal">
              <p>Thời gian làm</p>
              <div className="item-right">
                <p>Tuần</p>
              </div>
            </div>
            <div className="item-modal">
              <p>Số sản phẩm hoàn thành</p>
              <div className="item-right">
                <p>80</p>
              </div>
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
              <span className="edit" onClick={handleEditDetailShift}>
                Sửa
              </span>
              <span className="green" onClick={showModalDetail}>
                Chi tiết công việc
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListModuleDetail3;
