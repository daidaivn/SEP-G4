import React from "react";
import {
  Modal,
  Input,
  Radio,
  Select,
  Space,
  Form,
  Switch,
  Row,
  Col,
} from "antd";
import { Option } from "antd/es/mentions";
import userDetail from "../../assets/images/Ellipse 73.svg";
const DetailEmployeeModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  address,
  setAddress,
  gender,
  setGender,
  phone,
  setPhone,
  idCard,
  setIdCard,
  fax,
  setFax,
  role,
  setRole,
  department,
  setDepartment,
  value,
  onChangeRadio,
  handleEdit,
  handleCancelAdd,
  handleChange,
  avt,
}) => {
  return (
    <Modal
      className="modal"
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1252}
    >
      <div className="modal-add-employee">
        <div className="modal-head-employee">
          <h3>Thông tin cá nhân</h3>
        </div>
        <div className="modal-add-employee-all">
          <div className="modal-employee-box1">
            <div className="modal-child-body1">
              <div className="img-body1">
                <img src={avt} alt="" />
              </div>
            </div>
            <div className="modal-child-body2">
              <div className="div-modal-child2 div-detail">
                <p>Họ và tên:</p>
                <Input value="Nguyễn Văn An" />
              </div>

              <div className="div-modal-child2 div-detail">
                <p>Giới tính: </p>
                <div className="radio-employee">
                  <Input value="Nam" />
                </div>
              </div>
              <div className="div-modal-child2 div-detail">
                <p>Quốc tịch:</p>
                <Select
                  className="select-input"
                  mode="multiple"
                  style={{
                    width: "100%",
                  }}
                  defaultValue={["china"]}
                  onChange={handleChange}
                  optionLabelProp="label"
                >
                  <Option value="china" label="China">
                    <Space>China</Space>
                  </Option>
                  <Option value="usa" label="USA">
                    <Space>USA</Space>
                  </Option>
                  <Option value="japan" label="Japan">
                    <Space>Japan</Space>
                  </Option>
                  <Option value="korea" label="Korea">
                    <Space>Korea</Space>
                  </Option>
                </Select>
              </div>
              <div className="div-modal-child2 div-detail">
                <p>Địa chỉ: </p>
                <Input value="Hà Nội" />
              </div>
              <div className="div-modal-child2 div-detail">
                <p>Mã định danh: </p>
                <Input value="000125558995" />
              </div>
              <div className="div-modal-child2 div-detail">
                <p>Số điện thoại: </p>
                <Input value="0192568746" />
              </div>
            </div>
          </div>
          <div className="modal-employee-box2 ">
            <div className="modal-box2-child">
              <div className="box2-child-cn">
                <div className="box-child-employee1 div-detail">
                  <p>Mã số thuế:</p>
                  <Input value="0987654321" />
                </div>
                <div className="box-child-employee1 div-detail">
                  <p>Lương cơ bản:</p>
                  <Input value="4000000" className="salary" />
                </div>
                <div className="box-child-employee1 div-detail">
                  <p>Trạng thái hợp đồng:</p>
                  <Form.Item valuePropName="checked" className="action">
                    <Switch checked="true" />
                  </Form.Item>
                  <p className="text-option">Còn thời hạn</p>
                </div>
              </div>
              <div className="box2-child-cn ">
                <div className="box-child-employee1 div-detail">
                  <p>Số điện thoại:</p>
                  <Input value="0987654321" />
                </div>
                <div className="box-child-employee1 div-detail">
                  <p>Chức vụ:</p>
                  <Input value="Trưởng phòng" />
                </div>
                <div className="box-child-employee1 div-detail">
                  <p>Kiêm nghiệm chức vụ:</p>
                  <Input value="Trưởng phòng" />
                </div>
                <div className="box-child-employee1 div-detail">
                  <p>Phòng ban:</p>
                  <Input value="Phòng kế toán" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer modal-footer-add">
          <div className="modal-footer1">Người phụ thuộc</div>
          <div className="modal-footer modal-footer2">
            <button className="btn-cancel" onClick={handleCancelAdd}>
              Hủy bỏ
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
