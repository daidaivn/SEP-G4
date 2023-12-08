import "../scss/reset.scss";
import "../scss/index.scss";
import "../scss/fonts.scss";
import "../scss/HolidayComponent.scss";
import "../scss/responsive/Holiday.scss";
import "../scss/responsive/responsive.scss";
import { Input, Modal, Select } from "antd";
import ListUserHeader from "./componentUI/ListUserHeader";
import { useEffect, useState } from "react";
import {
  GetAllHolidays,
  CreateHolidayDetail,
  GetHolidays,
} from "../../sevices/HolidayService";
import {
  createYearOptions,
  getWeekRange,
  getMonthsInYear,
} from "../logicTime/getWeeDays";
import { da } from "date-fns/locale";
const HolidayComponent = () => {
  //modal tạo lịch nghỉ lễ
  const [isModalOpenHoliday, setIsModalOpenHoliday] = useState(false);
  const [action, setAction] = useState("");

  const handleOkHoliday = () => {
    setIsModalOpenHoliday(false);
  };
  const handleCancelHoliday = () => {
    setIsModalOpenHoliday(false);
  };
  const yearOptions = createYearOptions();

  const [months, setMonths] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const monthOptions = getMonthsInYear(months);
  monthOptions.unshift({ value: null, label: "Tất cả" });
  const [fetchAllHolidays, setfetchAllHolidays] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const initialInputHolidaysState = {
    Idholiday: "",
    nameHoliday: "",
    startDate: "",
    endDate: ""
  };

  const [inputHolidays, setInputHolidays] = useState(initialInputHolidaysState);

  console.log("inputHolidays", inputHolidays);

  console.log("months", months);
  console.log("selectedYear", selectedYear);

  const handleChangeYear = (newYear) => {
    setSelectedYear(newYear);
  };

  const showModalHoliday = () => {
    setInputHolidays(initialInputHolidaysState);
    setIsModalOpenHoliday(true);
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

  const FetchHolidays = (id) => {
    setIsModalOpenHoliday(true);
    GetHolidays(id)
      .then((data) => { 
        console.log('data',data);
        setInputHolidays({
          Idholiday: data.holidayID || "chưa có",
          nameHoliday: data.holidayName || "chưa có tên" ,
          startDate: data.startDate,
          endDate: data.endDate,
        })
      })
      .catch((error) => {
        console.log("error", error);
        
      });
  };

  const handleCreateHolidayDetail = () => {
    CreateHolidayDetail(inputHolidays)
      .then((data) => {
        console.log("data", data);
        handleCancelHoliday();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleStartDateChange = (e) => {
    setInputHolidays({
      ...inputHolidays,
      startDate: convertDobToISO(e.target.value), // Chuyển đổi ngày tháng sang ISO format và cập nhật giá trị startDate
    });
  };

  const handleEndDateChange = (e) => {
    setInputHolidays({
      ...inputHolidays,
      endDate: convertDobToISO(e.target.value), // Chuyển đổi ngày tháng sang ISO format và cập nhật giá trị endDate
    });
  };

  const FetchAllHolidays = () => {
    GetAllHolidays(inputSearch, months, selectedYear)
      .then((data) => {
        setfetchAllHolidays(data);
        
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    FetchAllHolidays();
  }, [inputSearch, months, selectedYear]);

  console.log("fetchAllHolidays", fetchAllHolidays);

  return (
    <>
      <div className="col-right-container">
        <div className="list-container-header">
          <div className="list-text-header">
            <h2>Quản lý nghỉ lễ</h2>
            <span>
              Lưu thông tin bắt đầu làm việc và ngưng làm việc củ một nhóm
            </span>
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
            <Input
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              placeholder="Tìm kiếm"
            ></Input>
          </div>
          <div className="list-filter">
            <Select
              className="select-input"
              value={months ? `Tháng ${months}` : "Tất cả"}
              style={{ width: 120 }}
              onChange={setMonths}
              options={monthOptions.map((month) => ({
                value: month.value,
                label: month.value ? `Tháng ${month.label}` : "Tất cả",
              }))}
              placeholder="Chọn tháng"
            />
          </div>
          <div className="list-filter year">
            <Select
              className="select-input"
              value={selectedYear}
              style={{ width: 120 }}
              onChange={handleChangeYear}
              options={yearOptions}
              placeholder="Chọn năm"
            />
          </div>
          <div
            className="ListWork"
            onClick={() => {
              showModalHoliday();
              setAction("add");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="37"
              viewBox="0 0 36 37"
              fill="none"
            >
              <path
                d="M30.7505 25.625H27.3755V22.25C27.3755 21.635 26.8655 21.125 26.2505 21.125C25.6355 21.125 25.1255 21.635 25.1255 22.25V25.625H21.7505C21.1355 25.625 20.6255 26.135 20.6255 26.75C20.6255 27.365 21.1355 27.875 21.7505 27.875H25.1255V31.25C25.1255 31.865 25.6355 32.375 26.2505 32.375C26.8655 32.375 27.3755 31.865 27.3755 31.25V27.875H30.7505C31.3655 27.875 31.8755 27.365 31.8755 26.75C31.8755 26.135 31.3655 25.625 30.7505 25.625Z"
                fill="white"
              />
              <path
                opacity="0.4"
                d="M33 13.28V6.47C33 4.355 32.04 3.5 29.655 3.5H23.595C21.21 3.5 20.25 4.355 20.25 6.47V13.265C20.25 15.395 21.21 16.235 23.595 16.235H29.655C32.04 16.25 33 15.395 33 13.28Z"
                fill="white"
              />
              <path
                d="M15.7495 13.28V6.47C15.7495 4.355 14.7895 3.5 12.4045 3.5H6.34451C3.95951 3.5 2.99951 4.355 2.99951 6.47V13.265C2.99951 15.395 3.95951 16.235 6.34451 16.235H12.4045C14.7895 16.25 15.7495 15.395 15.7495 13.28Z"
                fill="white"
              />
              <path
                opacity="0.4"
                d="M15.7495 30.155V24.095C15.7495 21.71 14.7895 20.75 12.4045 20.75H6.34451C3.95951 20.75 2.99951 21.71 2.99951 24.095V30.155C2.99951 32.54 3.95951 33.5 6.34451 33.5H12.4045C14.7895 33.5 15.7495 32.54 15.7495 30.155Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <table className="list-table">
          <thead>
            <tr>
              <td>STT</td>
              <td>Tên ngày nghỉ</td>
              <td>Ngày bắt đầu nghỉ</td>
              <td>Số ngày nghỉ</td>
              <td>Chỉnh sửa</td>
            </tr>
          </thead>
          <tbody>
            {fetchAllHolidays.map((holiday, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{holiday.holidayName}</td>
                <td>{holiday.date}</td>
                <td>{holiday.numberOfHoliday} ngày</td>
                <td>
                  <p
                    onClick={() => {
                      FetchHolidays(holiday.holidayID);
                      setAction("edit");
                    }}
                  >
                    Chỉnh sửa
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* modal tạo lịch nghỉ lễ */}
        <Modal
          className="modal"
          open={isModalOpenHoliday}
          onOk={handleOkHoliday}
          onCancel={handleCancelHoliday}
        >
          <div className="modal-add-holiday">
            <div className="body">
              <div className="head">
                {action === "add" ? (
                  <h3>Thêm ngày nghỉ lễ</h3>
                ) : (
                  <h3>Sửa ngày nghỉ lễ</h3>
                )}
              </div>
            </div>
            <div className="footer">
              <div className="item-body">
                <p>Ngày nghỉ lễ</p>
                <input
                  type="text"
                  name="nameHoliday"
                  value={inputHolidays.nameHoliday}
                  onChange={(e) =>
                    setInputHolidays({
                      ...inputHolidays,
                      nameHoliday: e.target.value,
                    })
                  }
                />
              </div>
              <div className="item-body">
                <p>Ngày bắt đầu kỳ nghỉ</p>
                <input
                  type="date"
                  name="endDate"
                  value={convertDobToISO(inputHolidays.startDate)}
                  onChange={handleStartDateChange}
                />
              </div>
              <div className="item-body">
                <p>Ngày kết thúc kỳ nghỉ</p>
                <input
                  type="date"
                  name="endDate"
                  value={convertDobToISO(inputHolidays.endDate)}
                  onChange={handleEndDateChange}
                />
              </div>
              <div className="btn-footer">
                <div className="btn cancel" onClick={handleCancelHoliday}>Hủy bỏ</div>
                <div className="btn save" onClick={handleCreateHolidayDetail}>
                  Lưu
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default HolidayComponent;
