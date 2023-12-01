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
  GetEmployeeActualSalaryDetail,
  CreateAndEditPersonalReward,
  CreateAndUpdateSpecialOccasion,
  CreateAndUpdateCompanyRerward,
} from "../../sevices/PayrollSevice";
import { fetchAllEmplyee } from "../../sevices/EmployeeService";
const PayrollComponent = () => {
  const [salaries, setSalaries] = useState([]);
  const [reward, setReward] = useState([]);
  const currentDateTime = new Date();

  const currentYear = currentDateTime.getFullYear();

  const yearOptions = createYearOptions();
  const [date, setDate] = useState(new Date().getFullYear());

  const monthOptions = getMonthsInYear(date);
  const currentMonth = new Date().getMonth() + 1;
  const [months, setMonths] = useState(currentMonth.toString());
  const [iText, setIText] = useState("");
  const [dataAllowance, setDataAllowance] = useState([]);
  const [dataDeduction, setDataDeduction] = useState([]);
  const [dataActualSalary, setActualSalary] = useState([]);

  //personal reward
  const [employees, setEmployees] = useState([]);
  const [employeeID, setEmployeesID] = useState("");
  const [bonusAmount, setBonusAmount] = useState("");
  const [bonusName, setBonusName] = useState("");
  const [bonusDate, setBonusDate] = useState("");
  const [bonusReason, setBonusReason] = useState("");

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

  const handleBonusAmountChange = (e) => {
    const formattedValue = e.target.value.replace(/\D/g, "");
    setBonusAmount(formattedValue);
  };

  const validateData = () => {
    const errors = [];

    if (!bonusName) {
      errors.push("Vui lòng nhập tên");
    }

    if (!bonusAmount) {
      errors.push("Vui lòng nhập số tiền.");
    }

    if (!bonusReason) {
      errors.push("Vui lòng nhập note.");
    }

    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.warning(error);
      });
      return false;
    }
    return true;
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
  const [isModalOpenRewardCompany, setIsModalOpenRewardCompany] = useState(
    false
  );
  const dataConver = months + "-" + date;
  console.log("date", dataConver);
  const featchDataReward = () => {
    toast.promise(
      new Promise((resolve) => {
        fetchAllReward(dataConver)
          .then((data) => {
            setReward(data);
            resolve(data);
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
  };
  const showModalRewardCompany = () => {
    featchDataReward();
    setIsModalOpenRewardCompany(true);
  };

  const handleOkRewardCompany = () => {
    setIsModalOpenRewardCompany(false);
  };
  const handleCancelRewardCompany = () => {
    setIsModalOpenRewardCompany(false);
  };
  const fetchEmployeeData = () => {
    toast.promise(
      new Promise((resolve) => {
        fetchAllEmplyee()
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
  };
  //modal Thưởng cá nhân
  const [isModalOpenRewardPersonal, setIsModalOpenRewardPersonal] = useState(
    false
  );
  const showModalRewardPersonal = () => {
    fetchEmployeeData();
    setIsModalOpenRewardPersonal(true);
    console.log("employee", employees);
  };

  const resetPersonDetail = () => {
    setBonusAmount("");
    setBonusReason("");
    setEmployeesID("");
    setBonusName("");
  };

  //modal Thưởng toàn thể công ty
  const [isModalOpenRewardAll, setIsModalOpenRewardAll] = useState(false);
  const showModalRewardAll = () => {
    setIsModalOpenRewardAll(true);
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
  console.log("data1", dataActualSalary);

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

  //modal hiển thị tất cả danh sách phụ cấp
  const [isModalOpenAllowanceAll, setIsModalOpenAllowanceAll] = useState(false);
  const showModalAllowanceAll = () => {
    setIsModalOpenAllowanceAll(true);
  };
  const handleOkAllowanceAll = () => {
    setIsModalOpenAllowanceAll(false);
  };
  const handleCancelAllowanceAll = () => {
    setIsModalOpenAllowanceAll(false);
  };

  //modal hiển thị tất cả danh sách các khoản trừ
  const [isModalOpenDeductions, setIsModalOpenDeductions] = useState(false);
  const showModalDeductions = () => {
    setIsModalOpenDeductions(true);
  };
  const handleOkDeductions = () => {
    setIsModalOpenDeductions(false);
  };
  const handleCancelDeductions = () => {
    setIsModalOpenDeductions(false);
  };

  const [isModalOpenHoliday, setIsModalOpenHoliday] = useState(false);
  const showModalHoliday = () => {
    fetchEmployeeData();
    setIsModalOpenHoliday(true);
  };

  const fetchEmployeeActualSalaryDetail = (employeeId) => {
    toast.promise(
      new Promise((resolve) => {
        GetEmployeeActualSalaryDetail(employeeId, months, date)
          .then((data) => {
            showModalReward();
            setActualSalary(data);
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
            showModalSubsidies();
            setDataDeduction(data);
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
            showModalAllowance();
            setDataAllowance(data);
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
    fetchAllSalaries(iText, months, date)
      .then((data) => {
        setSalaries(data);
        console.log("data", data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  console.log("Salary", salaries);

  useEffect(() => {
    fetData();
  }, [iText, date, months]);

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
          setIText={setIText}
          iText={iText}
        />

        <ListTable
          salaries={salaries}
          showModalSubsidies={showModalSubsidies}
          showModalReward={showModalReward}
          fetchEmployeeAllowanceDetail={fetchEmployeeAllowanceDetail}
          fetchEmployeeDeductionDetail={fetchEmployeeDeductionDetail}
          fetchEmployeeActualSalaryDetail={fetchEmployeeActualSalaryDetail}
          showModalAllowanceAll={showModalAllowanceAll}
          showModalDeductions={showModalDeductions}
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
          handleChange={handleChange}
          bonusAmount={bonusAmount}
          bonusReason={bonusReason}
          bonusName={bonusName}
          handleBonusAmountChange={handleBonusAmountChange}
          setBonusName={setBonusName}
          setBonusReason={setBonusReason}
          resetPersonDetail={resetPersonDetail}
          featchDataReward={featchDataReward}
          setIsModalOpenRewardAll={setIsModalOpenRewardAll}
          validateData={validateData}
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
          dataActualSalary={dataActualSalary}
        />

        <RewardPersonal
          isModalOpenRewardPersonal={isModalOpenRewardPersonal}
          handleChange={handleChange}
          employees={employees}
          employeeID={employeeID}
          bonusAmount={bonusAmount}
          bonusReason={bonusReason}
          bonusName={bonusName}
          setEmployeesID={setEmployeesID}
          handleBonusAmountChange={handleBonusAmountChange}
          setBonusName={setBonusName}
          setBonusReason={setBonusReason}
          resetPersonDetail={resetPersonDetail}
          featchDataReward={featchDataReward}
          setIsModalOpenRewardPersonal={setIsModalOpenRewardPersonal}
          validateData={validateData}
        />
        <Holiday
          isModalOpenHoliday={isModalOpenHoliday}
          handleChange={handleChange}
          employees={employees}
          employeeID={employeeID}
          bonusAmount={bonusAmount}
          bonusReason={bonusReason}
          bonusName={bonusName}
          setEmployeesID={setEmployeesID}
          handleBonusAmountChange={handleBonusAmountChange}
          setBonusName={setBonusName}
          setBonusReason={setBonusReason}
          resetPersonDetail={resetPersonDetail}
          featchDataReward={featchDataReward}
          setIsModalOpenHoliday={setIsModalOpenHoliday}
          validateData={validateData}
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

        {/* Modal hiển thị tất cả danh sách phụ cấp */}
        <div className="AllowanceAll">
          <Modal
            className="modal-AllowanceAll"
            open={isModalOpenAllowanceAll}
            onOk={handleOkAllowanceAll}
            onCancel={handleCancelAllowanceAll}
          >
            <div className="modal-allowance-all">
              <div className="head-allowance-all">
                <div className="text-head">
                  <p>Chi tiết danh sách phụ cấp</p>
                  <svg
                    onClick={handleCancelAllowanceAll}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M30 2.30769L17.3077 15L30 27.6923L27.6923 30L15 17.3077L2.30769 30L0 27.6923L12.6923 15L0 2.30769L2.30769 0L15 12.6923L27.6923 0L30 2.30769Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <div className="body-allowance-all">
                <thead>
                  <tr>
                    <div className="item-child">MNV</div>
                    <div className="item-child">Họ và tên</div>
                    <div className="item-child">Ăn sáng</div>
                    <div className="item-child">Trang phục</div>
                    <div className="item-child">Xăng xe</div>
                    <div className="item-child">Tổng</div>
                  </tr>
                </thead>
                <div className="tbody scrollbar" id="style-15">
                  <div className="item-body">
                    <div className="item-child-body">01</div>
                    <div className="item-child-body">Nguyễn Văn An</div>
                    <div className="item-child-body">800.000 VNĐ</div>
                    <div className="item-child-body">200.000 VNĐ</div>
                    <div className="item-child-body">700.000 VNĐ</div>
                    <div className="item-child-body">1.700.000 VNĐ</div>
                  </div>
                  <div className="item-body">
                    <div className="item-child-body">01</div>
                    <div className="item-child-body">Nguyễn Văn An</div>
                    <div className="item-child-body">800.000 VNĐ</div>
                    <div className="item-child-body">200.000 VNĐ</div>
                    <div className="item-child-body">700.000 VNĐ</div>
                    <div className="item-child-body">1.700.000 VNĐ</div>
                  </div>
                  <div className="item-body">
                    <div className="item-child-body">01</div>
                    <div className="item-child-body">Nguyễn Văn An</div>
                    <div className="item-child-body">800.000 VNĐ</div>
                    <div className="item-child-body">200.000 VNĐ</div>
                    <div className="item-child-body">700.000 VNĐ</div>
                    <div className="item-child-body">1.700.000 VNĐ</div>
                  </div>
                  <div className="item-body">
                    <div className="item-child-body">01</div>
                    <div className="item-child-body">Nguyễn Văn An</div>
                    <div className="item-child-body">800.000 VNĐ</div>
                    <div className="item-child-body">200.000 VNĐ</div>
                    <div className="item-child-body">700.000 VNĐ</div>
                    <div className="item-child-body">1.700.000 VNĐ</div>
                  </div>
                  <div className="item-body">
                    <div className="item-child-body">01</div>
                    <div className="item-child-body">Nguyễn Văn An</div>
                    <div className="item-child-body">800.000 VNĐ</div>
                    <div className="item-child-body">200.000 VNĐ</div>
                    <div className="item-child-body">700.000 VNĐ</div>
                    <div className="item-child-body">1.700.000 VNĐ</div>
                  </div>
                  <div className="item-body">
                    <div className="item-child-body">01</div>
                    <div className="item-child-body">Nguyễn Văn An</div>
                    <div className="item-child-body">800.000 VNĐ</div>
                    <div className="item-child-body">200.000 VNĐ</div>
                    <div className="item-child-body">700.000 VNĐ</div>
                    <div className="item-child-body">1.700.000 VNĐ</div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>

        {/* Modal hiển thị tất cả danh sách các khoản trừ */}
        <div className="AllowanceAll">
          <Modal
            className="modal-AllowanceAll"
            open={isModalOpenDeductions}
            onOk={handleOkDeductions}
            onCancel={handleCancelDeductions}
          >
            <div className="modal-allowance-all">
              <div className="head-allowance-all">
                <div className="text-head">
                  <p>Chi tiết danh sách các khoản trừ</p>
                  <svg
                    onClick={handleCancelDeductions}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M30 2.30769L17.3077 15L30 27.6923L27.6923 30L15 17.3077L2.30769 30L0 27.6923L12.6923 15L0 2.30769L2.30769 0L15 12.6923L27.6923 0L30 2.30769Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <div className="body-allowance-all">
                <thead>
                  <tr>
                    <div className="item-child">MNV</div>
                    <div className="item-child">Họ và tên</div>
                    <div className="item-child">BHYT</div>
                    <div className="item-child">BHXH</div>
                    <div className="item-child">BHTT</div>
                    <div className="item-child">Phí công đoàn</div>
                    <div className="item-child">Tổng</div>
                  </tr>
                </thead>
                <div className="tbody scrollbar" id="style-15">
                  <div className="item-body">
                    <div className="item-child-body">01</div>
                    <div className="item-child-body">Nguyễn Văn An</div>
                    <div className="item-child-body">800.000 VNĐ</div>
                    <div className="item-child-body">200.000 VNĐ</div>
                    <div className="item-child-body">700.000 VNĐ</div>
                    <div className="item-child-body">700.000 VNĐ</div>
                    <div className="item-child-body">1.700.000 VNĐ</div>
                  </div>
                  <div className="item-body">
                    <div className="item-child-body">01</div>
                    <div className="item-child-body">Nguyễn Văn An</div>
                    <div className="item-child-body">800.000 VNĐ</div>
                    <div className="item-child-body">200.000 VNĐ</div>
                    <div className="item-child-body">700.000 VNĐ</div>
                    <div className="item-child-body">700.000 VNĐ</div>
                    <div className="item-child-body">1.700.000 VNĐ</div>
                  </div>
                  <div className="item-body">
                    <div className="item-child-body">01</div>
                    <div className="item-child-body">Nguyễn Văn An</div>
                    <div className="item-child-body">800.000 VNĐ</div>
                    <div className="item-child-body">200.000 VNĐ</div>
                    <div className="item-child-body">700.000 VNĐ</div>
                    <div className="item-child-body">700.000 VNĐ</div>
                    <div className="item-child-body">1.700.000 VNĐ</div>
                  </div>
                  <div className="item-body">
                    <div className="item-child-body">01</div>
                    <div className="item-child-body">Nguyễn Văn An</div>
                    <div className="item-child-body">800.000 VNĐ</div>
                    <div className="item-child-body">200.000 VNĐ</div>
                    <div className="item-child-body">700.000 VNĐ</div>
                    <div className="item-child-body">700.000 VNĐ</div>
                    <div className="item-child-body">1.700.000 VNĐ</div>
                  </div>
                  <div className="item-body">
                    <div className="item-child-body">01</div>
                    <div className="item-child-body">Nguyễn Văn An</div>
                    <div className="item-child-body">800.000 VNĐ</div>
                    <div className="item-child-body">200.000 VNĐ</div>
                    <div className="item-child-body">700.000 VNĐ</div>
                    <div className="item-child-body">700.000 VNĐ</div>
                    <div className="item-child-body">1.700.000 VNĐ</div>
                  </div>
                  <div className="item-body">
                    <div className="item-child-body">01</div>
                    <div className="item-child-body">Nguyễn Văn An</div>
                    <div className="item-child-body">800.000 VNĐ</div>
                    <div className="item-child-body">200.000 VNĐ</div>
                    <div className="item-child-body">700.000 VNĐ</div>
                    <div className="item-child-body">700.000 VNĐ</div>
                    <div className="item-child-body">1.700.000 VNĐ</div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};
export default PayrollComponent;
