import React, { useState, useEffect } from "react";
import "../scss/index.scss";
import "../scss/DepartmentComponent.scss";
import "../scss/DependentPerson.scss";
import "../scss/fonts.scss";
import "../scss/responsive/Dependent.scss";
import { Switch, Form } from "antd";
import ListUserHeader from "./componentUI/ListUserHeader";
import MenuResponsive from "./componentUI/MenuResponsive";
import {
  fetchAllDependent,
  SearchDependents,
  GetDependentPeopleById,
  UpdateDependent,
} from "../../sevices/DependentPersonService";
import { fetchAllEmplyee } from "../../sevices/EmployeeService";
import { GetRelationshipsType } from "../../sevices/RelationshipsType";
import { toast } from "react-toastify";
import { Input } from "antd";
import { Modal } from "antd";
import { Select } from "antd";
import { Col, Row } from "antd";
import { CreateDependent } from "../../sevices/DepartmentService";
function DependentPerson() {
  const [isEditing, setIsEditing] = useState(false);
  const [guardian, setGuardian] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [employeesName, setemployeesName] = useState("");
  const [Relationship, setRelationship] = useState("");
  const [dependentId, setdependentId] = useState("");
  const [relationshipName, setRelationshipName] = useState("");
  const [Identifier, setIdentifier] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState(false);
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterGender, setFilterGender] = useState(null);
  const [dependentGender, setDependentGenderr] = useState(null);

  const [inputSearch, setInputSearch] = useState("");
  const [relationshipsType, setRelationshipsType] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  // --------------------
  const [guardianError, setGuardianError] = useState("");
  const [employeeIdError, setEmployeeIdError] = useState("");
  const [relationshipError, setRelationshipError] = useState("");
  const [identifierError, setIdentifierError] = useState("");
  const [dateError, setDateError] = useState("");
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  const handleChangeFilterStatus = (value) => {
    setFilterStatus(value);
    searchandfilter(inputSearch, filterGender, value);
  };

  console.log("em",employeeId)
  const handleChangeFilterGender = (value) => {
    setFilterGender(value);
    searchandfilter(inputSearch, value, filterStatus);
  };
  const handleChangeDependentGender = (value) => {
    setDependentGenderr(value);
  };
  const handleChangeInnputSearch = (e) => {
    setInputSearch(e.target.value);
    searchandfilter(e.target.value, filterGender, filterStatus);
  };

  const convertDateFormat = (originalDate) => {
    const parts = originalDate.split("-");
    if (parts.length === 3) {
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      return `${year}-${month}-${day}`;
    }
    return originalDate;
  };
  const [dependent, setDependent] = useState([]);
  const [isModalOpenDependent, setIsModalOpenDependent] = useState(false);

  const showModalDependent = (value) => {
    setIsModalOpenDependent(true);
  };
  const handleOkDependent = () => {
    setIsModalOpenDependent(false);
  };

  function reset() {
    setGuardian("");
    setEmployeeId("");
    setRelationship("");
    setIdentifier("");
    setDate("");
    setStatus(false);
    setDependentGenderr(undefined)
  }

  const handleCancelDependent = () => {
    setIsModalOpenDependent(false);
    reset()
  };
  const handleEdit = () => {
    setIsEditing(true);
    setIsModalOpenDependent(false);

  };
  const handleSave = () => {
    setIsModalOpenDependent(true);
    setIsEditing(false);
  };

  const fetchDepartmentById = (value) => {
    console.log('value',value);
    
    toast.promise(
      new Promise((resolve) => {
        GetDependentPeopleById(value)
          .then((data) => {
            showModalDependent();
            resolve(data);
            console.log('detail', data);
            const {
              dependentId,
              employeesName,
              relationshipName,
              relationshipId,
              identifierCode,
              dobString,
              status,
              gender
            } = data;
            setemployeesName(employeesName);
            setGuardian(data.fullName);
            setRelationship(relationshipId);
            setIdentifier(identifierCode);
            setDate(dobString);
            setRelationshipName(relationshipName);
            setDependentGenderr(gender)
            setEmployeeId(data.employeeId);
            setIsChecked(status);
            setdependentId(dependentId);
            setStatus(status);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        error: "Lỗi dữ liệu hiển thị",
      }
    );
  };

  const update = () => {
    toast.promise(
      new Promise((resolve) => {
        UpdateDependent(
          dependentId,
          employeeId,
          guardian,
          Relationship,
          Identifier,
          date,
          isChecked,
          dependentGender
        )
          .then((data) => {
            handleSave();
            fetchData();
            resolve(data);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang tải dữ liệu",
        success: "Thay đổi thông tin thành công",
        error: "Lỗi thay đổi",
      }
    );
  };

  const add = () => {
    if (!guardian || !employeeId || !Relationship || !Identifier || !date) {
      if (!guardian) {
        setGuardianError("Vui lòng nhập người phụ thuộc");
      } else {
        setGuardianError("");
      }

      if (!employeeId) {
        setEmployeeIdError("Vui lòng chọn người giám hộ");
      } else {
        setEmployeeIdError("");
      }

      if (!Relationship) {
        setRelationshipError("Vui lòng chọn mối quan hệ");
      } else {
        setRelationshipError("");
      }

      if (!Identifier) {
        setIdentifierError("Vui lòng nhập mã định danh");
      } else {
        setIdentifierError("");
      }

      if (!date) {
        setDateError("Vui lòng nhập ngày sinh");
      } else {
        setDateError("");
      }
      return; // Ngăn người dùng thêm khi thông tin không hợp lệ
    }

    toast.promise(
      CreateDependent(
        employeeId,
        guardian,
        Identifier,
        dependentGender,
        date,
        isChecked,
        Relationship,
      )
        .then((data) => {
          setIsModalOpenAdd(false);
          fetchData();
          return data;
        })
        .catch((error) => {
          throw toast.error(error.response.data);
        }),
      {
        pending: "Đang tải dữ liệu",
        success: "Thêm thông tin thành công",
      }
    );
  };

  const fetchRelationshipsType = () => {
    GetRelationshipsType()
      .then((data) => {
        setRelationshipsType(data);
      })
      .catch((error) => {
      });
  };

  const getchAllEmplyees = () => {
    fetchAllEmplyee()
      .then((rs) => {
        setEmployees(rs);
      })
      .catch((error) => {
      });
  };

  const searchandfilter = (ipSearch, ftGender, ftStatus) => {
    SearchDependents(ipSearch, ftGender, ftStatus)
      .then((data) => {
        setDependent(data);
      })
      .catch((error) => {
      });
  };

  const fetchData = () => {
    let isDataLoaded = false;
    let toastId = null;

    fetchAllDependent()
      .then((data) => {
        isDataLoaded = true;
        setDependent(data);
        if (toastId) {
          toast.dismiss(toastId); // Hủy thông báo nếu nó đã được hiển thị
        }
      })
      .catch((error) => {
        isDataLoaded = true;
        if (toastId) {
          toast.dismiss(toastId); // Hủy thông báo nếu nó đã được hiển thị
        }
        toast.error("Lỗi không có người phụ thuộc"); // Hiển thị thông báo lỗi ngay lập tức
      });
    setTimeout(() => {
      if (!isDataLoaded) {
        toastId = toast("Đang xử lý...", { autoClose: false }); // Hiển thị thông báo pending sau 1.5s nếu dữ liệu chưa được tải
      }
    }, 1500);
  };

  console.log('dependentGender',dependentGender);
  

  useEffect(() => {
    fetchRelationshipsType();
    fetchData();
    getchAllEmplyees();
  }, []);
  //modal add người phụ thuộc
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
    <>
      <div className="col-right-container">
        <div className="list-container-header">
          <div className="list-text-header">
            <h2>Danh sách người phụ thuộc</h2>
            <span>
              Hiển thị thông tin của tất các các người phụ thuộc của người lao
              động trong xưởng mộc
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
              value={filterGender}
              style={{
                width: 120,
              }}
              onChange={handleChangeFilterGender}
              options={[
                {
                  value: true,
                  label: "Nam",
                },
                {
                  value: false,
                  label: "Nữ",
                },
                filterGender !== null
                  ? {
                    value: null,
                    label: "Bỏ chọn",
                  }
                  : null,
              ].filter(Boolean)}
              placeholder="Chọn giới tính"
            />
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
        </div>
        <div className="list-text-header-res">
          <h2>Danh sách người phụ thuộc</h2>
          <span>
            Hiển thị thông tin của tất các các người phụ thuộc của người lao
            động trong xưởng mộc
          </span>
        </div>
        <table className="list-table">
          <thead>
            <tr>
              <td>STT</td>
              <td>Họ và tên</td>
              <td>Nhân viên</td>
              <td>Giới tính</td>
              <td>Mã định danh</td>
              <td>Trạng thái</td>
            </tr>
          </thead>
          {dependent.length === 0 ? (
            <p>Không tìm thấy người phụ thuộc trong dữ liệu.</p>
          ) : (
            <tbody class="scrollbar" id="style-15">
              {dependent.map((dependent, index) => (
                <tr
                  key={dependent.dependentId}
                  onClick={() => fetchDepartmentById(dependent.dependentId)}
                >
                  <td>{index + 1}</td>
                  <td>{dependent.fullName}</td>
                  <td>{dependent.employeesName}</td>
                  <td>{dependent.genderString}</td>
                  <td>{dependent.identifierCode}</td>
                  <td>
                    <Form.Item valuePropName="checked">
                      <Switch checked={dependent.status} />
                    </Form.Item>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        
        <div className="modal-dependent-all">
          {" "}
          <Modal
            className="modal-dependent modal-posive dependent-container-modal-edit"
            open={isEditing}
            on
            Ok={handleSave}
            onCancel={handleSave}
            width={566}
          >
            <div className="modal-head">
              {" "}
              <h3>Thay đổi thông tin người phụ thuộc</h3>
            </div>
            <div className="modal-body modal-body-dependent">
              <div className="info-detail-dependent">
                <Row>
                  <Col span={24}>
                    <table className="table-info-detail">
                      <tbody>
                        <tr>
                          <th className="text">Người phụ thuộc:</th>
                          <td className="input-text">
                            <Input
                              placeholder="Basic usage"
                              value={guardian}
                              onChange={(e) => setGuardian(e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th className="text">Người giám hộ:</th>
                          <td className="input-text">
                            <select
                              name="employeeId"
                              id="employeeId"
                              className="select"
                              onChange={(e) => setEmployeeId(e.target.value)}
                              value={employeeId}
                            >
                              {employees.map((employee) => (
                                <option
                                  key={employee.employeeID}
                                  value={employee.employeeID}
                                >
                                  {employee.employeeIdstring} - {employee.fullName}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <th className="text">Mối quan hệ:</th>
                          <td className="input-text">
                            <select
                              name="Relationship"
                              id="Relationship"
                              className="select"
                              onChange={(e) =>
                                setRelationship(e.target.value)
                              }
                              value={Relationship}
                            >
                              {!Relationship && (
                                <option value="" disabled>
                                  Chọn quan hệ
                                </option>
                              )}
                              {relationshipsType.map((type) => (
                                <option
                                  key={type.relationshipId}
                                  value={type.relationshipId}
                                >
                                  {type.relationshipName}
                                </option>
                              ))}
                              {Relationship && (
                                <option value="">Bỏ chọn</option>
                              )}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <th className="text">Giới tính:</th>
                          <td className="input-text">
                            <select
                              name="Relationship"
                              id="Relationship"
                              className="select"
                              value={dependentGender}
                              placeholder="Chọn giới tính"
                              onChange={(e) => setDependentGenderr(e.target.value)}
                            >
                              <option value={true}>Nam</option>
                              <option value={false}>Nữ</option>
                            </select>
                          </td>
                        </tr>

                        <tr>
                          <th className="text">Mã định danh:</th>
                          <td className="input-text">
                            <Input
                              placeholder="Nhập mã định danh"
                              value={Identifier}
                              onChange={(e) => setIdentifier(e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th className="text">Ngày sinh:</th>
                          <td className="input-text">
                            <Input
                              type="date"
                              placeholder="yyyy-MM-dd"
                              value={convertDateFormat(date)}
                              onChange={(e) =>
                                setDate(convertDateFormat(e.target.value))
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <th className="text">Trạng thái:</th>
                          <td className="input-text">
                            <Form.Item valuePropName={status}>
                              <Switch
                                checked={isChecked}
                                onChange={handleSwitchChange}
                              />
                            </Form.Item>
                            Còn phụ thuộc
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="modal-footer modal-footer-dependent ">
              <button className="btn-cancel" onClick={handleSave}>
                Quay lại
              </button>
              <button className="btn-save" onClick={update}>
                Lưu
              </button>
            </div>
          </Modal>
        </div>
        <div className="modal-dependent-all ">
          {" "}
          <Modal
            className="modal-dependent dependent-container-modal-edit"
            open={isModalOpenDependent}
            on
            Ok={handleOkDependent}
            onCancel={handleCancelDependent}
            width={566}
          >
            <div className="modal-head">
              {" "}
              <h3>Thông tin người phụ thuộc</h3>
            </div>
            <div className="modal-body modal-body-dependent">
              <div className="name-person-dependent">
                <h3>{guardian}</h3>
              </div>

              <div className="info-detail-dependent">
                <Row>
                  <Col span={24}>
                    <table className="table-info-detail">
                      <tbody>
                        <tr>
                          <th className="text">Người giám hộ:</th>
                          <td className="input-text">
                            <Input
                              placeholder="Người phục thuộc"
                              value={employeesName}
                            ></Input>
                          </td>
                        </tr>
                        <tr>
                          <th className="text">Mối quan hệ:</th>
                          <td className="input-text">
                            <Input
                              placeholder="Mối quan hệ"
                              value={relationshipName}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th className="text">Mã định danh:</th>
                          <td className="input-text">
                            <Input
                              placeholder="Mã định danh"
                              value={Identifier}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th className="text">Ngày sinh:</th>
                          <td className="input-text">
                            <Input placeholder="Ngày sinh" value={date} />
                          </td>
                        </tr>
                        <tr>
                          <th className="text">Trạng thái:</th>
                          <td className="input-text">
                            {" "}
                            <Form.Item valuePropName={status}>
                              <Switch checked={status} />
                            </Form.Item>
                            Phụ thuộc
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="modal-footer modal-footer-dependent">
              <button className="btn-cancel" onClick={handleCancelDependent}>
                Hủy bỏ
              </button>
              <button className="btn-edit" onClick={handleEdit}>
                Chỉnh sửa
              </button>
            </div>
          </Modal>
        </div>
        <div className="modal-dependent-all">
          {" "}
          <Modal
            className="modal-dependent dependent-container-modal-edit"
            open={isModalOpenAdd}
            on
            Ok={handleOkAdd}
            onCancel={handleCancelAdd}
            width={566}
          >
            <div className="modal-head">
              {" "}
              <h3>Thêm người phụ thuộc</h3>
            </div>
            <div className="modal-body modal-body-dependent dependent-container-modal">
              <div className="info-detail-dependent">
                <Row>
                  <Col span={24}>
                    <table className="table-info-detail">
                      <tbody>
                        <tr>
                          <th className="text">Người phụ thuộc:</th>
                          <td className="input-text">
                            <Input
                              placeholder="Nhập tên người phụ thuộc"
                              value={guardian}
                              onChange={(e) => setGuardian(e.target.value)}
                            />
                          </td>
                          <span
                            style={{
                              color: "red",
                              fontSize: "16px",
                              marginLeft: "65px",
                            }}
                          >
                            {guardianError}
                          </span>
                        </tr>
                        <tr>
                          <th className="text">Người giám hộ:</th>
                          <td className="input-text">
                            <select
                              name="employeeId"
                              id="employeeId"
                              className="select"
                              value={employeeId}
                              onChange={(e) => setEmployeeId(e.target.value)}
                            >
                              {employees.map((employee) => (
                                <option
                                  key={employee.employeeID}
                                  value={employee.employeeID}
                                >
                                  {employee.fullName}
                                </option>
                              ))}
                            </select>
                          </td>
                          <span
                            style={{
                              color: "red",
                              fontSize: "16px",
                              marginLeft: "65px",
                            }}
                          >
                            {employeeIdError}
                          </span>
                        </tr>
                        <tr>
                          <th className="text">Mối quan hệ:</th>
                          <td className="input-text">
                            <select
                              name="Relationship"
                              id="Relationship"
                              className="select"
                              onChange={(e) => setRelationship(e.target.value)}
                              value={Relationship}
                            >
                              {!Relationship && (
                                <option value="" disabled>
                                  Chọn quan hệ
                                </option>
                              )}
                              {relationshipsType.map((type) => (
                                <option
                                  key={type.relationshipId}
                                  value={type.relationshipId}
                                >
                                  {type.relationshipName}
                                </option>
                              ))}
                              {Relationship && (
                                <option value="">Bỏ chọn</option>
                              )}
                            </select>
                          </td>
                          <span
                            style={{
                              color: "red",
                              fontSize: "16px",
                              marginLeft: "65px",
                            }}
                          >
                            {relationshipError}
                          </span>
                        </tr>
                        <tr>
                          <th className="text">Giới tính:</th>
                          <td className="input-text">
                            <select
                              name="Relationship"
                              id="Relationship"
                              className="select"
                              value={dependentGender}
                              placeholder="Chọn giới tính"
                              onChange={(e) => setDependentGenderr(e.target.value)}
                            >
                              <option value={true}>Nam</option>
                              <option value={false}>Nữ</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <th className="text">Mã định danh:</th>
                          <td className="input-text">
                            <Input
                              placeholder="Nhập mã định danh"
                              value={Identifier}
                              onChange={(e) => setIdentifier(e.target.value)}
                            />
                          </td>
                          <span
                            style={{
                              color: "red",
                              fontSize: "16px",
                              marginLeft: "65px",
                            }}
                          >
                            {identifierError}
                          </span>
                        </tr>
                        <tr>
                          <th className="text">Ngày sinh:</th>
                          <td className="input-text">
                            <Input
                              type="date"
                              placeholder="yyyy-MM-dd"
                              value={convertDateFormat(date)}
                              onChange={(e) =>
                                setDate(convertDateFormat(e.target.value))
                              }
                            />
                          </td>
                          <span
                            style={{
                              color: "red",
                              fontSize: "16px",
                              marginLeft: "65px",
                            }}
                          >
                            {dateError}
                          </span>
                        </tr>
                        <tr>
                          <th className="text">Trạng thái:</th>
                          <td className="input-text">
                            <Form.Item valuePropName={status}>
                              <Switch
                                checked={isChecked}
                                onChange={handleSwitchChange}
                              />
                            </Form.Item>
                            Còn phụ thuộc
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="modal-footer modal-footer-dependent ">
              <button className="btn-cancel" onClick={handleCancelAdd}>
                Hủy bỏ
              </button>
              <button className="btn-save" onClick={add}>
                Lưu
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default DependentPerson;
