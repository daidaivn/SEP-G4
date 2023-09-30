import "../scss/reset.scss";
import "../scss/responsive.scss";
import "../scss/ListEmployeeComponent.scss";
import { Input, Switch, Form } from "antd";
import MenuComponent from "./MenuComponent";
import { Col, Row } from "antd";
import user from "../assets/images/Ellipse 69.svg";
import notification from "../assets/images/icons/notification.svg";
import { Select } from "antd";
import add from "../assets/images/icons/Frame 16.svg";
import user1 from "../assets/images/Ellipse 72.svg";
import userDetail from "../assets/images/Ellipse 73.svg";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Radio } from "antd";
const ListEmployeeComponent = () => {
  const [value, setValue] = useState(1);
  const onChangeRadio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <div className="body-list-employee">
      <div className="head-list">
        <div className="input-search">
          <div className="text">
            <h2>Danh sách nhân viên</h2>
            <span>
              Hiển thị thông tin chi tiết của các nhân viên trong xưởng mộc
            </span>
          </div>
        </div>
        <div className="user">
          <span className="name-user">User</span>
          <img src={user} alt="" />
        </div>
        <div className="notification">
          <img src={notification} alt="" />
        </div>
      </div>

      <div className="filter">
        <div className="input-search search-add">
          <i className="icon-search"></i>
          <Input placeholder="Tìm kiếm" />
        </div>
        <div className="input-filter">
          <i className="icon-filter icon-search"></i>
          <Select
            showSearch
            placeholder="Bộ lọc"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[
              {
                value: "nhanvien",
                label: "Nhân viên",
              },
              {
                value: "quanly",
                label: "Quản Lý",
              },
            ]}
          />
        </div>
        <div className="add-employee">
          <span className="btn-add_employee">
            <img src={add} alt="" />
          </span>
        </div>
      </div>
      <div className="table-employee">
        <table>
          <thead>
            <tr className="title-employee">
              <th>Ảnh</th>
              <th>Họ và tên</th>
              <th>Giới tính</th>
              <th>Số điện thoại</th>
              <th>Chức vụ</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody className="tbody-employee">
            <tr className="content-employee" onClick={showModal}>
              <td>
                <img src={user1} alt="" />
              </td>
              <td>Nguyễn Văn An</td>
              <td>Nam</td>
              <td>0123456789</td>
              <td>Nhân viên</td>
              <td>
                <Form.Item valuePropName="checked">
                  <Switch checked />
                </Form.Item>
              </td>
            </tr>
            <tr className="content-employee" onClick={showModal}>
              <td>
                <img src={user1} alt="" />
              </td>
              <td>Nguyễn Văn An</td>
              <td>Nam</td>
              <td>0123456789</td>
              <td>Nhân viên</td>
              <td>
                <Form.Item valuePropName="checked">
                  <Switch checked />
                </Form.Item>
              </td>
            </tr>
            <tr className="content-employee" onClick={showModal}>
              <td>
                <img src={user1} alt="" />
              </td>
              <td>Nguyễn Văn An</td>
              <td>Nam</td>
              <td>0123456789</td>
              <td>Nhân viên</td>
              <td>
                <Form.Item valuePropName="checked">
                  <Switch checked />
                </Form.Item>
              </td>
            </tr>
            <tr className="content-employee" onClick={showModal}>
              <td>
                <img src={user1} alt="" />
              </td>
              <td>Nguyễn Văn An</td>
              <td>Nam</td>
              <td>0123456789</td>
              <td>Nhân viên</td>
              <td>
                <Form.Item valuePropName="checked">
                  <Switch />
                </Form.Item>
              </td>
            </tr>
            <tr className="content-employee" onClick={showModal}>
              <td>
                <img src={user1} alt="" />
              </td>
              <td>Nguyễn Văn An</td>
              <td>Nam</td>
              <td>0123456789</td>
              <td>Nhân viên</td>
              <td>
                <Form.Item valuePropName="checked">
                  <Switch />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
        <Modal
          className="modal"
          open={isModalOpen}
          on
          Ok={handleOk}
          onCancel={handleCancel}
          width={1252}
        >
          <div className="modal-head"></div>
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
                        <th className="text">Họ và tên</th>
                        <td className="input-text">
                          <Input
                            placeholder="Basic usage"
                            value="Nguyễn Văn An"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th className="text">Giới tính</th>
                        <td className="input-text fix">
                          <Radio.Group onChange={onChangeRadio} value={value}>
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
                        <th className="text">Địa chỉ</th>
                        <td className="input-text">
                          <Input
                            placeholder="Basic usage"
                            value="123 Đường ABC"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th className="text">Số điện thoại</th>
                        <td className="input-text">
                          <Input placeholder="Basic usage" value="0123456789" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
                <Col span={12}>
                  <table className="table-info-detail">
                    <tbody>
                      <tr>
                        <th className="text">CCCD</th>
                        <td className="input-text">
                          <Input placeholder="Basic usage" value="123456789" />
                        </td>
                      </tr>
                      <tr>
                        <th className="text">Chức vụ</th>
                        <td className="input-text">
                          <Input placeholder="Basic usage" value="Nhân viên" />
                        </td>
                      </tr>
                      <tr>
                        <th className="text">Mã số thuế</th>
                        <td className="input-text">
                          <Input placeholder="Basic usage" value="0987654321" />
                        </td>
                      </tr>
                      <tr>
                        <th className="text">Phòng ban</th>
                        <td className="input-text">
                          <Input
                            placeholder="Basic usage"
                            value="Phòng kế toán"
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
            <button className="btn-edit" onClick={handleOk}>
              Chỉnh sửa
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
