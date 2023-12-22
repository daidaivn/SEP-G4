import "../scss/reset.scss";
import "../scss/index.scss";
import "../scss/fonts.scss";
import "../scss/HolidayComponent.scss";
import "../scss/responsive/Holiday.scss";
import "../scss/responsive/responsive.scss";
import { Input, Modal, Select } from "antd";
import ListUserHeader from "./componentUI/ListUserHeader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  GetAllHolidays,
  CreateHolidayDetail,
  GetHolidays,
  UpdateHolidayDetail,
  DeleteHolidayDetail,
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
    endDate: "",
  };
  
  const [inputHolidays, setInputHolidays] = useState(initialInputHolidaysState);

  let department = JSON.parse(localStorage.getItem("department")) || [];
  if (!department.length) {
    department = JSON.parse(sessionStorage.getItem("department")) || [];
  }

  const isHumanResourcesDepartment = department.includes("Phòng nhân sự");

  console.log("department", department);

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
        setInputHolidays({
          Idholiday: data.holidayID || "chưa có",
          nameHoliday: data.holidayName || "chưa có tên",
          startDate: data.startDate,
          endDate: data.endDate,
        });
      })
      .catch((error) => {});
  };

  const handleCreateHolidayDetail = () => {
    toast.promise(
      CreateHolidayDetail(inputHolidays)
        .then((data) => {
          FetchAllHolidays();
          handleCancelHoliday();
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

  console.log("inputHolidays", inputHolidays);

  const handleUpdateHolidayDetail = () => {
    toast.promise(
      UpdateHolidayDetail(inputHolidays)
        .then((data) => {
          FetchAllHolidays();
          handleCancelHoliday();
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
      .catch((error) => {});
  };

  const DeleteHoliday = (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa ngày nghỉ này");
    if (!isConfirmed) {
      return;
    }
    toast.promise(
      DeleteHoliday(id)
        .then((data) => {
          FetchAllHolidays();
          return toast.success(data);
        })
        .catch((error) => {
          throw toast.error(error.response.data);
        }),
      {
        pending: "Đang tải dữ liệu",
      }
    );
  }
  useEffect(() => {
    FetchAllHolidays();
  }, [inputSearch, months, selectedYear]);

  return (
    <>
      <div className="col-right-container">
        <div className="list-container-header">
          <div className="list-text-header">
            <h2>
              {isHumanResourcesDepartment ? "Quản lý nghỉ lễ" : "Lịch nghỉ lễ"}
            </h2>
            <span>Lưu thông tin các ngày nghỉ lễ của công ty</span>
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
          {department.includes("Phòng nhân sự") && (
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
          )}
        </div>
        <table className="list-table">
          <thead>
            <tr>
              <td>STT</td>
              <td>Tên ngày nghỉ</td>
              <td>Ngày bắt đầu nghỉ</td>
              <td>Số ngày nghỉ</td>
              {department.includes("Phòng nhân sự") && <td>Chỉnh sửa</td>}
            </tr>
          </thead>
          <tbody className="scrollbar" id="style-15">
            {fetchAllHolidays.map((holiday, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{holiday.holidayName}</td>
                <td>{holiday.date}</td>
                <td>{holiday.numberOfHoliday} ngày</td>
                {department.includes("Phòng nhân sự") && (
                  <td>
                    <p
                      onClick={() => {
                        FetchHolidays(holiday.holidayID);
                        setAction("edit");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="31"
                        height="30"
                        viewBox="0 0 31 30"
                        fill="none"
                      >
                        <path
                          d="M21.6001 0H9.6001C3.6001 0 0.600098 3 0.600098 9V28.5C0.600098 29.325 1.2751 30 2.1001 30H21.6001C27.6001 30 30.6001 27 30.6001 21V9C30.6001 3 27.6001 0 21.6001 0ZM14.2651 21.99C13.8901 22.365 13.2001 22.71 12.6901 22.785L9.5701 23.22C9.4501 23.235 9.3301 23.25 9.2251 23.25C8.7001 23.25 8.2201 23.07 7.8751 22.725C7.4551 22.305 7.2751 21.69 7.3801 21.03L7.8151 17.91C7.8901 17.4 8.2351 16.695 8.6101 16.335L14.2651 10.68C14.3551 10.95 14.4751 11.22 14.6101 11.52C14.7451 11.79 14.8801 12.06 15.0301 12.315C15.1501 12.525 15.2851 12.735 15.4051 12.885C15.5551 13.11 15.7051 13.305 15.8101 13.41C15.8701 13.5 15.9301 13.56 15.9451 13.59C16.2751 13.965 16.6201 14.325 16.9501 14.595C17.0401 14.685 17.1001 14.73 17.1151 14.745C17.3101 14.895 17.4901 15.06 17.6701 15.165C17.8651 15.315 18.0751 15.45 18.2851 15.57C18.5401 15.72 18.8101 15.87 19.0951 16.005C19.3801 16.14 19.6501 16.245 19.9201 16.335L14.2651 21.99ZM22.4251 13.845L21.2551 15.015C21.1801 15.09 21.0751 15.135 20.9701 15.135C20.9401 15.135 20.8801 15.135 20.8501 15.12C18.2701 14.385 16.2151 12.33 15.4801 9.75C15.4351 9.615 15.4801 9.465 15.5851 9.36L16.7701 8.175C18.7051 6.24 20.5351 6.285 22.4251 8.175C23.3851 9.135 23.8651 10.065 23.8501 11.025C23.8501 11.97 23.3851 12.885 22.4251 13.845Z"
                          fill="#FF8F19"
                        />
                      </svg>
                    </p>
                    <p
                      onClick={() => {
                        FetchHolidays(holiday.holidayID);
                        setAction("edit");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="31"
                        height="30"
                        viewBox="0 0 31 30"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.75 6.25V5C8.75 2.92893 10.4289 1.25 12.5 1.25H17.5C19.5711 1.25 21.25 2.92893 21.25 5V6.25H27.5V8.75H24.9194L23.9028 23.9994C23.7715 25.9693 22.1353 27.5 20.1611 27.5H9.83885C7.86461 27.5 6.22849 25.9693 6.09716 23.9994L5.08053 8.75H2.5V6.25H8.75ZM11.25 5C11.25 4.30964 11.8096 3.75 12.5 3.75H17.5C18.1904 3.75 18.75 4.30964 18.75 5V6.25H11.25V5ZM11.25 11.25V22.5H13.75V11.25H11.25ZM16.25 11.25V22.5H18.75V11.25H16.25Z"
                          fill="#FC1E1E"
                        />
                      </svg>
                    </p>
                  </td>
                )}
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
                <p>Tên ngày nghỉ lễ</p>
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
                <div className="btn cancel" onClick={handleCancelHoliday}>
                  Hủy bỏ
                </div>
                <div
                  className="btn save"
                  onClick={
                    action === "add"
                      ? handleCreateHolidayDetail
                      : handleUpdateHolidayDetail
                  }
                >
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
