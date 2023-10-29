import React, { useState, useEffect } from "react";
import "../scss/index.scss";
import "../scss/DepartmentComponent.scss";
import "../scss/fonts.scss";
import { Switch, Form, Input } from "antd";
import ListUserHeader from "./componentUI/ListUserHeader";
import MenuResponsive from "./componentUI/MenuResponsive";
import { fetchAllTeam, createTeam, detailTeamByID,fetchAllShiftManagers,fetchAllShiftAssistants,fetchAllStaffs  } from "../../sevices/TeamService";
import { Select } from "antd";
import { Modal } from "antd";
import { Space } from "antd";
import { Option } from "antd/es/mentions";
const GroupComponent = () => {
  const [roles, setRoles] = useState([]);
  const [isModalOpenGroup, setIsModalOpenGroup] = useState(false);
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [isModalOpenChange, setIsModalOpenChange] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [detailTeamID, setDetailTeamID] = useState([]);
  const [teamID, setTeamID] = useState();
  const [shiftManagers, setShiftManagers] = useState([]);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleChange1 = (value) => {
    console.log(`selected ${value}`);
  };
  const showModalGroup = () => {
    setIsModalOpenGroup(true);
  };
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

  const showModalChange = () => {
    setIsModalOpenChange(true);
  };
  const handleOkChange = () => {
    setIsModalOpenChange(false);
  };
  const handleCancelChange = () => {
    setIsModalOpenChange(false);
  };

  const showModalAdd = () => {
    setIsModalOpenAdd(true);
  };
  const handleOkAdd = () => {
    setIsModalOpenAdd(false);
  };
  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  const fetchData = () => {
    fetchAllTeam()
      .then((data) => {
        setRoles(data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu nhóm:", error);
      });
  }

  const handleAddGroup = () => {
    if (newTeamName.trim() === "") {
      return;
    }
    createTeam(newTeamName)
      .then((data) => {
        setNewTeamName("");
        handleCancelGroup();
        fetchData();
      })
      .catch((error) => {
        console.error("Lỗi thêm nhóm:", error);
      });
  }

  const handleDetailGroup = (teamId) => {
    detailTeamByID(teamId)
      .then((data) => {
        setDetailTeamID(data);
        setTeamID(teamId);
        showModalDetail();
        
      })
      .catch((error) => {
        console.error("Lỗi thêm nhóm:", error);
      });
  }

  const handleGetAllMember = () => {
    fetchAllShiftManagers()
    .then((data) => {
      setShiftManagers(data);
      showModalAdd();
  console.log(teamID);
    })
    .catch((error) => {
      console.error("Lỗi khi tải dữ liệu nhóm:", error);
    });
  }

  const optionsShiftManagers = shiftManagers.map((manager) => {
  if (manager.employeeID) {
    return {
      value: manager.employeeID.toString(),
      label: manager.fullName,
    };
  } else {
    return {
      value: 'default', // Giá trị mặc định
      label: 'Không có ca trưởng trong dữ liệu',
    };
  }
});
  useEffect(() => {
    // Ban đầu, gọi hàm tải dữ liệu
    fetchData();


  }, []);

  return (
    <>
      <div className="col-right-container">
        <div className="list-container-header">
          <div className="list-text-header">
            <h2>Danh sách nhóm</h2>
            <span>
              Thông tin nhóm, tạo nhóm và phân ca trưởng trong mỗi nhóm
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
          <div className="list-add" onClick={showModalGroup}>
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
          <h2>Danh sách nhóm</h2>
          <span>Thông tin nhóm, tạo nhóm và phân ca trưởng trong mỗi nhóm</span>
        </div>
        <table className="list-table">
          <thead>
            <tr>
              <td>STT</td>
              <td>Nhóm</td>
              <td>Số nhân viên</td>
              <td>Trưởng nhóm</td>
            </tr>
          </thead>
          <tbody class="scrollbar" id="style-15">
            {roles.map((role, index) => (
              <tr key={role.teamId} onClick={() => handleDetailGroup(role.teamId)}>
                <td>{index + 1}</td>
                <td>{role.teamName}</td>
                <td>{role.numberOfTeamMember}</td>
                <td>{role.teamLeaderName}</td>
              </tr>
            ))}
            <tr onClick={showModalDetail}>
              <td>1</td>
              <td>Nhóm 1</td>
              <td>1</td>
              <td>Nguyễn Văn C</td>
            </tr>
            <tr onClick={showModalDetail}>
              <td>2</td>
              <td>Nhóm 2</td>
              <td>0</td>
              <td>Nguyễn Văn C</td>
            </tr>
            <tr onClick={showModalDetail}>
              <td>3</td>
              <td>Nhóm 3</td>
              <td>3</td>
              <td>Nguyễn Văn C</td>
            </tr>
          </tbody>
        </table>
        <Modal
          className="modal"
          open={isModalOpenGroup}
          onOk={handleAddGroup}
          onCancel={handleCancelGroup}
          width={566}
        >
          <div className="modal-head">
            <h3>Thêm nhóm</h3>
          </div>
          <div className="modal-body modal-body-department">
            <div className="info-add-department">
              <div className="text-department">Tên nhóm</div>
              <Input value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} />
            </div>
          </div>
          <div className="modal-footer modal-footer-deparment">
            <button className="btn-cancel" onClick={handleCancelGroup}>
              Hủy bỏ
            </button>
            <button className="btn-edit btn-save" onClick={handleAddGroup}>
              Lưu
            </button>
          </div>
        </Modal>
        <Modal
          open={isModalOpenDetail}
          className="modal-group"
          on
          Ok={handleOkDetail}
          onCancel={handleCancelDetail}
          width={566}
        >
          <div className="modal-dependent modal-detail-group">
            <div className="modal-head">
              {" "}
              <h3>Nhóm {teamID}</h3>
            </div>
            <div className=" modal-group">
              <div className="info-detail-group">
                <div className="info-body-group">
                {detailTeamID.shiftManager || detailTeamID.shiftAssistant || (detailTeamID.staff && detailTeamID.staff.length > 0) ? (
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
                    <div className="box5-child">
                      <p className="child5-group">Đổi nhóm</p>
                    </div>
                    <div className="box4-child">
                      <p className="child4-group">Xóa khỏi nhóm</p>
                    </div>
                  </div>
                  <div className="box2-modal-group"></div>
                      {detailTeamID.shiftManager ? (
                        <div className="box1-modal-group box3-group">
                          <div className="box1-child">
                            <p className="child1-group">1</p>
                          </div>
                          <div className="box2-child">
                            <p className="child2-group">Ca trưởng</p>
                          </div>
                          <div className="box3-child">
                            <div className="child3-group">
                              <p>{detailTeamID.shiftManager ? detailTeamID.shiftManager.fullName : ''}</p>
                            </div>
                          </div>
                          <div className="box5-child" onClick={showModalChange}>
                            <p className="child5-group">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                              >
                                <path
                                  d="M20.2375 2.5H9.7625C5.2125 2.5 2.5 5.2125 2.5 9.7625V20.225C2.5 24.7875 5.2125 27.5 9.7625 27.5H20.225C24.775 27.5 27.4875 24.7875 27.4875 20.2375V9.7625C27.5 5.2125 24.7875 2.5 20.2375 2.5ZM22.3125 17.625C22.2625 17.7375 22.2 17.8375 22.1125 17.925L18.3125 21.725C18.125 21.9125 17.8875 22 17.65 22C17.4125 22 17.175 21.9125 16.9875 21.725C16.625 21.3625 16.625 20.7625 16.9875 20.4L19.1875 18.2H8.5625C8.05 18.2 7.625 17.775 7.625 17.2625C7.625 16.75 8.05 16.325 8.5625 16.325H21.45C21.575 16.325 21.6875 16.35 21.8125 16.4C22.0375 16.5 22.225 16.675 22.325 16.9125C22.4 17.1375 22.4 17.4 22.3125 17.625ZM21.4375 13.6625H8.5625C8.4375 13.6625 8.325 13.6375 8.2 13.5875C7.975 13.4875 7.7875 13.3125 7.6875 13.075C7.5875 12.85 7.5875 12.5875 7.6875 12.3625C7.7375 12.25 7.8 12.15 7.8875 12.0625L11.6875 8.2625C12.05 7.9 12.65 7.9 13.0125 8.2625C13.375 8.625 13.375 9.225 13.0125 9.5875L10.825 11.7875H21.45C21.9625 11.7875 22.3875 12.2125 22.3875 12.725C22.3875 13.2375 21.9625 13.6625 21.4375 13.6625Z"
                                  fill="#3A5A40"
                                />
                              </svg>
                            </p>
                          </div>
                          <div className="box4-child">
                            <p className="child4-group">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M7 5V4C7 2.34315 8.34315 1 10 1H14C15.6569 1 17 2.34315 17 4V5H22V7H19.9355L19.1222 19.1996C19.0172 20.7755 17.7083 22 16.1289 22H7.87108C6.29169 22 4.98279 20.7755 4.87773 19.1996L4.06442 7H2V5H7ZM9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V5H9V4ZM9 9V18H11V9H9ZM13 9V18H15V9H13Z"
                                  fill="#FC1E1E"
                                />
                              </svg>
                            </p>
                          </div>
                        </div>
                      ) : null}
                      {detailTeamID.shiftAssistant ? (
                        <div className="box1-modal-group box3-group">
                          <div className="box1-child">
                            <p className="child1-group">2</p>
                          </div>
                          <div className="box2-child">
                            <p className="child2-group">Ca phó</p>
                          </div>
                          <div className="box3-child">
                            <div className="child3-group">
                              <p>{detailTeamID.shiftAssistant.fullName}</p>
                            </div>
                          </div>
                          <div className="box5-child" onClick={showModalChange}>
                            <p className="child5-group">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                              >
                                <path
                                  d="M20.2375 2.5H9.7625C5.2125 2.5 2.5 5.2125 2.5 9.7625V20.225C2.5 24.7875 5.2125 27.5 9.7625 27.5H20.225C24.775 27.5 27.4875 24.7875 27.4875 20.2375V9.7625C27.5 5.2125 24.7875 2.5 20.2375 2.5ZM22.3125 17.625C22.2625 17.7375 22.2 17.8375 22.1125 17.925L18.3125 21.725C18.125 21.9125 17.8875 22 17.65 22C17.4125 22 17.175 21.9125 16.9875 21.725C16.625 21.3625 16.625 20.7625 16.9875 20.4L19.1875 18.2H8.5625C8.05 18.2 7.625 17.775 7.625 17.2625C7.625 16.75 8.05 16.325 8.5625 16.325H21.45C21.575 16.325 21.6875 16.35 21.8125 16.4C22.0375 16.5 22.225 16.675 22.325 16.9125C22.4 17.1375 22.4 17.4 22.3125 17.625ZM21.4375 13.6625H8.5625C8.4375 13.6625 8.325 13.6375 8.2 13.5875C7.975 13.4875 7.7875 13.3125 7.6875 13.075C7.5875 12.85 7.5875 12.5875 7.6875 12.3625C7.7375 12.25 7.8 12.15 7.8875 12.0625L11.6875 8.2625C12.05 7.9 12.65 7.9 13.0125 8.2625C13.375 8.625 13.375 9.225 13.0125 9.5875L10.825 11.7875H21.45C21.9625 11.7875 22.3875 12.2125 22.3875 12.725C22.3875 13.2375 21.9625 13.6625 21.4375 13.6625Z"
                                  fill="#3A5A40"
                                />
                              </svg>
                            </p>
                          </div>
                          <div className="box4-child">
                            <p className="child4-group">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M7 5V4C7 2.34315 8.34315 1 10 1H14C15.6569 1 17 2.34315 17 4V5H22V7H19.9355L19.1222 19.1996C19.0172 20.7755 17.7083 22 16.1289 22H7.87108C6.29169 22 4.98279 20.7755 4.87773 19.1996L4.06442 7H2V5H7ZM9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V5H9V4ZM9 9V18H11V9H9ZM13 9V18H15V9H13Z"
                                  fill="#FC1E1E"
                                />
                              </svg>
                            </p>
                          </div>
                        </div>
                      ) : null}
                      {detailTeamID && detailTeamID.staff && detailTeamID.staff.map((staffMember, index) => (

                        <div className="box1-modal-group box3-group">
                          <div className="box1-child">
                            <p className="child1-group">{index + 3}</p>
                          </div>
                          <div className="box2-child">
                            <p className="child2-group">Nhân viên</p>
                          </div>
                          <div className="box3-child">
                            <div className="child3-group">
                              <p>{staffMember ? staffMember.fullName : ''}</p>
                            </div>
                          </div>
                          <div className="box5-child" onClick={showModalChange}>
                            <p className="child5-group">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                              >
                                <path
                                  d="M20.2375 2.5H9.7625C5.2125 2.5 2.5 5.2125 2.5 9.7625V20.225C2.5 24.7875 5.2125 27.5 9.7625 27.5H20.225C24.775 27.5 27.4875 24.7875 27.4875 20.2375V9.7625C27.5 5.2125 24.7875 2.5 20.2375 2.5ZM22.3125 17.625C22.2625 17.7375 22.2 17.8375 22.1125 17.925L18.3125 21.725C18.125 21.9125 17.8875 22 17.65 22C17.4125 22 17.175 21.9125 16.9875 21.725C16.625 21.3625 16.625 20.7625 16.9875 20.4L19.1875 18.2H8.5625C8.05 18.2 7.625 17.775 7.625 17.2625C7.625 16.75 8.05 16.325 8.5625 16.325H21.45C21.575 16.325 21.6875 16.35 21.8125 16.4C22.0375 16.5 22.225 16.675 22.325 16.9125C22.4 17.1375 22.4 17.4 22.3125 17.625ZM21.4375 13.6625H8.5625C8.4375 13.6625 8.325 13.6375 8.2 13.5875C7.975 13.4875 7.7875 13.3125 7.6875 13.075C7.5875 12.85 7.5875 12.5875 7.6875 12.3625C7.7375 12.25 7.8 12.15 7.8875 12.0625L11.6875 8.2625C12.05 7.9 12.65 7.9 13.0125 8.2625C13.375 8.625 13.375 9.225 13.0125 9.5875L10.825 11.7875H21.45C21.9625 11.7875 22.3875 12.2125 22.3875 12.725C22.3875 13.2375 21.9625 13.6625 21.4375 13.6625Z"
                                  fill="#3A5A40"
                                />
                              </svg>
                            </p>
                          </div>
                          <div className="box4-child">
                            <p className="child4-group">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M7 5V4C7 2.34315 8.34315 1 10 1H14C15.6569 1 17 2.34315 17 4V5H22V7H19.9355L19.1222 19.1996C19.0172 20.7755 17.7083 22 16.1289 22H7.87108C6.29169 22 4.98279 20.7755 4.87773 19.1996L4.06442 7H2V5H7ZM9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V5H9V4ZM9 9V18H11V9H9ZM13 9V18H15V9H13Z"
                                  fill="#FC1E1E"
                                />
                              </svg>
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p>Không có thành viên trong nhóm</p>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer modal-footer-deparment modal-footer-group">
              <button className="btn-cancel" onClick={handleCancelDetail}>
                Thoát
              </button>
              <button className="btn-edit" onClick={handleGetAllMember}>
                Thêm nhân viên
              </button>
            </div>
          </div>
        </Modal>
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
              <h3>Thêm nhân viên nhóm {teamID}</h3>
            </div>
            <div className="body-modal-change">
              <div className="modal1-change">
                <p>Trưởng ca:</p>
                <div className="list-filter select-change-group">
                  <Select
                    className="select-input"
                    defaultValue={
                      optionsShiftManagers.find((option) => option.value === (detailTeamID.shiftManager ? detailTeamID.shiftManager.employeeID : 'default')) ||
                      optionsShiftManagers.find((option) => option.value === 'default')
                    }
                    style={{
                      width: 120,
                    }}
                    onChange={handleChange}
                    options={optionsShiftManagers}
                  />
                </div>
              </div>
              <div className="modal1-change">
                <p>Phó ca:</p>
                <div className="list-filter select-change-group">
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
              </div>
              <div className="modal1-change">
                <p>Nhân viên:</p>
                <div className="select-all-change">
                  <Select
                    className="select-input"
                    mode="multiple"
                    style={{
                      width: "100%",
                    }}
                    defaultValue={["china"]}
                    onChange={handleChange1}
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
        <Modal
          className="modal"
          open={isModalOpenChange}
          on
          Ok={handleOkChange}
          onCancel={handleCancelChange}
          width={566}
        >
          <div className="modal-all-group">
            <div className="modal-head">
              {" "}
              <h3>Chuyển nhóm</h3>
            </div>
            <div className="modal-end-group">
              <div className="body-modal-end-group">
                <div className="modal1">
                  <div className="modal1-child">
                    <p>Nhân viên: </p>
                    <p>Nguyễn Thị Lan</p>
                  </div>
                  <div className="modal1-child">
                    <p>Mã số nhân viên: </p>
                    <p>1</p>
                  </div>
                  <div className="modal1-child">
                    <p>Nhóm hiện tại:</p>
                    <p>Nhóm 1</p>
                  </div>
                </div>
                <div className="modal2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="51"
                    height="50"
                    viewBox="0 0 51 50"
                    fill="none"
                  >
                    <path
                      d="M30.5625 12.3545L43.2083 25.0003L30.5625 37.6462"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.7915 25H42.854"
                      stroke="#292D32"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="modal3">
                  <div className="modal3-child">
                    <p>Nhóm chuyển đến:</p>

                    <div className="list-filter select-modal-end">
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
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer modal-footer-group">
              <button className="btn-cancel" onClick={handleCancelChange}>
                Hủy bỏ
              </button>
              <button className="btn-edit btn-save" onClick={handleOkChange}>
                Lưu
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default GroupComponent;
