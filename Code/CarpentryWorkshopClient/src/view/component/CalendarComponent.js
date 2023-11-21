import "../scss/reset.scss";
import "../scss/index.scss";
import "../scss/fonts.scss";
import "../scss/CalendarComponent.scss";
import MenuResponsive from "./componentUI/MenuResponsive";
import ListUserHeader from "./componentUI/ListUserHeader";
import { Form, Input, Select, Switch } from "antd";
import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import {
  getCurrentDateSEAsia,
  getTomorrowDateSEAsia,
} from "../logicTime/getDate";
import {
  GetTeamForSchedule,
  GetAllWorks,
  GetWorkDetailById,
  UpdateWork,
  AddWork,
  GetDataForSchedule,
} from "../../sevices/CalendarSevice";
import { GetAllUnitCosts } from "../../sevices/UnitCostSevice";
import { GetAllWorkAreas } from "../../sevices/WorkAreaSevice";
import {
  ListSearchFilterAdd,
  ModalListShift,
  TableCalendar,
  ModalAdd,
  ListModuleDetail3,
  WorkModalTeam,
  EditListModalDetail,
} from "./componentCalendar";
import {
  createYearOptions,
  getWeekRange,
  createWeekOptions,
} from "../logicTime/getWeeDays";
import EditWork from "./componentCalendar/ModalEditWork";
import ModalGroup from "./componentCalendar/ModalGroup";
const CalendarComponent = () => {
  const yearOptions = createYearOptions();
  const weekOptions = createWeekOptions();
  const currentWeek = getWeekRange(new Date());
  const defaultValue = `${currentWeek.start}-${currentWeek.end}`;
  const [selectedWeek, setSelectedWeek] = useState(defaultValue);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [dataForSchedule, setDataForSchedule] = useState();

  const handleChangeWeek = (newWeek) => {
    setSelectedWeek(newWeek);
  };

  const handleChangeYear = (newYear) => {
    setSelectedYear(newYear);
  };
  const userEmployeeID =
    localStorage.getItem("userEmployeeID") ||
    sessionStorage.getItem("userEmployeeID");

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleChangeUnitCostId = (value) => {
    setWorkDetailById({
      ...workDetailById,
      unitCostId: value,
    });
  };
  const handleChangeWorkAreaId = (value) => {
    setWorkDetailById({
      ...workDetailById,
      workAreaId: value,
    });
  };
  // Modal danh sach cong viec
  const [isModalOpenListShift, setIsModalOpenListShift] = useState(false);
  const [teamForSchedule, setTeamForSchedule] = useState(false);
  const [allWorks, setAllWorks] = useState([]);
  const [workDetailById, setWorkDetailById] = useState({
    workId: "",
    workName: "",
    unitCostName: "",
    unitCostId: "",
    unitCost: "",
    totalProduct: "",
    workArea: "",
    workAreaId: "",
    timeStart: getCurrentDateSEAsia(),
    timeEnd: getTomorrowDateSEAsia(),
    status: "",
  });
  const [allUnitCosts, setAllUnitCosts] = useState([]);
  const [allWorkAreas, setAllWorkAreas] = useState([]);
  const [workidDetail, setWorkidDetail] = useState([]);

  const validateWorkDetail = (workDetail) => {
    if (!workDetail.workName || workDetail.workName.length === 0) {
      toast.warning("Tên công việc không được để trống.");
      return false;
    }
    if (!workDetail.unitCostId || workDetail.unitCostId.length === 0) {
      toast.warning("Vui lòng chọn loại sản phẩm.");
      return false;
    }
    if (
      isNaN(parseFloat(workDetail.unitCost)) ||
      parseFloat(workDetail.unitCost) < 0
    ) {
      toast.warning("Đơn giá sản phẩm không hợp lệ.");
      return false;
    }

    if (
      isNaN(parseFloat(workDetail.totalProduct)) ||
      parseFloat(workDetail.totalProduct) < 0
    ) {
      toast.warning("Số lượng sản phẩm không hợp lệ.");
      return false;
    }

    if (!workDetail.workAreaId || workDetail.workAreaId.length === 0) {
      toast.warning("Vui lòng chọn khu vực.");
      return false;
    }

    return true;
  };

  const convertDate = (dobstring) => {
    if (dobstring) {
      const parts = dobstring.split("-");
      if (parts.length === 3) {
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        return `${year}-${month}-${day}`;
      }
      return dobstring;
    }
    return dobstring;
  };

  const showModalListShift = () => {
    setIsModalOpenListShift(true);
  };
  const handleOkListShift = () => {
    setIsModalOpenListShift(false);
  };
  const handleCancelListShift = () => {
    setIsModalOpenListShift(false);
    resetWorkDetailById();
  };

  // Modal them cong viec
  const [isModalOpeAdd, setIsModalOpenAdd] = useState(false);
  const showModalAdd = () => {
    setIsModalOpenAdd(true);
  };
  const handleOkAdd = () => {
    setIsModalOpenAdd(false);
  };
  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  // Modal chi tiet cong viec
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const showModalDetail = () => {
    setIsModalOpenDetail(true);
  };
  const handleOkDetail = () => {
    setIsModalOpenDetail(false);
  };
  const handleCancelDetail = () => {
    setIsModalOpenDetail(false);
  };
  // Modal Chi tiết phân công việc
  const [isModalOpenDetailShift, setIsModalOpenDetailShift] = useState(false);
  const showModalDetailShift = () => {
    setIsModalOpenDetailShift(true);
    setIsEditingDetailShift(false);
  };
  const handleOkDetailShift = () => {
    setIsModalOpenDetailShift(false);
  };
  const handleCancelDetailShift = () => {
    setIsModalOpenDetailShift(false);
  };

  // Modal phan cong cong viec
  const [isModalOpenAssignWork, setIsModalOpenAssignWork] = useState(false);
  const showModalAssignWork = () => {
    setIsModalOpenAssignWork(true);
  };
  const handleOkAssignWork = () => {
    setIsModalOpenAssignWork(false);
  };
  const handleCancelAssignWork = () => {
    setIsModalOpenAssignWork(false);
  };

  // Modal chinh sua cong viec
  const [isModalOpenEditWork, setIsModalOpenEditWork] = useState(false);
  const showModalEditWork = () => {
    setIsModalOpenEditWork(true);
  };
  const handleOkEditWork = () => {
    setIsModalOpenEditWork(false);
  };
  const handleCancelEditWork = () => {
    setIsModalOpenEditWork(false);
  };

  // Modal nhom
  const [isModalOpenGroup, setIsModalOpenGroup] = useState(false);
  const showModalGroup = () => {
    setIsModalOpenGroup(true);
  };
  const handleOkGroup = () => {
    setIsModalOpenGroup(false);
  };
  const handleCancelGroup = () => {
    setIsModalOpenGroup(false);
  };

  //Thay doi trang thai chinh sua chi tiet cong viec
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditWork = () => {
    if (workDetailById.status === "WorkNotStart") {
      setIsEditing(true);
    } else {
      toast.warning("Đã đến thời gian của công việc này, không thể chỉnh sửa.");
    }
  };
  const handleSave = () => {
    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };

  //Thay doi trang thai chinh sua chi tiet phan cong viec
  const [isEditingDetailShift, setIsEditingDetailShift] = useState(false);

  const handleEditDetailShift = () => {
    setIsEditingDetailShift(true);
    setIsModalOpenDetailShift(true);
  };
  const handleSaveDetailShift = () => {
    setIsEditingDetailShift(false);
    setIsModalOpenDetailShift(false);
  };
  const handleBackDetailShift = () => {
    setIsEditingDetailShift(false);
  };

  //Thay doi trang thai chinh sua phan cong viec
  const [isEditingEditWork, setIsEditingEditWork] = useState(false);

  const handleEditEditWork = () => {
    setIsEditingEditWork(true);
    // setIsModalOpenEditWork(true);
  };
  const handleSaveEditWork = () => {
    setIsEditingEditWork(false);
    // setIsModalOpenEditWork(false);
  };
  const handleBackEditWork = () => {
    setIsEditingEditWork(false);
  };

  const log = () => {
    console.log("selectedYear", selectedYear);
    console.log("selectedWeek", selectedWeek);
  };
  const resetWorkDetailById = () => {
    setWorkDetailById({
      workId: "",
      workName: "",
      unitCostName: "",
      unitCostId: "",
      unitCost: "",
      totalProduct: "",
      workArea: "",
      workAreaId: "",
      timeStart: "",
      timeEnd: "",
    });
  };

  const fetchAllWorks = () => {
    toast.promise(
      new Promise((resolve) => {
        GetAllWorks(userEmployeeID)
          .then((data) => {
            resolve(data);
            showModalListShift();
            setAllWorks(data);
            console.log("GetAllWorks", data);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        error: "Lỗi thêm vào nhóm",
      }
    );
  };
  console.log("workDetailById", workDetailById);

  const fetchTeamForSchedule = () => {
    toast.promise(
      new Promise((resolve) => {
        GetTeamForSchedule(userEmployeeID)
          .then((data) => {
            resolve(data);
            console.log("data", data);

            setTeamForSchedule(data);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        error: "Lỗi dữ liệu",
      }
    );
  };

  const fetchWorkDetailById = (TeamID) => {
    setWorkidDetail(TeamID);
    toast.promise(
      new Promise((resolve) => {
        GetWorkDetailById(TeamID)
          .then((data) => {
            console.log("data", data);
            resolve(data);
            fetchAllUnitCosts();
            fetchAllWorkAreas();
            setWorkDetailById({
              workId: data.workId,
              workName: data.workName || "Chưa có",
              unitCostName: data.uniCostName || "Chưa có",
              unitCostId: data.unitCostId,
              unitCost: data.cost || "Chưa có",
              totalProduct: data.totalProduct || "Chưa có",
              workArea: data.workArea || "Chưa có",
              workAreaId: data.workAreaId,
              timeStart: data.timeStart || "Chưa có",
              timeEnd: data.timeEnd || "Chưa có",
              status: data.status,
            });
            showModalDetail();
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        error: "Lỗi thông tin chi tiết công việc",
      }
    );
  };

  const fetchAllUnitCosts = () => {
    GetAllUnitCosts()
      .then((data) => {
        console.log(data);
        setAllUnitCosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchAllWorkAreas = () => {
    GetAllWorkAreas()
      .then((data) => {
        console.log("fetchAllWorkAreas", data);
        setAllWorkAreas(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpdateWork = () => {
    if (!validateWorkDetail(workDetailById)) {
      return;
    }
    toast.promise(
      new Promise((resolve) => {
        UpdateWork(workDetailById)
          .then((data) => {
            resolve(data);
            handleSave();
            fetchAllWorks();
            fetchWorkDetailById(workidDetail);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        success: "Cập nhật công việ thành công",
        error: "Lỗi thêm vào nhóm",
      }
    );
  };
  const handleAddWork = () => {
    if (!validateWorkDetail(workDetailById)) {
      return;
    }
    toast.promise(
      new Promise((resolve) => {
        AddWork(workDetailById, userEmployeeID)
          .then((data) => {
            resolve(data);
            handleOkAdd();
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        success: "Thêm công việc mới thành công",
        error: "Lỗi thêm vào nhóm",
      }
    );
  };

  const FetchDataForSchedule = () => {
    toast.promise(
      new Promise((resolve) => {
        GetDataForSchedule(userEmployeeID, selectedWeek, selectedYear)
          .then((data) => {
            setDataForSchedule(data);
            resolve(data);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang tải dữ liệu",
        error: "Lỗi lịch làm việc ",
      }
    );
  };

  useEffect(() => {
    if (selectedWeek) {
      FetchDataForSchedule();
    }
  }, [selectedWeek]);

  return (
    <>
      <div className="col-right-container">
        <div className="list-container-header">
          <div className="list-text-header">
            <h2>Lên lịch làm việc</h2>
            <span>Tạo công việc và giao việc làm cho từng nhóm</span>
          </div>
          <MenuResponsive />
          <ListUserHeader />
        </div>
        <ListSearchFilterAdd
          fetchAllWorks={fetchAllWorks}
          showModalAdd={showModalAdd}
          selectedWeek={selectedWeek}
          defaultValue={defaultValue}
          handleChangeWeek={handleChangeWeek}
          weekOptions={weekOptions}
          selectedYear={selectedYear}
          handleChangeYear={handleChangeYear}
          yearOptions={yearOptions}
        />

        <TableCalendar
          handleEditDetailShift={handleEditDetailShift}
          showModalDetailShift={showModalDetailShift}
          showModalGroup={showModalGroup}
          setDataForSchedule={setDataForSchedule}
          dataForSchedule={dataForSchedule}
          defaultValue={defaultValue}
          selectedWeek={selectedWeek}
          selectedYear={selectedYear}
          userEmployeeID={userEmployeeID}
        />
        {/* modal danh sach cong viec */}
        <ModalListShift
          isModalOpenListShift={isModalOpenListShift}
          handleOkListShift={handleOkListShift}
          handleCancelListShift={handleCancelListShift}
          showModalDetail={showModalDetail}
          allWorks={allWorks}
          fetchWorkDetailById={fetchWorkDetailById}
        />

        {isEditing ? (
          // modal chinh sua cong viec
          <EditListModalDetail
            isModalOpenDetail={isModalOpenDetail}
            handleSave={handleSave}
            handleCancelDetail={handleCancelDetail}
            workDetailById={workDetailById}
            handleChange={handleChange}
            setWorkDetailById={setWorkDetailById}
            handleCancel={handleCancel}
            convertDate={convertDate}
            allUnitCosts={allUnitCosts}
            allWorkAreas={allWorkAreas}
            handleChangeUnitCostId={handleChangeUnitCostId}
            handleChangeWorkAreaId={handleChangeWorkAreaId}
            handleUpdateWork={handleUpdateWork}
            fetchWorkDetailById={fetchWorkDetailById}
            workidDetail={workidDetail}
          />
        ) : (
          <></>
        )}

        {/* modal them cong viec */}
        <ModalAdd
          isModalOpeAdd={isModalOpeAdd}
          handleOkAdd={handleOkAdd}
          handleCancelAdd={handleCancelAdd}
          workDetailById={workDetailById}
          setWorkDetailById={setWorkDetailById}
          handleChangeUnitCostId={handleChangeUnitCostId}
          allUnitCosts={allUnitCosts}
          handleChangeWorkAreaId={handleChangeWorkAreaId}
          allWorkAreas={allWorkAreas}
          convertDate={convertDate}
          handleAddWork={handleAddWork}
        />

        {isEditingDetailShift ? (
          // modal chỉnh sửa phân công việc
          <WorkModalTeam
            isModalOpenDetailShift={isModalOpenDetailShift}
            handleSaveDetailShift={handleSaveDetailShift}
            handleCancelDetailShift={handleCancelDetailShift}
            handleChange={handleChange}
            handleBackDetailShift={handleBackDetailShift}
          />
        ) : (
          // modal chi tiêt phân công việc
          <ListModuleDetail3
            isModalOpenDetailShift={isModalOpenDetailShift}
            handleOkDetailShift={handleOkDetailShift}
            handleCancelDetailShift={handleCancelDetailShift}
            handleEditDetailShift={handleEditDetailShift}
            showModalDetail={showModalDetail}
            showModalEditWork={showModalEditWork}
          />
        )}

        {/* {isEditingEditWork ? (
        
        ): (
            
        )} */}
        <EditWork
          isModalOpenEditWork={isModalOpenEditWork}
          handleOkEditWork={handleOkEditWork}
          handleCancelEditWork={handleCancelEditWork}
          handleChange={handleChange}
        />

        {/* modal nhom */}
        <ModalGroup
          isModalOpenGroup={isModalOpenGroup}
          handleOkGroup={handleOkGroup}
          handleCancelGroup={handleCancelGroup}
        />
      </div>
    </>
  );
};
export default CalendarComponent;
