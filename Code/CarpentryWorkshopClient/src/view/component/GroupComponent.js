import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../scss/index.scss";
import "../scss/DepartmentComponent.scss";
import "../scss/fonts.scss";
import "../scss/responsive/Group.scss";
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
  CancelTeam,
} from "../../sevices/TeamService";
import {
  addGroup,
  ModalAddGroup,
  DetailModal,
  NewGroupEmployeeModule,
  ChangeTeamModule,
  ChangeNameTeamModal,
  ListTableGroup,
  ListSearchAndFilter,
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
  const [selectedChangeid, setSelectedChangeid] = useState("Chọn ca trưởng");
  const [selectedChangeid1, setSelectedChangeid1] = useState("Chọn ca phó");
  const [changeSelectEdit, setChangeSelectEdit] = useState("");
  const [allLeader, setAllLeader] = useState([]);
  const [allSubLeader, setAllSubLeader] = useState([]);
  const [teamsContinue, setTeamsContinue] = useState([]);
  const [getStaffsNoTeam, setGetStaffsNoTeam] = useState([]);
  const [inputSearch, setInputSearch] = useState([]);
  const [teamName, setTeamName] = useState("");
  const userEmployeeID =
    localStorage.getItem("userEmployeeID") ||
    sessionStorage.getItem("userEmployeeID");

  const handleChangeSelectEdit = (value) => {
    setChangeSelectEdit(value);
  };

  const handleChange = (value) => {
    setSelectedChangeid(value);
  };

  const handleChangeSelect = (value) => {
    setSelectedChangeid1(value);
  };

  function handleReset() {
    setSelectedChangeid("Chọn ca trưởng");
    setSelectedChangeid1("Chọn ca phó")
  }

  const handleCancelGroup = () => {
    handleReset()
    setIsModalOpenGroup(false);
  };

  const showModalGroup = () => {
    fetchAllLeader(userEmployeeID)
      .then((data) => {
        setAllLeader(data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu Leader:", error);
      });
    fetchAllSubLeader(userEmployeeID)
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
    setSelectedChangeid1("Chọn ca phó");
    setIsModalOpenAdd(false);
  };
  const handleAddGroup = () => {
    fetchDataCreateTeam();
  };

  const fetchData = () => {
    let isDataLoaded = false;
    let toastId = null;

    fetchAllTeam(userEmployeeID)
      .then((data) => {
        isDataLoaded = true;
        setRoles(data);
        if (toastId) {
          toast.dismiss(toastId); // Hủy thông báo nếu nó đã được hiển thị
        }
      })
      .catch((error) => {
        isDataLoaded = true;
        if (toastId) {
          toast.dismiss(toastId); // Hủy thông báo nếu nó đã được hiển thị
        }
        toast.error("Lỗi không có team"); // Hiển thị thông báo lỗi ngay lập tức
      });
    setTimeout(() => {
      if (!isDataLoaded) {
        toastId = toast("Đang xử lý...", { autoClose: false }); // Hiển thị thông báo pending sau 1.5s nếu dữ liệu chưa được tải
      }
    }, 1500);
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
      })
      .catch((error) => {
      });
  };
  const fetDataTeamContinue = () => {
    fetTeamContinue(teamID)
      .then((data) => {
        setTeamsContinue(data);
      })
      .catch((error) => {
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
            handleReset()
            setNewTeamName("");
            handleCancelGroup();
            fetchData();
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
  const cancelTeamMember = () => {
    toast.promise(
      CancelTeam(teamID)
        .then((data) => {
          fetchData();
          setIsModalOpenDetail(false);
          return toast.success(data);
        })
        .catch((error) => {
          throw toast.error(error.response.data);
        }),
      {
        pending: "Đang tải dữ liệu",
      }
    );
  };
  const handleGetAllMember = () => {
    fetchAllStaffs(userEmployeeID)
      .then((data) => {
        console.log('data11',data);
        
        setGetStaffsNoTeam(data);
        showModalAdd();
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

  useEffect(() => {
    fetchData();
  }, []);

  //UI
  return (
    <>
      <div className="col-right-container group-container">
        <div className="list-container-header">
          <div className="list-text-header">
            <h2>Danh sách nhóm</h2>
            <span>
              Thông tin nhóm, tạo nhóm và phân ca trưởng trong mỗi nhóm
            </span>
          </div>
          <ListUserHeader />
        </div>
        <ListSearchAndFilter
          searchForData={searchForData}
          showModalGroup={showModalGroup}
        />

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
          cancelTeamMember={cancelTeamMember}
        />

        <NewGroupEmployeeModule
          isModalOpenAdd={isModalOpenAdd}
          handleOkAdd={handleOkAdd}
          handleCancelAdd={handleCancelAdd}
          teamID={teamID}
          getStaffsNoTeam={getStaffsNoTeam}
          handleChangeSelect={handleChangeSelect}
          selectedChangeid1={selectedChangeid1}
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
