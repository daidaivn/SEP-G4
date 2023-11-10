import React from 'react';
import { Modal, Input, Switch } from "antd";

const DetailEmployeeModal = ({
  avt,
  isModalOpen,
  handleOk,
  handleCancel,
  idDetail,
  convertDobToISO,
  showModalEditContract,
  showModalEditRole,
  handleEdit,
}) => {
  return (
    <Modal
          className="modal"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1252}
        >
          {/* Modail view detail */}
          <div className="modal-add-employee">
            <div className="modal-head-employee">
              <h3>Thông tin nhân viên chi tiết</h3>
            </div>
            <div className="modal-add-employee-all">
              <div className="modal-employee-box1">
                <div className="modal-child-body1">
                  <div className="img-body1">
                    <img
                      src={idDetail && idDetail.image ? idDetail.image : avt}
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-child-body2">
                  <div className="div-modal-child2 div-detail">
                    <p>Họ và tên:</p>
                    <Input
                      value={
                        idDetail && idDetail.fullName
                          ? idDetail.fullName
                          : "Chưa có thông tin"
                      }
                    />
                  </div>
                  <div className="div-modal-child2 div-detail">
                    <p>Giới tính: </p>
                    <div className="radio-employee">
                      <Input
                        value={
                          idDetail && idDetail.genderstring
                            ? idDetail.genderstring
                            : "Chưa có thông tin"
                        }
                      />
                    </div>
                  </div>
                  <div className="div-modal-child2 div-detail">
                    <p>Quốc tịch:</p>
                    <Input
                      value={
                        idDetail && idDetail.country
                          ? idDetail.country
                          : "Chưa có thông tin"
                      }
                    />
                  </div>

                  <div className="div-modal-child2 div-detail">
                    <p>Địa chỉ: </p>
                    <Input
                      value={
                        idDetail && idDetail.address
                          ? idDetail.address
                          : "Chưa có thông tin"
                      }
                    />
                  </div>
                  <div className="div-modal-child2 div-detail">
                    <p>Mã định danh: </p>
                    <Input
                      value={
                        idDetail && idDetail.cic
                          ? idDetail.cic
                          : "Chưa có thông tin"
                      }
                    />
                  </div>
                  <div className="div-modal-child2 div-detail">
                    <p>Số điện thoại: </p>
                    <Input
                      value={
                        idDetail && idDetail.phoneNumber
                          ? idDetail.phoneNumber
                          : "Chưa có thông tin"
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="modal-employee-box2">
                <div className="modal-box2-child">
                  <div className="box2-child-cn">
                    <div className="box-child-employee1 div-detail">
                      <p>Mã số thuế:</p>
                      <Input
                        value={
                          idDetail && idDetail.taxId
                            ? idDetail.taxId
                            : "Chưa có thông tin"
                        }
                      />
                    </div>
                    <div className="box-child-employee1 div-detail">
                      <p>Lương cơ bản:</p>
                      <Input
                        value={
                          idDetail && idDetail.wageNumber
                            ? idDetail.wageNumber
                            : "Chưa có thông tin"
                        }
                      />
                    </div>
                  </div>
                  <div className="box2-child-cn">
                    <div className="box-child-employee1 div-detail">
                      <p>Ngày sinh:</p>
                      <input
                        type="date"
                        value={
                          idDetail && idDetail.dobstring
                            ? convertDobToISO(idDetail.dobstring)
                            : "Chưa có thông tin"
                        }
                      />
                    </div>
                    <div className="box-child-employee1 div-detail">
                      <p>Trạng thái:</p>
                      <Switch
                        checked={
                          idDetail && idDetail.status ? idDetail.status : false
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer modal-footer-add">
              <div className="btn-left">
                <div className="modal-footer1" onClick={showModalEditContract}>
                  Xem hợp đồng
                </div>
                <div className="modal-footer1" onClick={showModalEditRole}>
                  Xem chức vụ
                </div>
              </div>

              <div className="modal-footer modal-footer2">
                <button className="btn-cancel" onClick={handleCancel}>
                  Thoát
                </button>
                <button className="btn-edit" onClick={handleEdit}>
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
        </Modal>
  );
};

export default DetailEmployeeModal;
