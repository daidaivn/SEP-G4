import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Input, Select, Modal } from "antd";

import "../scss/reset.scss";
import "../scss/index.scss";
import "../scss/fonts.scss";
import "../scss/PayrollComponent.scss";
import "../scss/responsive/Payroll.scss";
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
  AllowanceAll,
  DeductionsAll,
  SalaryReceived,
  Salary,
  Tax,
  Other,
  Advancesalary,
} from "./componentPayroll";

import {
  fetchAllReward,
  GetEmployeeAllowanceDetail,
  GetEmployeeDeductionDetail,
  GetEmployeeActualSalaryDetail,
  fetchAllSalaryDetail,
} from "../../sevices/PayrollSevice";

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
  const initialInputEmployeeState = {
    employeeStringID: "",
    employeeID: "",
    employeeName: "",
    amount: "",
    reason: "",
    bonusName: "",
  };
  const [employees, setEmployees] = useState([]);
  const [employeeID, setEmployeesID] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeInput, setEmployeeInput] = useState(initialInputEmployeeState);
  const [bonusAmount, setBonusAmount] = useState("");
  const [bonusName, setBonusName] = useState("");
  const [bonusDate, setBonusDate] = useState("");
  const [bonusReason, setBonusReason] = useState("");

  //salary detail
  const [salaryDetail, setSalaryDetail] = useState([]);
  const [salaryDetailData, setSalaryDetailData] = useState([]);

  const day = currentDateTime.getDate();
  const formattedDate = new Date().toISOString().split("T")[0];
  const handleChange = (value) => {};

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

  //modal sửa thưởng cá nhân
  const [isModalOpenEditRewardPersonal, setIsModalOpenEditRewardPersonal] =
    useState(false);
  const showModalEditRewardPersonal = () => {
    setIsModalOpenEditRewardPersonal(true);
  };
  const handleOkEditRewardPersonal = () => {
    setIsModalOpenEditRewardPersonal(false);
  };
  const handleCancelEditRewardPersonal = () => {
    setIsModalOpenEditRewardPersonal(false);
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

  //modal Chi tiết luong chinh
  const [isModalOpenSalary, setIsModalOpenSalary] = useState(false);
  const showModalSalary = () => {
    setIsModalOpenSalary(true);
  };
  const handleOkSalary = () => {
    setIsModalOpenSalary(false);
  };
  const handleCancelSalary = () => {
    setIsModalOpenSalary(false);
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

  //modal thuế tncn
  const [isModalOpenTax, setIsModalOpenTax] = useState(false);
  const showModalTax = () => {
    setIsModalOpenTax(true);
  };
  const handleOkTax = () => {
    setIsModalOpenTax(false);
  };
  const handleCancelTax = () => {
    setIsModalOpenTax(false);
  };

  //modal các khoản khác
  const [isModalOpenOther, setIsModalOpenOther] = useState(false);
  const showModalOther = () => {
    setIsModalOpenOther(true);
  };
  const handleOkOther = () => {
    setIsModalOpenOther(false);
  };
  const handleCancelOther = () => {
    setIsModalOpenOther(false);
  };

  //modal lương ứng
  const [isModalOpenAdvancesalary, setIsModalOpenAdvancesalary] =
    useState(false);
  const showModalAdvancesalary = () => {
    setIsModalOpenAdvancesalary(true);
  };
  const handleOkAdvancesalary = () => {
    setIsModalOpenAdvancesalary(false);
  };
  const handleCancelAdvancesalary = () => {
    setIsModalOpenAdvancesalary(false);
  };

  //modal Thưởng công ty
  const [isModalOpenRewardCompany, setIsModalOpenRewardCompany] =
    useState(false);
  const dataConver = months + "-" + date;
  const featchDataReward = () => {
    toast.promise(
      new Promise((resolve) => {
        fetchAllReward(dataConver)
          .then((data) => {
            setReward(data);
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
  //modal Thưởng cá nhân
  const [isModalOpenRewardPersonal, setIsModalOpenRewardPersonal] =
    useState(false);
  const showModalRewardPersonal = () => {
    setIsModalOpenRewardPersonal(true);
  };
  const [ActionEdit, setActionEdit] = useState("");
  const showModalRewardPersonalEdit = (id, name, Amount, employeeId, beneficiary, bonusDatestring) => {
    setActionEdit("PersonEdit");
    setIsModalOpenRewardPersonal(true);
    setBonusName(name);
    setBonusAmount(Amount);
    setEmployeeInput({
      employeeStringID: employeeId,
      employeeName: beneficiary,
    }
    );
    setBonusReason("");
  };
  const resetPersonDetail = () => {
    setBonusAmount("");
    setBonusReason("");
    setEmployeesID("");
    setBonusName("");
    setEmployeeName("");
    setEmployeeInput(initialInputEmployeeState);
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

  //modal hiển thị tất cả danh sách lương thực nhận
  const [isModalOpenSalaryReceived, setIsModalOpenSalaryReceived] =
    useState(false);
  const showModalSalaryReceived = () => {
    setIsModalOpenSalaryReceived(true);
  };
  const handleOkSalaryReceived = () => {
    setIsModalOpenSalaryReceived(false);
  };
  const handleCancelSalaryReceived = () => {
    setIsModalOpenSalaryReceived(false);
  };
  //hiển thị mainsalary
  const [isModalOpenMainSalary, setIsModalOpenMainSalary] = useState(false);
  const showModalMainSalary = () => {
    setIsModalOpenMainSalary(true);
  };
  const handleOkMainSalary = () => {
    setIsModalOpenMainSalary(false);
  };
  const handleCancelMainSalary = () => {
    setIsModalOpenMainSalary(false);
  };

  const [isModalOpenHoliday, setIsModalOpenHoliday] = useState(false);
  const showModalHoliday = () => {
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

  //featchData SalaryDetail
  const fetDataSalaryDetail = () => {
    let isDataLoaded = false;
    let toastId = null;
    fetchAllSalaryDetail(months, date)
      .then((data) => {
        isDataLoaded = true;
        setSalaryDetail(data);
        setSalaryDetailData(data);
        if (toastId) {
          toast.dismiss(toastId); // Hủy thông báo nếu nó đã được hiển thị
        }
      })
      .catch((error) => {
        isDataLoaded = true;
        if (toastId) {
          toast.dismiss(toastId); // Hủy thông báo nếu nó đã được hiển thị
        }
        toast.error("Lỗi không có nhân viên"); // Hiển thị thông báo lỗi ngay lập tức
      });
    setTimeout(() => {
      if (!isDataLoaded) {
        toastId = toast("Đang xử lý...", { autoClose: false }); // Hiển thị thông báo pending sau 1.5s nếu dữ liệu chưa được tải
      }
    }, 1500);
  };

  useEffect(() => {
    fetDataSalaryDetail();
  }, [date, months]);

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    setIText(searchText);
    const filteredData = salaryDetailData.filter((detail) =>
      detail.fullName.toLowerCase().includes(searchText.toLowerCase())
    );
    setSalaryDetail(filteredData);
  };
  console.log("sal", salaryDetail);

  return (
    <>
      <div className="col-right-container fix-css-payroll">
        <div className="list-container-header">
          <div className="list-text-header fix-css-head-payroll">
            <h2>Lương | Thưởng</h2>
            <span>Chi tiết lương từng tháng</span>
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
          handleSearchChange={handleSearchChange}
          salaryDetail={handleSearchChange}
        />
        <ListTable
          salaryDetail={salaryDetail}
          showModalSubsidies={showModalSubsidies}
          showModalReward={showModalReward}
          fetchEmployeeAllowanceDetail={fetchEmployeeAllowanceDetail}
          fetchEmployeeDeductionDetail={fetchEmployeeDeductionDetail}
          fetchEmployeeActualSalaryDetail={fetchEmployeeActualSalaryDetail}
          showModalAllowanceAll={showModalAllowanceAll}
          showModalDeductions={showModalDeductions}
          showModalSalaryReceived={showModalSalaryReceived}
          showModalMainSalary={showModalMainSalary}
          showModalSalary={showModalSalary}
          showModalTax={showModalTax}
          showModalAdvancesalary={showModalAdvancesalary}
          showModalOther={showModalOther}
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
          showModalRewardPersonalEdit={showModalRewardPersonalEdit}
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
          employeeID={employeeID}
          bonusAmount={bonusAmount}
          bonusReason={bonusReason}
          bonusName={bonusName}
          employeeInput={employeeInput}
          handleBonusAmountChange={handleBonusAmountChange}
          setBonusName={setBonusName}
          setBonusReason={setBonusReason}
          setEmployeeInput={setEmployeeInput}
          resetPersonDetail={resetPersonDetail}
          featchDataReward={featchDataReward}
          setIsModalOpenRewardPersonal={setIsModalOpenRewardPersonal}
          validateData={validateData}
          showModalRewardPersonalEdit={showModalRewardPersonalEdit}
        />
        <Holiday
          isModalOpenHoliday={isModalOpenHoliday}
          handleChange={handleChange}
          employeeID={employeeID}
          bonusAmount={bonusAmount}
          bonusReason={bonusReason}
          bonusName={bonusName}
          handleBonusAmountChange={handleBonusAmountChange}
          setBonusName={setBonusName}
          setBonusReason={setBonusReason}
          resetPersonDetail={resetPersonDetail}
          featchDataReward={featchDataReward}
          setIsModalOpenHoliday={setIsModalOpenHoliday}
          validateData={validateData}
          employeeInput={employeeInput}
          setEmployeeInput={setEmployeeInput}
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
        <AllowanceAll
          isModalOpenAllowanceAll={isModalOpenAllowanceAll}
          handleOkAllowanceAll={handleCancelAllowanceAll}
          handleCancelAllowanceAll={handleCancelAllowanceAll}
          salaryDetail={salaryDetail}
        />
        {/* Modal hiển thị tất cả danh sách các khoản trừ */}
        <DeductionsAll
          isModalOpenDeductions={isModalOpenDeductions}
          handleOkDeductions={handleOkDeductions}
          handleCancelDeductions={handleCancelDeductions}
          salaryDetail={salaryDetail}
        />
        {/* Modal hiển thị tất cả danh sách lương thực nhận */}
        <SalaryReceived
          isModalOpenSalaryReceived={isModalOpenSalaryReceived}
          handleOkSalaryReceived={handleOkSalaryReceived}
          handleCancelSalaryReceived={handleCancelSalaryReceived}
          salaryDetail={salaryDetail}
        />
        {/* Modal hiển thị tất cả danh sách lương chinh */}
        <salaryDetailS
          isModalOpenMainSalary={isModalOpenMainSalary}
          handleOkMainSalary={handleOkMainSalary}
          handleCancelMainSalary={handleCancelMainSalary}
          salaryDetail={salaryDetail}
        />
        {/*modal hien thi tat ca luong chinh */}
        <Salary
          isModalOpenSalary={isModalOpenSalary}
          handleOkSalary={handleOkSalary}
          handleCancelSalary={handleCancelSalary}
          salaryDetail={salaryDetail}
        />
        {/* modal thuế tncn */}
        <Tax
          isModalOpenTax={isModalOpenTax}
          handleOkTax={handleOkTax}
          handleCancelTax={handleCancelTax}
          salaryDetail={salaryDetail}
        />
        {/* modal Các khoản phúc lợi khác */}
        <Other
          isModalOpenOther={isModalOpenOther}
          handleOkOther={handleOkOther}
          handleCancelOther={handleCancelOther}
          salaryDetail={salaryDetail}
        />
        {/* modal lương ứng */}
        <Advancesalary
          isModalOpenAdvancesalary={isModalOpenAdvancesalary}
          handleOkAdvancesalary={handleOkAdvancesalary}
          handleCancelAdvancesalary={handleCancelAdvancesalary}
          salaryDetail={salaryDetail}
        />
      </div>
    </>
  );
};
export default PayrollComponent;
