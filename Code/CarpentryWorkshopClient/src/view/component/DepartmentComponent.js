import React, { useState, useEffect } from "react";
import "../scss/index.scss";
import "../scss/DepartmentComponent.scss";
import "../scss/responsive/Department.scss";
import { Switch, Form, Input } from "antd";
import { toast } from "react-toastify";
import {
  fetchAllDepadment,
  searchAndFilterDepartment,
  addDepartment,
  detailOfDepartment,
  updateDepartment,
} from "../../sevices/DepartmentService";
import ListUserHeader from "./componentUI/ListUserHeader";
import MenuResponsive from "./componentUI/MenuResponsive";
import Filter from "./componentUI/Filter";
import { Modal } from "antd";
import { Select, Space } from "antd";
function ListDepartmentComponent() {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [isModalOpenDepartment, setIsModalOpenDepartment] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filterOption, setFilterOption] = useState(true);
  const [departmentName, setDepartmentName] = useState("");
  const [departmentNameUpdate, setDepartmentNameUpdate] = useState("");
  const [departmentIdUpdate, setDepartmentIdUpdate] = useState("");
  const handleChange = (value) => {
    setFilterOption(value);
    handleSearchFilter(searchInput, value);
  };
  const handleSearchInput = (inputValue) => {
    setSearchInput(inputValue);
    handleSearchFilter(inputValue, filterOption);
  };
  const showModalDepartment = () => {
    setIsModalOpenDepartment(true);
  };
  const handleOkDepartment = () => {
    setIsModalOpenDepartment(false);
    handleSearchInput();
  };
  const handleCancelDepartment = () => {
    setIsModalOpenDepartment(false);
  };
  const [isModalEditDepartment, setIsModalEditDepartment] = useState(false);
  const showModalEditDepartment = () => {
    setDepartmentNameUpdate(departmentName);
    setIsModalEditDepartment(true);
  };
  const handleOkEditDepartment = () => {
    toast.promise(
      new Promise((resolve) => {
        updateDepartment(departmentIdUpdate, departmentNameUpdate)
          .then((data) => {
            setDepartmentName(departmentNameUpdate);
            showModalDetail(departmentIdUpdate);
            fetData();
            resolve(data);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        success: "Thay đổi tên nhóm thành công",
        error: "Lỗi",
      }
    );
    setIsModalEditDepartment(false);
  };
  const handleCancelEditDepartment = () => {
    setIsModalEditDepartment(false);
  };
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const showModalDetail = (id) => {
    toast.promise(
      new Promise((resolve) => {
        detailOfDepartment(id)
          .then((data) => {
            setEmployees(data);
            resolve(data);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang tải dữ liệu",
        error: "Lỗi tải dữ liệu",
      }
    );
    setIsModalOpenDetail(true);
  };
  const handleOkDetail = () => {
    setIsModalOpenDetail(false);
  };
  const handleCancelDetail = () => {
    setIsModalOpenDetail(false);
  };
  const [
    isModalOpenChangeDepartment,
    setIsModalOpenChangeDepartment,
  ] = useState(false);

  const showModalChangeDepartment = () => {
    setIsModalOpenChangeDepartment(true);
  };
  const handleOkChangeDepartment = () => {
    setIsModalOpenChangeDepartment(false);
  };
  const handleCancelChangeDepartment = () => {
    setIsModalOpenChangeDepartment(false);
  };
  const handleSearchFilter = (inputValue, filterValue) => {
    searchAndFilterDepartment(inputValue, filterValue) // Sử dụng hàm API để tìm kiếm và bộ lọc
      .then((data) => {
        setDepartments(data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu phòng ban:", error);
      });
  };
  const newDepartment = () => {
    toast.promise(
      new Promise((resolve) => {
        addDepartment(departmentName)
          .then((data) => {
            handleOkDepartment();
            fetData();
            resolve(data);
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

  const fetData = () => {
    let isDataLoaded = false;
    let toastId = null;

    fetchAllDepadment()
      .then((data) => {
        isDataLoaded = true;
        setDepartments(data);
        if (toastId) {
          toast.dismiss(toastId); // Hủy thông báo nếu nó đã được hiển thị
        }
      })
      .catch((error) => {
        isDataLoaded = true;
        if (toastId) {
          toast.dismiss(toastId); // Hủy thông báo nếu nó đã được hiển thị
        }
        toast.error('Lỗi không có phòng ban'); // Hiển thị thông báo lỗi ngay lập tức
      });
    setTimeout(() => {
      if (!isDataLoaded) {
        toastId = toast('Đang xử lý...', { autoClose: false }); // Hiển thị thông báo pending sau 1.5s nếu dữ liệu chưa được tải
      }
    }, 1500);
  };

  useEffect(() => {
    fetData();
  }, []);
  return (
    <>
      <div className="col-right-container">
        <div className="list-container-header">
          <div className="list-text-header">
            <h2>Danh sách phòng - ban</h2>
            <span>Hiển thị thông tin chi tiết phòng - ban trong xưởng mộc</span>
          </div>
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
              onChange={(e) => handleSearchInput(e.target.value)}
            />
          </div>
        </div>
        <div className="list-text-header-res">
          <h2>Danh sách phòng - ban</h2>
          <span>Hiển thị thông tin chi tiết phòng - ban trong xưởng mộc</span>
        </div>
        <table className="list-table">
          <thead>
            <tr>
              <td>STT</td>
              <td>Tên phòng ban</td>
              <td>Số thành viên</td>
            </tr>
          </thead>
          {departments.length === 0 ? (
            <p>Thông tin phòng ban chưa sẵn sàng hoặc không tồn tại.</p>
          ) : (
            <tbody class="scrollbar" id="style-15">
              {departments.map((department, index) => (
                <tr
                  key={department.departmentId}
                  onClick={() => {
                    showModalDetail(department.departmentId);
                    setDepartmentName(department.departmentName);
                    setDepartmentIdUpdate(department.departmentId);
                    setDepartmentNameUpdate(department.departmentName);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{department.departmentName}</td>
                  <td>{department.number}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <div className="detail-depart-all">
          <Modal
            open={isModalOpenDetail}
            className="modal-group modal-detail-depart"
            on
            Ok={handleOkDetail}
            onCancel={handleCancelDetail}
            width={566}
          >
            <div className="modal-dependent">
              <div className="modal-head">
                {" "}
                <h3>{departmentName}</h3>
              </div>
              <div className=" modal-group">
                <div className="info-detail-group">
                  <div className="info-body-group">
                    <>
                      <div className="box1-modal-group">
                        <div className="box1-child">
                          <p className="child1-group">STT</p>
                        </div>
                        <div className="box2-child">
                          <p className="child2-group">Chức vụ</p>
                        </div>
                        <div className="box3-child">
                          <p className="child3-group">Họ và tên</p>
                        </div>
                      </div>
                      <div className="box2-modal-group"></div>
                      <div
                        className="department-scroll scrollbar"
                        id="style-15"
                      >
                        {employees.length === 0 ? (
                          <p>
                            Thông tin nhân viên chưa sẵn sàng hoặc không tồn
                            tại.
                          </p>
                        ) : (
                          employees.map((employee, index) => (
                            <div className="box1-modal-group box3-group">
                              <div className="box1-child">
                                <p className="child1-group">{index + 1}</p>
                              </div>
                              <div className="box2-child">
                                <p className="child2-group">{employee.roles}</p>
                              </div>
                              <div className="box3-child">
                                <div className="child3-group">
                                  <p>{employee.fullName}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
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
      </div>
    </>
  );
}

export default ListDepartmentComponent;
