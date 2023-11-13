import "../scss/reset.scss";
import "../scss/index.scss";
import "../scss/fonts.scss";
import "../scss/CalendarComponent.scss";
import MenuResponsive from "./componentUI/MenuResponsive";
import ListUserHeader from "./componentUI/ListUserHeader";
import { Form, Input, Select, Switch } from "antd";
import React, { useState } from "react";
import { Modal } from "antd";
import {
  ListSearchFilterAdd,
  ModalListShift,
  TableCalendar,
  ListModuleDetail,
  ListModuleDetail2,
  ModalAdd,
  ListModuleDetail3
} from "./componentCalendar";
const CalendarComponent = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  // Modal danh sach cong viec
  const [isModalOpenListShift, setIsModalOpenListShift] = useState(false);
  const showModalListShift = () => {
    setIsModalOpenListShift(true);
  };
  const handleOkListShift = () => {
    setIsModalOpenListShift(false);
  };
  const handleCancelListShift = () => {
    setIsModalOpenListShift(false);
  };

  // Modal them cong viec
  const [isModalOpeAdd, setIsModalOpenAdd] = useState(false);
  const showModalAdd = () => {
    setIsModalOpenAdd(true);
  };
  const handleOkAdd = () => {
    setIsModalOpenAdd(false);
  };
  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  // Modal chi tiet cong viec
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const showModalDetail = () => {
    setIsModalOpenDetail(true);
  };
  const handleOkDetail = () => {
    setIsModalOpenDetail(false);
  };
  const handleCancelDetail = () => {
    setIsModalOpenDetail(false);
  };
  // Modal Chi tiết phân công việc
  const [isModalOpenDetailShift, setIsModalOpenDetailShift] = useState(false);
  const showModalDetailShift = () => {
    setIsModalOpenDetailShift(true);
  };
  const handleOkDetailShift = () => {
    setIsModalOpenDetailShift(false);
  };
  const handleCancelDetailShift = () => {
    setIsModalOpenDetailShift(false);
  };

  //Thay doi trang thai chinh sua chi tiet cong viec
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };

  //Thay doi trang thai chinh sua chi tiet phan cong viec
  const [isEditingDetailShift, setIsEditingDetailShift] = useState(false);
  const handleEditDetailShift = () => {
    setIsEditingDetailShift(true);
    setIsModalOpenDetailShift(true); // Mở modal khi bắt đầu chỉnh sửa
  };
  const handleSaveDetailShift = () => {
    setIsEditingDetailShift(false);
    setIsModalOpenDetailShift(false); // Đóng modal khi lưu
  };
  const handleBackDetailShift = () => {
    setIsEditingDetailShift(false);
  };
  return (
    <>
      <div className="col-right-container">
        <div className="list-container-header">
          <div className="list-text-header">
            <h2>Lên lịch làm việc</h2>
            <span>Tạo công việc và giao việc làm cho từng nhóm</span>
          </div>
          <MenuResponsive />
          <ListUserHeader />
        </div>
        <ListSearchFilterAdd
          showModalListShift={showModalListShift}
          showModalAdd={showModalAdd}
        />
        <div className="time-shift">
          <div className="item-time-shift">
            <p>Thời gian làm việc:</p>
          </div>
          <div className="item-time-shift">
            <p>- Ca 1: 6h30 đến 15h30 </p>
            <p>- Ca 2: 6h30 đến15h30 </p>
          </div>
        </div>
        <TableCalendar
          handleEditDetailShift={handleEditDetailShift}
          showModalDetailShift={showModalDetailShift}
        />
        {/* modal danh sach cong viec */}
        <ModalListShift
          isModalOpenListShift={isModalOpenListShift}
          handleOkListShift={handleOkListShift}
          handleCancelListShift={handleCancelListShift}
          showModalDetail={showModalDetail}
        />
        <ListModuleDetail
          isModalOpenListShift={isModalOpenListShift}
          handleOkListShift={handleOkListShift}
          handleCancelListShift={handleCancelListShift}
          showModalDetail={showModalDetail}
        />

        {isEditing ? (
          // modal chinh sua cong viec
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
        ) : (
          // modal chi tiet cong viec
          <ListModuleDetail2
            isModalOpenDetail={isModalOpenDetail}
            handleOkDetail={handleOkDetail}
            handleCancelDetail={handleCancelDetail}
            handleEdit={handleEdit}
          />
        )}

        {/* modal them cong viec */}
        <ModalAdd
          isModalOpeAdd={isModalOpeAdd}
          handleOkAdd={handleOkAdd}
          handleCancelAdd={handleCancelAdd}
          handleChange={handleChange}
        />

        {isEditingDetailShift ? (
          // modal chỉnh sửa phân công việc
          <div className="modal-detail ">
            <Modal
              className="modal"
              open={isModalOpenDetailShift}
              onOk={handleSaveDetailShift}
              onCancel={handleCancelDetailShift}
            >
              <div className="modal-detail-all">
                <div className="head-modal">
                  <p>Phân công công việc nhóm 1</p>
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
                    <p>Loại sản phẩm:</p>
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
                    <span className="back" onClick={handleBackDetailShift}>
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
        ) : (
          // modal chi tiêt phân công việc
          <ListModuleDetail3
            isModalOpenDetailShift={isModalOpenDetailShift}
            handleOkDetailShift={handleOkDetailShift}
            handleCancelDetailShift={handleCancelDetailShift}
            handleEditDetailShift={handleEditDetailShift}
            showModalDetail={showModalDetail}
          />
        )}
      </div>
    </>
  );
};
export default CalendarComponent;
