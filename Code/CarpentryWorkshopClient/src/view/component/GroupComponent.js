import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../scss/index.scss";
import "../scss/DepartmentComponent.scss";
import "../scss/fonts.scss";
import { Switch, Form, Input, Select, Modal, Space } from "antd";
import ListUserHeader from "./componentUI/ListUserHeader";
import MenuResponsive from "./componentUI/MenuResponsive";
import {
  fetchAllTeam,
  createTeam,
  detailTeamByID,
  fetchAllSubLeader,
  fetchAllLeader,
  fetchAllStaffs,
  changeLeaderId,
  changeSubLeaderId,
  changeStafId,
  fetTeamContinue,
  createTeamMember,
  searchData,
  DeleteTeamMember,
  ChangeTeamName,
} from "../../sevices/TeamService";
import {
  addGroup,
  ModalAddGroup,
  DetailModal,
  NewGroupEmployeeModule,
  ChangeTeamModule,
  ChangeNameTeamModal,
  ListTableGroup,
  ListSearchAndFilter
} from "./componentGroups";
const GroupComponent = () => {
  const [roles, setRoles] = useState([]);
  const [isModalOpenGroup, setIsModalOpenGroup] = useState(false);
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [isModalOpenChange, setIsModalOpenChange] = useState(false);
  const [isModalOpenChangeName, setIsModalOpenChangeName] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [detailTeamID, setDetailTeamID] = useState([]);
  const [teamID, setTeamID] = useState();
  const [shiftManagers, setShiftManagers] = useState([]);
  const [idChange, setIdChange] = useState();
  const [nameChange, setNameChange] = useState();
  const [roleMember, setRoleMember] = useState("");
  const [selectedChangeid, setSelectedChangeid] = useState("Vui lòng chọn");
  const [selectedChangeid1, setSelectedChangeid1] = useState("Vui lòng chọn");
  const [changeSelectEdit, setChangeSelectEdit] = useState("Vui lòng chọn");
  const [allLeader, setAllLeader] = useState([]);
  const [allSubLeader, setAllSubLeader] = useState([]);
  const [teamsContinue, setTeamsContinue] = useState([]);
  const [getStaffsNoTeam, setGetStaffsNoTeam] = useState([]);
  const [inputSearch, setInputSearch] = useState([]);
  const [teamName, setTeamName] = useState("");

  const handleChangeSelectEdit = (value) => {
    setChangeSelectEdit(value);
  };

  const handleChange = (value) => {
    setSelectedChangeid(value);
  };

  const handleChangeSelect = (value) => {
    setSelectedChangeid1(value);
  };
  const handleCancelGroup = () => {
    setSelectedChangeid1("Vui lòng chọn");
    setSelectedChangeid("Vui lòng chọn");
    setIsModalOpenGroup(false);
  };

  const showModalGroup = () => {
    fetchAllLeader()
      .then((data) => {
        setAllLeader(data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu Leader:", error);
      });
    fetchAllSubLeader()
      .then((data) => {
        setAllSubLeader(data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu nhóm:", error);
      });
    setIsModalOpenGroup(true);
  };

  const handleOkGroup = () => {
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

  const showModalChange = (id, name, role) => {
    setIdChange(id);
    setNameChange(name);
    setRoleMember(role);
    console.log("id", id);

    setIsModalOpenChange(true);
    fetDataTeamContinue();
  };

  const DelteMemberForTeam = (id) => {
    toast.promise(
      new Promise((resolve) => {
        DeleteTeamMember(id, teamID)
          .then((data) => {
            resolve(data);
            handleDetailGroup(teamID);
            fetchData();
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        success: "Xóa thành công",
        error: "Lỗi xóa",
      }
    );
  };

  const ChangeNameTeam = () => {
    toast.promise(
      new Promise((resolve) => {
        ChangeTeamName(newTeamName, teamID)
          .then((data) => {
            resolve(data);
            handleDetailGroup(teamID);
            fetchData();
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        success: "Đổi tên nhóm thành công",
        error: "Lỗi đổi tên nhóm",
      }
    );
  };

  const handleOkChange = () => {
    setIsModalOpenChange(false);
    fetchData();
  };
  const handleChangeSucssecfully = () => {
    setChangeSelectEdit("");
    if (roleMember === 1) {
      handleChangeLeader();
      setSelectedChangeid("");
    }
    if (roleMember === 2) {
      handleChangeSubLeader();
      setSelectedChangeid("");
    }
    if (roleMember === 3) {
      handleChangeStaff();
      setSelectedChangeid("");
    }
  };
  const handleCancelChange = () => {
    setChangeSelectEdit("");
    setIsModalOpenChange(false);
  };

  const showModalChangeName = () => {
    setIsModalOpenChangeName(true);
  };
  const handleOkChangeName = () => {
    setIsModalOpenChangeName(false);
    ChangeNameTeam();
  };
  const handleCancelChangeName = () => {
    setIsModalOpenChangeName(false);
  };
  const showModalAdd = () => {
    setIsModalOpenAdd(true);
  };
  const handleOkAdd = () => {
    AddCreateTeam();
    setIsModalOpenAdd(false);
  };
  const handleCancelAdd = () => {
    setSelectedChangeid1("Vui lòng chọn");
    setSelectedChangeid("Vui lòng chọn");
    setIsModalOpenAdd(false);
  };
  const handleAddGroup = () => {
    fetchDataCreateTeam();
  };

  const fetchData = () => {
    toast.promise(
      new Promise((resolve) => {
        fetchAllTeam()
          .then((data) => {
            setRoles(data);
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
  };
  const searchForData = (Inputvalue) => {
    setInputSearch(Inputvalue);
    if (!Inputvalue) {
      fetchData();
    } else {
      HandleInputsearch(Inputvalue);
    }
  };

  const HandleInputsearch = (Inputvalue) => {
    searchData(Inputvalue)
      .then((data) => {
        setRoles(data);
        console.log("data", data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu nhóm:", error);
      });
  };
  const fetDataTeamContinue = () => {
    fetTeamContinue(teamID)
      .then((data) => {
        setTeamsContinue(data);
        console.log("data", data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu nhóm:", error);
      });
  };
  const fetchDataCreateTeam = () => {
    if (newTeamName.trim() === "") {
      return;
    }
    toast.promise(
      new Promise((resolve) => {
        createTeam(newTeamName, selectedChangeid, selectedChangeid1)
          .then((data) => {
            setNewTeamName("");
            handleCancelGroup();
            fetchData();
            handleDetailGroup(teamID);
            resolve(data);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        success: "Thêm nhóm thành công",
        error: "Lỗi thêm nhóm",
      }
    );
  };
  const AddCreateTeam = () => {
    toast.promise(
      new Promise((resolve) => {
        createTeamMember(teamID, selectedChangeid1)
          .then((data) => {
            setNewTeamName("");
            handleCancelGroup();
            handleDetailGroup(teamID);
            fetchData();
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

  const handleDetailGroup = (teamId, teamName) => {
    toast.promise(
      new Promise((resolve) => {
        detailTeamByID(teamId)
          .then((data) => {
            setDetailTeamID(data);
            setTeamID(teamId);
            setTeamName(teamName);
            showModalDetail();
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
  console.log("teamName", teamName);

  const handleGetAllMember = () => {
    console.log(selectedChangeid1);
    fetchAllStaffs()
      .then((data) => {
        setGetStaffsNoTeam(data);
        showModalAdd();
        console.log("data", data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu nhóm:", error);
      });
  };

  const handleChangeLeader = () => {
    toast.promise(
      new Promise((resolve) => {
        changeLeaderId(teamID, changeSelectEdit)
          .then((data) => {
            handleDetailGroup(teamID);
            resolve(data);
            handleOkChange();
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        success: "Chuyển nhóm thành công",
        error: "Lỗi chuyển nhóm",
      }
    );
  };
  const handleChangeSubLeader = () => {
    toast.promise(
      new Promise((resolve) => {
        changeSubLeaderId(teamID, changeSelectEdit)
          .then((data) => {
            handleDetailGroup(teamID);
            resolve(data);
            handleOkChange();
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        success: "Chuyển nhóm thành công",
        error: "Lỗi chuyển nhóm",
      }
    );
  };
  const handleChangeStaff = () => {
    toast.promise(
      new Promise((resolve) => {
        changeStafId(changeSelectEdit, idChange)
          .then((data) => {
            handleDetailGroup(teamID);
            resolve(data);
            handleOkChange();
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        success: "Chuyển nhóm thành công",
        error: "Lỗi chuyển nhóm",
      }
    );
  };

  const optionsShiftManagers = shiftManagers.map((manager) => {
    if (manager.employeeID) {
      return {
        value: manager.employeeID.toString(),
        label: manager.fullName,
      };
    } else {
      return {
        value: "default", // Giá trị mặc định
        label: "Không có ca trưởng trong dữ liệu",
      };
    }
  });
  console.log('getStaffsNoTeam',getStaffsNoTeam);
  
  useEffect(() => {
    fetchData();
  }, []);

  //UI
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
          <ListUserHeader />
        </div>
        <ListSearchAndFilter searchForData={searchForData} showModalGroup={showModalGroup} />

        <ListTableGroup roles={roles} handleDetailGroup={handleDetailGroup} />

        <ModalAddGroup
          isModalOpenGroup={isModalOpenGroup}
          handleAddGroup={handleAddGroup}
          handleCancelGroup={handleCancelGroup}
          newTeamName={newTeamName}
          setNewTeamName={setNewTeamName}
          handleChange={handleChange}
          handleChangeSelect={handleChangeSelect}
          allLeader={allLeader}
          allSubLeader={allSubLeader}
          selectedChangeid={selectedChangeid}
          selectedChangeid1={selectedChangeid1}
        />

        <DetailModal
          isModalOpenDetail={isModalOpenDetail}
          handleOkDetail={handleOkDetail}
          handleCancelDetail={handleCancelDetail}
          teamName={teamName}
          detailTeamID={detailTeamID}
          showModalChange={showModalChange}
          showModalChangeName={showModalChangeName}
          handleGetAllMember={handleGetAllMember}
          DelteMemberForTeam={DelteMemberForTeam}
        />

        <NewGroupEmployeeModule
          isModalOpenAdd={isModalOpenAdd}
          handleOkAdd={handleOkAdd}
          handleCancelAdd={handleCancelAdd}
          teamID={teamID}
          getStaffsNoTeam={getStaffsNoTeam}
          handleChangeSelect={handleChangeSelect}
        />

        <ChangeTeamModule
          isModalOpenChange={isModalOpenChange}
          handleOkChange={handleOkChange}
          handleCancelChange={handleCancelChange}
          nameChange={nameChange}
          idChange={idChange}
          teamName={teamName}
          changeSelectEdit={changeSelectEdit}
          handleChangeSelectEdit={handleChangeSelectEdit}
          teamsContinue={teamsContinue}
          handleChangeSucssecfully={handleChangeSucssecfully}
        />
        <ChangeNameTeamModal
          isModalOpenChangeName={isModalOpenChangeName}
          handleOkChangeName={handleOkChangeName}
          handleCancelChangeName={handleCancelChangeName}
          newTeamName={newTeamName}
          setNewTeamName={setNewTeamName}
        />
      </div>
    </>
  );
};
export default GroupComponent;
