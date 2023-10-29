// EmployeeModal.js

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
import userDetail from "../../assets/images/Ellipse 73.svg";

function AddEmployeeModal({
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
  handleChange,
  Option,
  avt,
  handleEdit,
  handleCancelAdd,
  handleOkAdd,
  isModalOpenAdd,
}) {
  return (
    <Modal
      className="modal"
      open={isModalOpenAdd}
      on
      Ok={handleOkAdd}
      onCancel={handleCancelAdd}
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
              <div className="div-modal-child2">
                <p>Họ:</p>
                <Input placeholder="Nhập họ kèm tên đệm" />
              </div>
              <div className="div-modal-child2">
                <p>Tên:</p>
                <Input placeholder="Nhập tên" />
              </div>

              <div className="div-modal-child2">
                <p>Giới tính: </p>
                <div className="radio-employee">
                  <Radio.Group
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                  >
                    <Radio value={1} className="gender">
                      Nam
                    </Radio>
                    <Radio value={2} className="gender">
                      Nữ
                    </Radio>
                  </Radio.Group>
                </div>
              </div>
              <div className="div-modal-child2">
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
              <div className="div-modal-child2">
                <p>Địa chỉ: </p>
                <Input placeholder="Nhập địa chỉ" />
              </div>
              <div className="div-modal-child2">
                <p>Mã định danh: </p>
                <Input placeholder="Nhập mã định danh" />
              </div>
            </div>
          </div>
          <div className="modal-employee-box2">
            <div className="modal-box2-child">
              <div className="box2-child-cn">
                <div className="box-child-employee1">
                  <p>Mã số thuế:</p>
                  <Input placeholder="Nhập mã số thuế" />
                </div>
                <div className="box-child-employee1">
                  <p>Lương cơ bản:</p>
                  <Input value="4000000" className="salary" />
                </div>
                <div className="box-child-employee1">
                  <p>Trạng thái hợp đồng:</p>
                  <Form.Item valuePropName="checked" className="action">
                    <Switch checked="true" />
                  </Form.Item>
                </div>
              </div>
              <div className="box2-child-cn">
                <div className="box-child-employee1">
                  <p>Số điện thoại:</p>
                  <Input placeholder="Nhập số điện thoại" />
                </div>
                <div className="box-child-employee1">
                  <p>Chức vụ</p>
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
                <div className="box-child-employee1">
                  <p>phòng ban</p>
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
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer modal-footer-add">
          <button className="btn-cancel" onClick={handleCancelAdd}>
            Hủy bỏ
          </button>
          <button className="btn-edit btn-save" onClick={handleOkAdd}>
            Lưu
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddEmployeeModal;
