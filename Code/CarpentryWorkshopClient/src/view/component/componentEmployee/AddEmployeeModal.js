// EmployeeModal.js

import React from "react";
import { Modal, Input, Radio, Select, Space, Form, Switch,Row, Col, } from "antd";
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
})
{
  return (
    <Modal
      className="modal"
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1252}
    >
      <div className="modal-head">
        <h3>Thông tin cá nhân</h3>
      </div>
      <div className="modal-body">
        <div className="avatar">
          <div className="img-avatar">
            <img src={userDetail} alt="" />
          </div>
          <div className="name-avatar">
            <h2>Nguyễn Văn An</h2>
            <div className="activiti">
              <Form.Item valuePropName="checked">
                <Switch />
              </Form.Item>
              <span>Đang hoạt động</span>
            </div>
          </div>
          <div className="dependent">
            <span>Người phụ thuộc</span>
          </div>
        </div>
      </div>
      <div className="modal-info">
        <div className="info-detail">
          <span className="title-info">Thông tin cá nhân</span>
          <Row gutter={16}>
            <Col span={12}>
              <table className="table-info-detail">
                <tbody>
                  <tr>
                    <th className="text">Địa chỉ</th>
                    <td className="input-text">
                      <Input
                        placeholder="Basic usage"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="text">Giới tính</th>
                    <td className="input-text fix">
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
                    </td>
                  </tr>
                  <tr>
                    <th className="text">Số điện thoại</th>
                    <td className="input-text">
                      <Input
                        placeholder="Basic usage"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="text">CCCD</th>
                    <td className="input-text">
                      <Input
                        placeholder="Basic usage"
                        onChange={(e) => setIdCard(e.target.value)}
                        value={idCard}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col span={12}>
              <table className="table-info-detail">
                <tbody>
                  <tr>
                    <th className="text">Mã số thuế</th>
                    <td className="input-text">
                      <Input
                        placeholder="Basic usage"
                        onChange={(e) => setFax(e.target.value)}
                        value={fax}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="text">Chức vụ</th>
                    <td className="input-text">
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
                    </td>
                  </tr>

                  <tr>
                    <th className="text">Phòng ban</th>
                    <td className="input-text">
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn-cancel" onClick={handleCancel}>
          Hủy bỏ
        </button>
        <button className="btn-save" onClick={handleOk}>
          Lưu
        </button>
      </div>
    </Modal>
  );
};

export default AddEmployeeModal;


