import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Input, Select, Modal } from "antd";

import "../scss/reset.scss";
import "../scss/index.scss";
import "../scss/fonts.scss";
import "../scss/PayrollComponent.scss";
import { createYearOptions, getMonthsInYear } from "../logicTime/getWeeDays";
import ListUserHeader from "./componentUI/ListUserHeader";

import {
  Reward,
  Holiday,
  RewardPersonal,
  TypeReward,
  RewardAll,
  RewardCompany,
  AllowanceDetails,
  SubsidiesDetail,
  ExcelModal,
  ListTable,
  ListSearchFilterAdd,
} from "./componentPayroll";

import {
  fetchAllSalaries,
  fetchAllReward,
  GetEmployeeAllowanceDetail,
  GetEmployeeDeductionDetail,
  GetEmployeeActualSalaryDetail
} from "../../sevices/PayrollSevice";

const PayrollComponent = () => {
  const [salaries, setSalaries] = useState([]);
  const [reward, setReward] = useState([]);
  const currentDateTime = new Date();

  const currentYear = currentDateTime.getFullYear();

  const yearOptions = createYearOptions();
  const [date, setDate] = useState(new Date().getFullYear());

  const monthOptions = getMonthsInYear(date);
  const currentMonth = new Date().getMonth();
  const [months, setMonths] = useState(currentMonth.toString());
  const [dataAllowance, setDataAllowance] = useState([]);
  const [dataDeduction, setDataDeduction] = useState([]);
  const [dataActualSalary, setActualSalary] = useState([]);


  const day = currentDateTime.getDate();
  const formattedDate = new Date().toISOString().split("T")[0];
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const convertDobToISO = (dobstring) => {
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

  //modal Excel
  const [isModalOpenExcel, setIsModalOpenExcel] = useState(false);
  const showModalExcel = () => {
    setIsModalOpenExcel(true);
  };
  const handleOkExcel = () => {
    setIsModalOpenExcel(false);
  };
  const handleCancelExcel = () => {
    setIsModalOpenExcel(false);
  };

  //modal Chi tiết phụ cấp
  const [isModalOpenSubsidies, setIsModalOpenSubsidies] = useState(false);
  const showModalSubsidies = () => {
    setIsModalOpenSubsidies(true);
  };
  const handleOkSubsidies = () => {
    setIsModalOpenSubsidies(false);
  };
  const handleCancelSubsidies = () => {
    setIsModalOpenSubsidies(false);
  };

  //modal Chi tiết trợ cấp
  const [isModalOpenAllowance, setIsModalOpenAllowance] = useState(false);
  const showModalAllowance = () => {
    setIsModalOpenAllowance(true);
  };
  const handleOkAllowance = () => {
    setIsModalOpenAllowance(false);
  };
  const handleCancelAllowance = () => {
    setIsModalOpenAllowance(false);
  };

  //modal Chi tiết thưởng
  const [isModalOpenReward, setIsModalOpenReward] = useState(false);
  const showModalReward = () => {
    setIsModalOpenReward(true);
  };
  const handleOkReward = () => {
    setIsModalOpenReward(false);
  };
  const handleCancelReward = () => {
    setIsModalOpenReward(false);
  };

  //modal Thưởng công ty
  const [isModalOpenRewardCompany, setIsModalOpenRewardCompany] =
    useState(false);

  const showModalRewardCompany = () => {
    toast.promise(
      new Promise((resolve) => {
        fetchAllReward(currentMonth + "-" + currentYear)
          .then((data) => {
            setReward(data);
            resolve(data);
            setDate(formattedDate);
            console.log("reward", data);
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
    setIsModalOpenRewardCompany(true);
  };

  const handleOkRewardCompany = () => {
    setIsModalOpenRewardCompany(false);
  };
  const handleCancelRewardCompany = () => {
    setIsModalOpenRewardCompany(false);
  };

  //modal Thưởng cá nhân
  const [isModalOpenRewardPersonal, setIsModalOpenRewardPersonal] =
    useState(false);
  const showModalRewardPersonal = () => {
    setIsModalOpenRewardPersonal(true);
  };
  const handleOkRewardPersonal = () => {
    setIsModalOpenRewardPersonal(false);
  };
  const handleCancelRewardPersonal = () => {
    setIsModalOpenRewardPersonal(false);
  };

  //modal Thưởng toàn thể công ty
  const [isModalOpenRewardAll, setIsModalOpenRewardAll] = useState(false);
  const showModalRewardAll = () => {
    setIsModalOpenRewardAll(true);
  };
  const handleOkRewardAll = () => {
    setIsModalOpenRewardAll(false);
  };
  const handleCancelRewardAll = () => {
    setIsModalOpenRewardAll(false);
  };

  //modal Các loại thưởng
  const [isModalOpenTypeReward, setIsModalOpenTypeReward] = useState(false);
  const showModalTypeReward = () => {
    setIsModalOpenTypeReward(true);
  };
  const handleOkTypeReward = () => {
    setIsModalOpenTypeReward(false);
  };
  const handleCancelTypeReward = () => {
    setIsModalOpenTypeReward(false);
  };

  //modal Sửa tên thưởng
  const [isModalOpenEditReward, setIsModalOpenEditReward] = useState(false);
  const showModalEditReward = () => {
    setIsModalOpenEditReward(true);
  };
  const handleOkEditReward = () => {
    setIsModalOpenEditReward(false);
  };
  const handleCancelEditReward = () => {
    setIsModalOpenEditReward(false);
  };

  const [isModalOpenHoliday, setIsModalOpenHoliday] = useState(false);
  const showModalHoliday = () => {
    setIsModalOpenHoliday(true);
  };
  const handleOkHoliday = () => {
    setIsModalOpenHoliday(false);
  };
  const handleCancelHoliday = () => {
    setIsModalOpenHoliday(false);
  };

  const fetchEmployeeActualSalaryDetail= (employeeId) => {
    toast.promise(
      new Promise((resolve) => {
        GetEmployeeActualSalaryDetail(employeeId, months, date)
          .then((data) => {
            showModalReward()
            console.log('',data);
            
            setActualSalary(data)
            resolve(data);
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

  const fetchEmployeeDeductionDetail = (employeeId) => {
    toast.promise(
      new Promise((resolve) => {
        GetEmployeeDeductionDetail(employeeId, months, date)
          .then((data) => {
            showModalSubsidies()
            setDataDeduction(data)
            resolve(data);
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

  const fetchEmployeeAllowanceDetail = (employeeId) => {
    toast.promise(
      new Promise((resolve) => {
        GetEmployeeAllowanceDetail(employeeId, months, date)
          .then((data) => {
            showModalAllowance()
            setDataAllowance(data)
            resolve(data);
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

  const fetData = () => {
    toast.promise(
      new Promise((resolve) => {
        fetchAllSalaries(months, date)
          .then((data) => {
            setSalaries(data);
            resolve(data);
            console.log("data", data);
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
  console.log("Salary", salaries);

  useEffect(() => {
    fetData();
  }, [date, months]);

  return (
    <>
      <div className="col-right-container">
        <div className="list-container-header">
          <div className="list-text-header">
            <h2>Lương | Thưởng</h2>
            <span>
              Lưu thông tin bắt đầu làm việc và ngưng làm việc củ một nhóm
            </span>
          </div>
          <ListUserHeader />
        </div>

        <ListSearchFilterAdd
          showModalExcel={showModalExcel}
          showModalRewardCompany={showModalRewardCompany}
          showModalTypeReward={showModalTypeReward}
          date={date}
          setDate={setDate}
          yearOptions={yearOptions}
          monthOptions={monthOptions}
          setMonths={setMonths}
          months={months}
        />

        <ListTable
          salaries={salaries}
          showModalSubsidies={showModalSubsidies}
          showModalReward={showModalReward}
          fetchEmployeeAllowanceDetail={fetchEmployeeAllowanceDetail}
          fetchEmployeeDeductionDetail={fetchEmployeeDeductionDetail}
          fetchEmployeeActualSalaryDetail={fetchEmployeeActualSalaryDetail}
         
        />

        <SubsidiesDetail
          isModalOpenSubsidies={isModalOpenSubsidies}
          handleOkSubsidies={handleOkSubsidies}
          handleCancelSubsidies={handleCancelSubsidies}
          dataDeduction={dataDeduction}
        />

        <AllowanceDetails
          isModalOpenAllowance={isModalOpenAllowance}
          handleOkAllowance={handleOkAllowance}
          handleCancelAllowance={handleCancelAllowance}
          dataAllowance={dataAllowance}
        />

        <RewardCompany
          isModalOpenRewardCompany={isModalOpenRewardCompany}
          handleOkRewardCompany={handleOkRewardCompany}
          handleCancelRewardCompany={handleCancelRewardCompany}
          showModalRewardPersonal={showModalRewardPersonal}
          showModalRewardAll={showModalRewardAll}
          showModalHoliday={showModalHoliday}
          reward={reward}
          date={date}
          setDate={setDate}
        />

        <RewardAll
          isModalOpenRewardAll={isModalOpenRewardAll}
          handleOkRewardAll={handleOkRewardAll}
          handleCancelRewardAll={handleCancelRewardAll}
          handleChange={handleChange}
          dataActualSalary={dataActualSalary}
        />

        <TypeReward
          isModalOpenTypeReward={isModalOpenTypeReward}
          handleOkTypeReward={handleOkTypeReward}
          handleCancelTypeReward={handleCancelTypeReward}
          showModalEditReward={showModalEditReward}
        />
        <Reward
          isModalOpenReward={isModalOpenReward}
          handleOkReward={handleOkReward}
          handleCancelReward={handleCancelReward}
          fetchEmployeeActualSalaryDetail={fetchEmployeeActualSalaryDetail}
        />

        <RewardPersonal
          isModalOpenRewardPersonal={isModalOpenRewardPersonal}
          handleOkRewardPersonal={handleOkRewardPersonal}
          handleCancelRewardPersonal={handleCancelRewardPersonal}
          handleChange={handleChange}
        />
        <Holiday
          isModalOpenHoliday={isModalOpenHoliday}
          handleOkHoliday={handleOkHoliday}
          handleCancelHoliday={handleCancelHoliday}
          handleChange={handleChange}
        />
        {/* Modal Sửa tên thưởng */}
        <Modal
          className="modal"
          open={isModalOpenEditReward}
          onOk={handleOkEditReward}
          onCancel={handleCancelEditReward}
        >
          <div className="modal-detail-all modal-edit-reward">
            <div className="head-modal">
              <p>Sửa tên thưởng</p>
            </div>
            <div className="body-modal">
              <div className="item-modal">
                <p>Loại thưởng</p>
                <Input type="text" placeholder="Thưởng tết"></Input>
              </div>

              <div className="footer-modal">
                <span className="back" onClick={handleOkEditReward}>
                  Hủy bỏ
                </span>
                <span className="edit save" onClick={handleCancelEditReward}>
                  Lưu
                </span>
              </div>
            </div>
          </div>
        </Modal>

        {/* Modal excel */}
        <ExcelModal
          isModalOpenExcel={isModalOpenExcel}
          handleOkExcel={handleOkExcel}
          handleCancelExcel={handleCancelExcel}
          handleChange={handleChange}
          months={months}
          date={date}
          setMonths={setMonths}
          monthOptions={monthOptions}
          setDate={setDate}
          yearOptions={yearOptions}
        />
      </div>
    </>
  );
};
export default PayrollComponent;
