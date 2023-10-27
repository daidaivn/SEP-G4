import React from "react";
import { Modal, Input, Radio, Select, Space, Form, Switch, Row, Col } from "antd";
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
  handleEdit
}) => {
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
                        onChange={onChangeRadio}
                        value={value}
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
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="text">CCCD</th>
                    <td className="input-text">
                      <Input
                        placeholder="Basic usage"
                        value={idCard}
                        onChange={(e) => setIdCard(e.target.value)}
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
                        value={fax}
                        onChange={(e) => setFax(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="text">Chức vụ</th>
                    <td className="input-text">
                      <Input
                        placeholder="Basic usage"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="text">Phòng ban</th>
                    <td className="input-text">
                      <Input
                        placeholder="Basic usage"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
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
        <button className="btn-edit" onClick={handleEdit}>
          Chỉnh sửa
        </button>
      </div>
    </Modal>
  );
};

export default DetailEmployeeModal;
