import "../scss/reset.scss";
import "../scss/index.scss";
import "../scss/ListEmployeeComponent.scss";
import "../scss/responsive/responsive.scss";
import "../scss/responsive/ListEmployee.scss";
import "../scss/fonts.scss";
import { Input, Switch, Form } from "antd";
import { Col, Row } from "antd";
import user from "../assets/images/Ellipse 69.svg";
import notification from "../assets/images/icons/notification.svg";
import userDetail from "../assets/images/Ellipse 73.svg";
import { Modal } from "antd";
import { Radio } from "antd";
import React, { useState, useEffect } from "react";
import {
  fetchAllEmplyee,
  fetchEmplyeebyid,
} from "../../sevices/EmployeeService";
import profile from "../assets/images/Ellipse 72.svg";
import MenuResponsive from "./componentUI/MenuResponsive";
import Filter from "./componentUI/Filter";
import ListUserHeader from "./componentUI/ListUserHeader";
import { Select, Space } from "antd";
import {
  TableEmployee,
  TableEmployeeRes,
  AddEmployeeModal,
  DetailEmployeeModal,
} from "./componentEmployee";
import avt from "../assets/images/Frame 1649.svg";
function ListEmployeeComponent() {
  const [employees, setEmployees] = useState([]);

  const [id, setId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState("Hà Nội");
  const [gender, setGender] = useState("Nguyễn Văn An");
  const [phone, setPhone] = useState("0899999577");
  const [fax, setFax] = useState("0899999577");
  const [idCard, setIdCard] = useState("0899999577");
  const [role, setRole] = useState("Nhân viên");
  const [department, setDepartment] = useState("Phòng kế toán");

  const [employeeData, setEmployeeData] = useState(null);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };
  useEffect(() => {
    fetchAllEmplyee()
      .then((response) => {
        setEmployees(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    if (id !== null) {
      fetchEmplyeebyid(id)
        .then((response) => {
          setEmployeeData(response);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const { Option } = Select;
  const handleChangeAddEmployee = (value) => {
    console.log(`selected ${value}`);
  };
  const [value, setValue] = useState(1);
  const onChangeRadio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalDetail = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const showModalAdd = () => {
    setIsModalOpenAdd(true);
  };
  const handleOkAdd = () => {
    setIsModalOpenAdd(false);
  };
  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };
  return (
    <div className="col-right-container">
      <div className="list-container-header">
        <div className="list-text-header">
          <h2>Danh sách nhân viên</h2>
          <span>
            Hiển thị thông tin chi tiết của các nhân viên trong xưởng mộc
          </span>
        </div>
        <MenuResponsive />
        <ListUserHeader />
      </div>
      <div className="list-search-filter-add">
        <div className="list-input-search">
          <i className="icon-web">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="vuesax/linear/search-normal">
                <g id="search-normal">
                  <path
                    id="Vector"
                    d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
                    stroke="#64966E"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                    stroke="#64966E"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </g>
            </svg>
          </i>
          <i className="icon-responsive">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="vuesax/linear/search-normal">
                <g id="search-normal">
                  <path
                    id="Vector"
                    d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
                    stroke="#64966E"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                    stroke="#64966E"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </g>
            </svg>
          </i>
          <Input placeholder="Tìm kiếm"></Input>
        </div>
        <div className="list-filter">
          <i className="list-filter-icon1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M14.3201 19.07C14.3201 19.68 13.92 20.48 13.41 20.79L12.0001 21.7C10.6901 22.51 8.87006 21.6 8.87006 19.98V14.63C8.87006 13.92 8.47006 13.01 8.06006 12.51L4.22003 8.47C3.71003 7.96 3.31006 7.06001 3.31006 6.45001V4.13C3.31006 2.92 4.22008 2.01001 5.33008 2.01001H18.67C19.78 2.01001 20.6901 2.92 20.6901 4.03V6.25C20.6901 7.06 20.1801 8.07001 19.6801 8.57001"
                stroke="#3A5A40"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.07 16.5201C17.8373 16.5201 19.27 15.0874 19.27 13.3201C19.27 11.5528 17.8373 10.1201 16.07 10.1201C14.3027 10.1201 12.87 11.5528 12.87 13.3201C12.87 15.0874 14.3027 16.5201 16.07 16.5201Z"
                stroke="#3A5A40"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.87 17.1201L18.87 16.1201"
                stroke="#3A5A40"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </i>
          <Select
            className="select-input"
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
              {
                value: "disabled",
                label: "Disabled",
              },
            ]}
          />
        </div>
        <i className="icon-responsive icon-filter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M7.15979 9.53513C7.15979 9.84013 6.95977 10.2401 6.70477 10.3951L5.99979 10.8501C5.34479 11.2551 4.43478 10.8001 4.43478 9.99013V7.31512C4.43478 6.96012 4.23479 6.50513 4.02979 6.25513L2.10977 4.23512C1.85477 3.98012 1.65479 3.53013 1.65479 3.22513V2.06512C1.65479 1.46012 2.10979 1.00513 2.66479 1.00513H9.33478C9.88978 1.00513 10.3448 1.46012 10.3448 2.01512V3.12512C10.3448 3.53012 10.0898 4.03513 9.83978 4.28513"
              stroke="white"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.03506 8.26006C8.91872 8.26006 9.63507 7.54372 9.63507 6.66006C9.63507 5.77641 8.91872 5.06006 8.03506 5.06006C7.15141 5.06006 6.43506 5.77641 6.43506 6.66006C6.43506 7.54372 7.15141 8.26006 8.03506 8.26006Z"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.93506 8.56006L9.43506 8.06006"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </i>
        <div className="list-add" onClick={showModalAdd}>
          <i className="icon-web">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M20.8745 16.75H18.6245V14.5C18.6245 14.09 18.2845 13.75 17.8745 13.75C17.4645 13.75 17.1245 14.09 17.1245 14.5V16.75H14.8745C14.4645 16.75 14.1245 17.09 14.1245 17.5C14.1245 17.91 14.4645 18.25 14.8745 18.25H17.1245V20.5C17.1245 20.91 17.4645 21.25 17.8745 21.25C18.2845 21.25 18.6245 20.91 18.6245 20.5V18.25H20.8745C21.2845 18.25 21.6245 17.91 21.6245 17.5C21.6245 17.09 21.2845 16.75 20.8745 16.75Z"
                fill="white"
              />
              <path
                opacity="0.4"
                d="M22.3745 8.52V3.98C22.3745 2.57 21.7345 2 20.1445 2H16.1045C14.5145 2 13.8745 2.57 13.8745 3.98V8.51C13.8745 9.93 14.5145 10.49 16.1045 10.49H20.1445C21.7345 10.5 22.3745 9.93 22.3745 8.52Z"
                fill="white"
              />
              <path
                d="M10.8745 8.52V3.98C10.8745 2.57 10.2345 2 8.64451 2H4.60451C3.01451 2 2.37451 2.57 2.37451 3.98V8.51C2.37451 9.93 3.01451 10.49 4.60451 10.49H8.64451C10.2345 10.5 10.8745 9.93 10.8745 8.52Z"
                fill="white"
              />
              <path
                opacity="0.4"
                d="M10.8745 19.77V15.73C10.8745 14.14 10.2345 13.5 8.64451 13.5H4.60451C3.01451 13.5 2.37451 14.14 2.37451 15.73V19.77C2.37451 21.36 3.01451 22 4.60451 22H8.64451C10.2345 22 10.8745 21.36 10.8745 19.77Z"
                fill="white"
              />
            </svg>
          </i>
        </div>
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
                      defaultValue="lucy"
                      style={{
                        width: "100%",
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
                        {
                          value: "disabled",
                          label: "Disabled",
                        },
                      ]}
                    />
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
        <i className="icon-responsive icon-filter icon-add">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              d="M8.48719 6.94879H7.56411V6.02571C7.56411 5.8575 7.42462 5.71802 7.25642 5.71802C7.08821 5.71802 6.94873 5.8575 6.94873 6.02571V6.94879H6.02565C5.85744 6.94879 5.71796 7.08827 5.71796 7.25648C5.71796 7.42468 5.85744 7.56417 6.02565 7.56417H6.94873V8.48725C6.94873 8.65545 7.08821 8.79494 7.25642 8.79494C7.42462 8.79494 7.56411 8.65545 7.56411 8.48725V7.56417H8.48719C8.65539 7.56417 8.79488 7.42468 8.79488 7.25648C8.79488 7.08827 8.65539 6.94879 8.48719 6.94879Z"
              fill="white"
            />
            <path
              opacity="0.4"
              d="M9.10254 3.57233V1.70977C9.10254 1.13131 8.83997 0.897461 8.18766 0.897461H6.53023C5.87792 0.897461 5.61536 1.13131 5.61536 1.70977V3.56823C5.61536 4.15079 5.87792 4.38054 6.53023 4.38054H8.18766C8.83997 4.38464 9.10254 4.15079 9.10254 3.57233Z"
              fill="white"
            />
            <path
              d="M4.38458 3.57233V1.70977C4.38458 1.13131 4.12202 0.897461 3.46971 0.897461H1.81227C1.15996 0.897461 0.8974 1.13131 0.8974 1.70977V3.56823C0.8974 4.15079 1.15996 4.38054 1.81227 4.38054H3.46971C4.12202 4.38464 4.38458 4.15079 4.38458 3.57233Z"
              fill="white"
            />
            <path
              opacity="0.4"
              d="M4.38458 8.18779V6.53035C4.38458 5.87804 4.12202 5.61548 3.46971 5.61548H1.81227C1.15996 5.61548 0.8974 5.87804 0.8974 6.53035V8.18779C0.8974 8.84009 1.15996 9.10266 1.81227 9.10266H3.46971C4.12202 9.10266 4.38458 8.84009 4.38458 8.18779Z"
              fill="white"
            />
          </svg>
        </i>
      </div>
      <div className="list-text-header-res">
        <h2>Danh sách nhân viên</h2>
        <span>
          Hiển thị thông tin chi tiết của các nhân viên trong xưởng mộc
        </span>
      </div>

      <TableEmployeeRes employees={employees} />

      {employees.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <TableEmployee
          employees={employees}
          showModal={showModal}
          setId={setId}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <div>
        {isEditing ? (
          <AddEmployeeModal
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            address={address}
            setAddress={setAddress}
            gender={gender}
            setGender={setGender}
            phone={phone}
            setPhone={setPhone}
            idCard={idCard}
            setIdCard={setIdCard}
            fax={fax}
            setFax={setFax}
            handleChange={handleChange}
            Option={Option}
          />
        ) : (
          <DetailEmployeeModal
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            address={address}
            setAddress={setAddress}
            gender={gender}
            setGender={setGender}
            phone={phone}
            setPhone={setPhone}
            idCard={idCard}
            setIdCard={setIdCard}
            fax={fax}
            setFax={setFax}
            role={role}
            department={department}
            setRole={setRole}
            setDepartment={setDepartment}
            value={value}
            onChangeRadio={onChangeRadio}
            handleEdit={handleEdit}
            Option={Option}
          />
        )}
      </div>
      {isEditing ? (
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
                    <p>Họ:</p>
                    <Input value="Nguyễn Văn" />
                  </div>
                  <div className="div-modal-child2 div-detail">
                    <p>Tên:</p>
                    <Input value="An" />
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
                  <div className="div-modal-child2 div-detail">
                    <p>Địa chỉ: </p>
                    <Input value="Hà Nội" />
                  </div>
                  <div className="div-modal-child2 div-detail">
                    <p>Mã định danh: </p>
                    <Input value="000125558995" />
                  </div>
                </div>
              </div>
              <div className="modal-employee-box2">
                <div className="modal-box2-child">
                  <div className="box2-child-cn ">
                    <div className="box-child-employee1 div-detail">
                      <p>Mã số thuế:</p>
                      <Input value="0987654321" />
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
                    <div className="box-child-employee1 div-detail">
                      <p>Số điện thoại:</p>
                      <Input value="0192568746" />
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
            <div className="modal-footer modal-footer-add modal-footer-edit">
              <button className="btn-cancel" onClick={handleCancelAdd}>
                Hủy bỏ
              </button>
              <button className="btn-edit btn-save" onClick={handleSave}>
                Lưu
              </button>
            </div>
          </div>
        </Modal>
      ) : (
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
                    <Input value="Việt Nam" />
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
                      <p>Chức vụ:</p>
                      <div className="value">
                        <div className="value2">
                          <div className="value3">
                            <p>Trưởng phòng</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="box-child-employee1 div-detail">
                      <p>Kiêm nghiệm chức vụ:</p>
                      <div className="value">
                        <div className="value2">
                          <div className="value3">
                            <p>Nhân viên</p>
                          </div>
                        </div>
                        <div className="value2">
                          <div className="value3">
                            <p>Nhân viên</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="box-child-employee1 div-detail">
                      <p>Phòng ban:</p>
                      <div className="value">
                        <div className="value2">
                          <div className="value3">
                            <p>Phòng kế toán</p>
                          </div>
                        </div>
                        <div className="value2">
                          <div className="value3">
                            <p>Phòng kế toán</p>
                          </div>
                        </div>
                      </div>
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
      )}
    </div>
  );
}

export default ListEmployeeComponent;
