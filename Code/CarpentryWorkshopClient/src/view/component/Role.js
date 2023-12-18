import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../scss/index.scss";
import "../scss/DepartmentComponent.scss";
import "../scss/fonts.scss";
import "../scss/responsive/Role.scss";
import { Switch, Form, Modal, Space } from "antd";
import ListUserHeader from "./componentUI/ListUserHeader";
import MenuResponsive from "./componentUI/MenuResponsive";
import {
  fetchAllRole,
  SearchRoles,
  GetRoleById,
  UpdateRole,
} from "../../sevices/RoleService";
import { Input } from "antd";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
function Role() {
  const [role, setRole] = useState([]);
  const handleChange = (value) => {
  };
  const [isModalOpenGroup, setIsModalOpenGroup] = useState(false);
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [filterStatus, setFilterStatus] = useState(null);
  const [inputSearch, setInputSearch] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [roleDetail, setroleDetail] = useState([]);
  const [switchChecked, setSwitchChecked] = useState(true);

  const handleOkGroup = () => {
    setIsModalOpenGroup(false);
  };
  const handleCancelGroup = () => {
    setIsModalOpenGroup(false);
  };
  const showModalDetail = () => {
    setIsModalOpenDetail(true);
  };
  const handleOkDetail = () => {
    setIsModalOpenDetail(false);
  };
  const handleCancelDetail = () => {
    setIsModalOpenDetail(false);
  };
  const handleOkAdd = () => {
    setIsModalOpenAdd(false);
    UpdateNameRole();
  };
  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };
  const handleChangeFilterStatus = (value) => {
    setFilterStatus(value);
    searchandfilter(inputSearch, value);
  };
  const handleChangeInnputSearch = (e) => {
    setInputSearch(e.target.value);
    searchandfilter(e.target.value, filterStatus);
  };
  const searchandfilter = (ipSearch, ftStatus) => {
    SearchRoles(ipSearch, ftStatus)
      .then((data) => {
        setRole(data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu phòng ban:", error);
      });
  };
  const ferchRoleDetail = (RoleID, RoleName) => {
    toast.promise(
      new Promise((resolve) => {
        GetRoleById(RoleID)
          .then((data) => {
            setRoleId(RoleID);
            setRoleName(RoleName);
            showModalDetail();
            setroleDetail(data);
            resolve();
          })
          .catch((error) => {
            resolve(error);
          });
      }),
      {
        pending: "Đang xử lý",
      }
    );
  };

  const UpdateNameRole = () => {
    toast.promise(
      new Promise((resolve) => {
        UpdateRole(roleId, inputSearch, switchChecked)
          .then((data) => {
            resolve(data);
            ferchRoleDetail(roleId);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        success: "Thêm nhân viên thành công",
        error: "Lỗi thêm vào nhóm",
      }
    );
  };

  const fetchData = () => {
    let isDataLoaded = false;
    let toastId = null;
  
    fetchAllRole()
      .then((data) => {
        isDataLoaded = true;
        setRole(data);
        if (toastId) {
          toast.dismiss(toastId); // Hủy thông báo nếu nó đã được hiển thị
        }
      })
      .catch((error) => {
        isDataLoaded = true;
        if (toastId) {
          toast.dismiss(toastId); // Hủy thông báo nếu nó đã được hiển thị
        }
        toast.error('Lỗi không có chức vụ'); // Hiển thị thông báo lỗi ngay lập tức
      });
    setTimeout(() => {
      if (!isDataLoaded) {
        toastId = toast('Đang xử lý...', { autoClose: false }); // Hiển thị thông báo pending sau 1.5s nếu dữ liệu chưa được tải
      }
    }, 1500);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="col-right-container">
        <div className="list-container-header">
          <div className="list-text-header">
            <h2>Danh sách chức vụ</h2>
            <span>Hiển thị các chức vụ có trong xưởng mộc</span>
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
            <Input
              placeholder="Tìm kiếm"
              onChange={handleChangeInnputSearch}
            ></Input>
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
              value={filterStatus}
              style={{
                width: 120,
              }}
              onChange={handleChangeFilterStatus}
              options={[
                {
                  value: true,
                  label: "Bật",
                },
                {
                  value: false,
                  label: "Tắt",
                },
                filterStatus !== null
                  ? {
                      value: null,
                      label: "Bỏ chọn",
                    }
                  : null,
              ].filter(Boolean)}
              placeholder="Chọn trạng thái"
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
         
        </div>
        
        <table className="list-table">
          <thead>
            <tr>
              <td>STT</td>
              <td>Chức vụ</td>
              <td>Số thành viên chức vụ</td>
              <td>Trạng thái</td>
            </tr>
          </thead>
          {role.length === 0 ? (
            <p>Thông tin chức vụ chưa sẵn sàng hoặc không tồn tại.</p>
          ) : (
            <tbody class="scrollbar" id="style-15">
              {role.map((role, index) => (
                <tr
                  key={role.roleID}
                  onClick={() => ferchRoleDetail(role.roleID, role.roleName)}
                >
                  <td>{index + 1}</td>
                  <td>{role.roleName}</td>
                  <td>{role.employees.length}</td>
                  <td>
                    <Form.Item valuePropName="checked">
                      <Switch checked={role.status} />
                    </Form.Item>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <Modal
          className="modal"
          open={isModalOpenGroup}
          on
          Ok={handleOkGroup}
          onCancel={handleCancelGroup}
          width={566}
        >
          <div className="modal-head">
            {" "}
            <h3>Thêm chức vụ</h3>
          </div>
          <div className="modal-body modal-body-department">
            <div className="info-add-department">
              <div className="text-department">Tên chức vụ:</div>
              <Input placeholder="Nhập tên chức vụ" />
            </div>
          </div>
          <div className="modal-footer modal-footer-deparment">
            <button className="btn-cancel" onClick={handleCancelGroup}>
              Hủy bỏ
            </button>
            <button className="btn-edit btn-save " onClick={handleOkGroup}>
              Lưu
            </button>
          </div>
        </Modal>
        <div className="modal-role-all">
          {" "}
          <Modal
            open={isModalOpenDetail}
            className="modal-detail-role"
            on
            Ok={handleOkDetail}
            onCancel={handleCancelDetail}
            width={566}
          >
            <div className="detail-role">
              <div className="modal-head">
                {" "}
                <h3>Danh sách {roleDetail.roleName}</h3>
              </div>
              <div className=" modal-group">
                <div className="info-detail-group">
                  <div className="info-body-group">
                    <div className="box1-modal-group">
                      <div className="box1-child">
                        <p className="child1-group">STT</p>
                      </div>
                      <div className="box2-child">
                        <p className="child1-group">MSNV</p>
                      </div>
                      <div className="box3-child">
                        <p className="child3-group">Họ và tên</p>
                      </div>
                      <div className="box3-child">
                        <p className="child3-group">Phòng ban</p>
                      </div>
                    </div>
                    <div className="box2-modal-group"></div>
                    <div className="department-scroll scrollbar" id="style-15">
                      {roleDetail &&
                      roleDetail.employees &&
                      roleDetail.employees.length > 0 ? (
                        roleDetail.employees.map((employee, index) => (
                          <div
                            className="box1-modal-group box3-group"
                            key={employee.employeeId}
                          >
                            <div className="box1-child">
                              <p className="child1-group">{index + 1}</p>
                            </div>
                            <div className="box1-child">
                              <p className="child1-group">
                                {employee.employeeId}
                              </p>
                            </div>
                            <div className="box3-child">
                              <div className="child3-group">
                                <p>{employee.employeeName}</p>
                              </div>
                            </div>
                            <div className="box3-child">
                              <div className="child3-group">
                                <p>{employee.departmentName}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>
                          Thông tin nhân viên trong chức vụ chưa sẵn sàng hoặc không tồn tại {roleDetail.roleName}
                          .
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer modal-footer-deparment modal-footer-group">
                <button className="btn-cancel" onClick={handleCancelDetail}>
                  Thoát
                </button>
              </div>
            </div>
          </Modal>
        </div>

        <Modal
          className="modal"
          open={isModalOpenAdd}
          on
          Ok={handleOkAdd}
          onCancel={handleCancelAdd}
          width={566}
        >
          <div className="modal-add-group">
            <div className="modal-head">
              {" "}
              <h3>{roleName}</h3>
            </div>
            <div className="modal-body modal-body-department">
              <div className="info-add-department">
                <div className="text-department">Tên chức vụ:</div>
                <Input onChange={(e) => setInputSearch(e.target.value)} />
              </div>
              <div className="info-add-department info-add-department-fix">
                <div className="text-department">Trạng thái:</div>
                <Form.Item valuePropName="checked">
                  <Switch
                    checked={switchChecked}
                    onChange={(checked) => setSwitchChecked(checked)}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="modal-footer modal-footer-deparment">
              <button className="btn-cancel" onClick={handleCancelAdd}>
                Thoát
              </button>
              <button className="btn-edit btn-save" onClick={handleOkAdd}>
                Lưu
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Role;
