import "../scss/reset.scss";
import "../scss/index.scss";
import "../scss/fonts.scss";
import "../scss/CalendarComponent.scss";
import "../scss/responsive/Calendar.scss";
import MenuResponsive from "./componentUI/MenuResponsive";
import ListUserHeader from "./componentUI/ListUserHeader";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getTomorrowDateSEAsia } from "../logicTime/getDate";
import {
  GetAllWorks,
  GetWorkDetailById,
  GetDataForSchedule,
} from "../../sevices/CalendarSevice";
import { GetAllUnitCosts } from "../../sevices/UnitCostSevice";
import { GetAllWorkAreas } from "../../sevices/WorkAreaSevice";
import { fetchShiftType } from "../../sevices/ShiftTypeService";
import { detailTeamByID } from "../../sevices/TeamService";
import {
  ListSearchFilterAdd,
  ModalListShift,
  TableCalendar,
  ListModuleDetail3,
  ModalGroup,
} from "./componentCalendar";
import {
  createYearOptions,
  getWeekRange,
  createWeekOptions,
} from "../logicTime/getWeeDays";
import Item from "antd/es/list/Item";
const CalendarComponent = () => {
  const yearOptions = createYearOptions();
  const weekOptions = createWeekOptions();
  const currentWeek = getWeekRange(new Date());
  const defaultValue = `${currentWeek.start}-${currentWeek.end}`;
  const [selectedWeek, setSelectedWeek] = useState(defaultValue);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [dataForSchedule, setDataForSchedule] = useState();
  const [actionWork, setActionWork] = useState();
  const [isModalOpenListShift, setIsModalOpenListShift] = useState(false);
  const [isModalOpenDetailShift, setIsModalOpenDetailShift] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpenGroup, setIsModalOpenGroup] = useState(false);
  const [allWorks, setAllWorks] = useState([]);
  const [iText, setIText] = useState("");
 

  const [workDetailById, setWorkDetailById] = useState({
    workId: "",
    workName: "",
    numberProduct:"",
    unitCostName: "",
    unitCostId: "",
    unitCost: "",
    totalProduct: "",
    workArea: "",
    workAreaId: "",
    status: "",
    date: getTomorrowDateSEAsia(),
  });
  const innitShift= {
    ShiftId: "",
    ShiftName: "",
    TeamName: "",
    TeamID : "",
    NumberOfMember: "",
  }
  
  const [allUnitCosts, setAllUnitCosts] = useState([]);
  const [allWorkAreas, setAllWorkAreas] = useState([]);
  const [workidDetail, setWorkidDetail] = useState([]);
  const [shift, setShift] = useState(innitShift);
  const [team, setTeam] = useState([]);
  const [shiftType, setShiftType] = useState([]);
  const [detailTeamID, setDetailTeamID] = useState([]);
  const handleOkGroup = () => {
    setIsModalOpenGroup(false);
  };
  const handleCancelGroup = () => {
    setIsModalOpenGroup(false);
  };
  const showModalGroup = () => {
    setIsModalOpenGroup(true);
  };
  const handleChangeWeek = (newWeek) => {
    setSelectedWeek(newWeek);
  };

  const handleChangeYear = (newYear) => {
    setSelectedYear(newYear);
  };
  const userEmployeeID =
    localStorage.getItem("userEmployeeID") ||
    sessionStorage.getItem("userEmployeeID");
  // Get the userPages string from localStorage or sessionStorage
  const userPagesString =
    localStorage.getItem("userPages") || sessionStorage.getItem("userPages");

  const userPagesArray = JSON.parse(userPagesString);
  

  if (Array.isArray(userPagesArray) && userPagesArray.includes("Calendar")) {
    var calendarPageName = "Calendar";
  }

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

  const handleDetailWorkInList = () => {
    setIsModalOpenListShift(false);
    setIsModalOpenDetailShift(true);
  };

  const handleCancelDetailWorkInList = () => {
    if (actionWork === "detailWork" || actionWork === "viewWorkList") {
      setIsModalOpenListShift(true);
    }
    setIsModalOpenDetailShift(false);
    resetWorkDetailById();
  };

  const handlegetDataDetail = (id) => {
    fetchWorkDetailById(id);
    handleDetailWorkInList();
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

  const handleOkListShift = () => {
    setIsModalOpenListShift(false);
  };
  const handleCancelListShift = () => {
    setIsModalOpenListShift(false);
  };

  const showModalDetailShift = () => {
    setIsModalOpenDetailShift(true);
  };

  const handleCancelDetailShift = () => {};

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
      date: "",
      numberProduct:"",
    });
  };

  const fetchAllWorks = () => {
    toast.promise(
      new Promise((resolve) => {
        GetAllWorks(userEmployeeID,selectedWeek,selectedYear)
          .then((data) => {
            resolve(data);
            setIsModalOpenListShift(true);
            setAllWorks(data);
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

  const fetchWorkDetailById = (TeamID) => {
    setWorkidDetail(TeamID);
    toast.promise(
      new Promise((resolve) => {
        GetWorkDetailById(TeamID)
          .then((data) => {
            console.log(data)
            resolve(data);
            setWorkDetailById({
              workId: data.workId,
              workName: data.workName || "Chưa có",
              unitCostName: data.uniCostName || "Chưa có",
              unitCostId: data.unitCostId,
              numberProduct: data.numberProduct,
              unitCost: data.cost || "Chưa có",
              totalProduct: data.totalProduct || "Chưa có",
              workArea: data.workArea || "Chưa có",
              workAreaId: data.workAreaId,
              status: data.status,
              date: data.date,
            });
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        error: "Lỗi thông tin chi tiết công việc",
      }
    );
  };

  const fetchAllUnitCosts = () => {
    GetAllUnitCosts()
      .then((data) => {
        setAllUnitCosts(data);
      })
      .catch((error) => {
      });
  };

  const fetchAllWorkAreas = () => {
    GetAllWorkAreas()
      .then((data) => {
        setAllWorkAreas(data);
      })
      .catch((error) => {
      });
  };

  const FetchDataForSchedule = () => {
    let isDataReceived = false;
    const fetchDataPromise = new Promise((resolve) => {
      GetDataForSchedule(userEmployeeID, selectedWeek, selectedYear, iText)
        .then((data) => {
          setDataForSchedule(data);
          isDataReceived = true;
          resolve(data);
        })
        .catch((error) => {
          resolve(Promise.reject(error));
        });
    });
    setTimeout(() => {
      if (!isDataReceived) {
        toast.promise(fetchDataPromise, {
          pending: "Đang tải dữ liệu",
          error: "Lỗi lịch làm việc",
        });
      }
    }, 1000);
  };
  const fetchAllShiftType = (id) => {
    fetchShiftType(id)
      .then((data) => {
        setShiftType(data);
      })
      .catch((error) => {
      });
  };
  const detailTeam = (id) =>{
    detailTeamByID(id)
      .then((data) => {
        setDetailTeamID(data);
      })
      .catch((error) => {
      });

  }

  useEffect(() => {
    FetchDataForSchedule();
  }, [iText, selectedWeek, selectedYear]);

  useEffect(() => {
    fetchAllUnitCosts();
    fetchAllWorkAreas();
  }, []);
  return (
    <>
      <div className="col-right-container">
        <div className="list-container-header">
          <div className="list-text-header">
            <h2>Lịch làm việc</h2>
            <span>Tạo công việc và giao việc làm cho từng nhóm</span>
          </div>
          <MenuResponsive />
          <ListUserHeader />
        </div>
        <ListSearchFilterAdd
          fetchAllWorks={fetchAllWorks}
          selectedWeek={selectedWeek}
          defaultValue={defaultValue}
          handleChangeWeek={handleChangeWeek}
          weekOptions={weekOptions}
          selectedYear={selectedYear}
          handleChangeYear={handleChangeYear}
          yearOptions={yearOptions}
          setActionWork={setActionWork}
          setIText={setIText}
          iText={iText}
          
        />

        <TableCalendar
          showModalDetailShift={showModalDetailShift}
          setDataForSchedule={setDataForSchedule}
          dataForSchedule={dataForSchedule}
          defaultValue={defaultValue}
          selectedWeek={selectedWeek}
          selectedYear={selectedYear}
          userEmployeeID={userEmployeeID}
          setActionWork={setActionWork}
          showModalGroup={showModalGroup}
          handlegetDataDetail={handlegetDataDetail}
          setWorkidDetail={setWorkidDetail}
          setWorkDetailById={setWorkDetailById}
          convertDate={convertDate}
          shift={shift}
          team={team}
          setShift={setShift}
          setTeam={setTeam}
          fetchAllShiftType={fetchAllShiftType}
          detailTeam={detailTeam}
        />

        <ModalListShift
          isModalOpenListShift={isModalOpenListShift}
          handleOkListShift={handleOkListShift}
          handleCancelListShift={handleCancelListShift}
          allWorks={allWorks}
          handlegetDataDetail={handlegetDataDetail}
          setActionWork={setActionWork}
        />

        <ListModuleDetail3
          isModalOpenDetailShift={isModalOpenDetailShift}
          handleCancelDetailShift={handleCancelDetailShift}
          actionWork={actionWork}
          allUnitCosts={allUnitCosts}
          workDetailById={workDetailById}
          handleChangeUnitCostId={handleChangeUnitCostId}
          setWorkDetailById={setWorkDetailById}
          allWorkAreas={allWorkAreas}
          handleChangeWorkAreaId={handleChangeWorkAreaId}
          convertDate={convertDate}
          handleCancelDetailWorkInList={handleCancelDetailWorkInList}
          getTomorrowDateSEAsia={getTomorrowDateSEAsia}
          userEmployeeID={userEmployeeID}
          fetchWorkDetailById={fetchWorkDetailById}
          workidDetail={workidDetail}
          FetchDataForSchedule={FetchDataForSchedule}
        />

        <ModalGroup
          isModalOpenGroup={isModalOpenGroup}
          handleOkGroup={handleOkGroup}
          handleCancelGroup={handleCancelGroup}
          shift={shift}
          team={team}
          setShift={setShift}
          SetTeam={setTeam}
          shiftType={shiftType}
          detailTeamID={detailTeamID}
        />
      </div>
    </>
  );
};
export default CalendarComponent;
