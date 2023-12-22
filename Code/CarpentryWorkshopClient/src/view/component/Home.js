import React, { useState, useEffect } from "react";
import { Input, Select } from "antd";
import dayjs from "dayjs";

import { toast } from "react-toastify";
import { GetTimeKeepingInfo } from "../../sevices/HomeService";
import { GetDataCheckInOutByDateAndEmployeeId, UpdateCheckInOutForEmployee } from "../../sevices/TimekeepingService";
import { EditEmployee } from "./componentCheckIn-Out";
import "../scss/HomeComponent.scss";

import { getMonthsInYear, createYearOptions } from "../logicTime/getWeeDays";

import MenuResponsive from "./componentUI/MenuResponsive";
import ListUserHeader from "./componentUI/ListUserHeader";

const Home = () => {
  const [months, setMonths] = useState(new Date().getMonth() + 1);
  const monthOptions = getMonthsInYear(months);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const yearOptions = createYearOptions();
  const [employeeTimeKeepings, setEmployeeTimeKeepins] = useState("");
  const [employCheckInOut, setEmployCheckInOut] = useState([]);
  const [isModalOpenListEmployee, setIsModalOpenListEmployee] = useState(false);
  var actionEdit = false

  console.log("months", months);
  console.log("yearOptions", selectedYear);

  const getDaysInMonthArray = () => {
    // Get the number of days in the selected month and year
    const daysInMonth = new Date(
      selectedYear,
      monthOptions.findIndex((month) => month.value === months) + 1,
      0
    ).getDate();


    
    // Create an array of formatted dates in "DD/MM" format
    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = months < 10 ? `0${months}` : months;
      return `${formattedDay} / ${formattedMonth}`;
    });
  };
  const handleOkListEmployee = () => {
    setIsModalOpenListEmployee(false);
  };

  const FetchTimeKeepingInfo = () => {
    console.log('months',months);
    
    GetTimeKeepingInfo(months, selectedYear)
      .then((data) => {
        console.log("data",data);
        setEmployeeTimeKeepins(data);
      })
      .catch((error) => { });
  };

  const handleChangeYear = (newYear) => {
    setSelectedYear(newYear);
  };
  
  const handleCancelListEmployee = () => {
    resetEmployeeCheckInOut();
    setIsModalOpenListEmployee(false);
  };

  const resetEmployeeCheckInOut = () => {
    setEmployCheckInOut([]);
  };

  const convertTimeToInputFormat = (timeString) => {
    if (timeString) {
      const parts = timeString.split(":");

      if (parts.length >= 2 && parts.length <= 3) {
        const hours = parts[0];
        const minutes = parts[1];

        // If seconds are present, extract and remove fractional seconds
        const seconds = parts.length === 3 ? parts[2].split(".")[0] : "00";
        const parsedTime = dayjs(`${hours}:${minutes}:${seconds}`, "HH:mm");

        // Format the parsed time as desired
        const formattedTime = parsedTime.format("HH:mm");
        return `${hours}:${minutes}:${seconds}`;
      }

      return timeString;
    }

    return timeString;
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

  


  const showModalListEmployee = (id, date) => {
    toast.promise(
      GetDataCheckInOutByDateAndEmployeeId(id, date + "-" + selectedYear)
        .then((data) => {
          console.log('data11',data);
          
          setEmployCheckInOut(data);
          setIsModalOpenListEmployee(true);
          console.log("employCheck", data);
          return data;
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            throw toast.error(error.response.data);
          } else {
            throw toast.error(error.response.data);
          }
        }),
      {
        pending: "Đang xử lý",
      }
    );
  };

  useEffect(() => {
    FetchTimeKeepingInfo();
  }, [months, selectedYear]);

  return (
    <div className="col-right-container home-controller">
      <div className="list-container-header">
        <div className="list-text-header">
          <h2>Trang chủ</h2>
          <span>
            Hiển thị chi tiết số ngày đi làm của công nhân trong tháng
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
          <Select
            className="select-input"
            value={`Tháng ${months}`}
            style={{ width: 120 }}
            onChange={setMonths}
            options={monthOptions.map((month) => ({
              value: month.value,
              label: `Tháng ${month.label}`,
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
        <div className="list-note-home">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 6.5C12 3.18629 9.31371 0.5 6 0.5C2.68629 0.5 0 3.18629 0 6.5C0 9.81371 2.68629 12.5 6 12.5C9.31371 12.5 12 9.81371 12 6.5ZM9.2228 5.04956L8.52326 4.33496L4.8568 7.85109L3.69758 6.79197L3 7.50848L4.85884 9.24897L9.2228 5.04956Z"
                fill="#007C2E"
              />
            </svg>
            <p>: Có mặt</p>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.17802e-05 6.488C0.00627264 3.18591 2.6974 0.5 5.99948 0.5C9.31982 0.506261 12.0063 3.20313 12 6.51096C11.9932 9.81357 9.30156 12.5 6 12.5H5.98852C4.38574 12.4969 2.88001 11.8697 1.74888 10.7344C0.61775 9.59861 -0.00311865 8.09078 1.17802e-05 6.488ZM8.49999 4.7138L7.78571 3.99952L6 5.78552L4.21428 3.99952L3.5 4.7138L5.286 6.49952L3.5 8.28523L4.21428 8.99952L6 7.21352L7.78571 8.99952L8.49999 8.28523L6.71399 6.49952L8.49999 4.7138Z"
                fill="#C30000"
              />
            </svg>
            <p>: Vắng mặt</p>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 6.5C0 3.19113 2.69113 0.5 6 0.5C9.30835 0.5 12 3.19113 12 6.5C12 9.80887 9.30835 12.5 6 12.5C2.69113 12.5 0 9.80887 0 6.5ZM6 3C6.41421 3 6.75 3.33579 6.75 3.75C6.75 4.16421 6.41421 4.5 6 4.5C5.58579 4.5 5.25 4.16421 5.25 3.75C5.25 3.33579 5.58579 3 6 3ZM4.5 10V9H5.5V6.5H4.5V5.5H6.5V9H7.5V10H4.5Z"
                fill="#FF8F19"
              />
            </svg>
            <p>: Không đủ điều kiện</p>
          </div>
        </div>
      </div>
      <table className="table-home list-table">
        <thead>
          <tr>
            <th>MSNV</th>
            <th>Tên nhân viên</th>
            {getDaysInMonthArray().map((day) => (
              <th>
                <p key={day}>{day}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="scrollbar" id="style-15">
          {employeeTimeKeepings.length > 0 &&
            employeeTimeKeepings.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.employeeIdstring}</td>
                <td><div>{employee.employeeName}</div></td>
                {getDaysInMonthArray().map((day) => {
                  const dateInfo = employee.dateScreen.find(
                    (item) => item.date === day.replace(/\s\/\s/, "-")
                  );
                  console.log(day.replace(/\s\/\s/, "-"));
                  console.log(dateInfo);
                  console.log(dateInfo)
                  return (
                    <td key={day}>
                      {dateInfo ? (
                        dateInfo.status === "Yes" ? (
                          <i  onClick={() => {showModalListEmployee(employee.employeeId,dateInfo.date);
                          }}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="16"
                              viewBox="0 0 17 16"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16.356 8C16.356 3.58172 12.7742 0 8.35596 0C3.93768 0 0.355957 3.58172 0.355957 8C0.355957 12.4183 3.93768 16 8.35596 16C12.7742 16 16.356 12.4183 16.356 8ZM12.653 6.06689L11.7203 5.1141L6.83169 9.80226L5.28606 8.3901L4.35596 9.34545L6.83441 11.6661L12.653 6.06689Z"
                                fill="#007C2E"
                              />
                            </svg>
                          </i>
                        ) : dateInfo.status === "No" ? (
                          <i>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="16"
                              viewBox="0 0 17 16"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0.721191 8C0.721191 3.58817 4.30937 0 8.72119 0C13.1323 0 16.7212 3.58817 16.7212 8C16.7212 12.4118 13.1323 16 8.72119 16C4.30937 16 0.721191 12.4118 0.721191 8ZM8.72119 3.33333C9.27348 3.33333 9.72119 3.78105 9.72119 4.33333C9.72119 4.88562 9.27348 5.33333 8.72119 5.33333C8.16891 5.33333 7.72119 4.88562 7.72119 4.33333C7.72119 3.78105 8.16891 3.33333 8.72119 3.33333ZM6.72119 12.6667V11.3333H8.05452V8H6.72119V6.66667H9.38786V11.3333H10.7212V12.6667H6.72119Z"
                                fill="#FF8F19"
                              />
                            </svg>
                          </i>
                        ) : (
                          <i>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="16"
                              viewBox="0 0 17 16"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0.408219 7.98398C0.416567 3.58121 4.00473 0 8.40751 0C12.8346 0.00834781 16.4165 3.60417 16.4082 8.01459C16.3991 12.4181 12.8103 16 8.4082 16H8.3929C6.25586 15.9958 4.24821 15.1596 2.74004 13.6459C1.23187 12.1315 0.404045 10.121 0.408219 7.98398ZM11.7415 5.61904L10.7891 4.66666L8.40819 7.04799L6.02724 4.66666L5.07486 5.61904L7.45619 7.99999L5.07486 10.3809L6.02724 11.3333L8.40819 8.95198L10.7891 11.3333L11.7415 10.3809L9.36019 7.99999L11.7415 5.61904Z"
                                fill="#C30000"
                              />
                            </svg>
                          </i>
                        )
                      ) : (
                        <i>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0.408219 7.98398C0.416567 3.58121 4.00473 0 8.40751 0C12.8346 0.00834781 16.4165 3.60417 16.4082 8.01459C16.3991 12.4181 12.8103 16 8.4082 16H8.3929C6.25586 15.9958 4.24821 15.1596 2.74004 13.6459C1.23187 12.1315 0.404045 10.121 0.408219 7.98398ZM11.7415 5.61904L10.7891 4.66666L8.40819 7.04799L6.02724 4.66666L5.07486 5.61904L7.45619 7.99999L5.07486 10.3809L6.02724 11.3333L8.40819 8.95198L10.7891 11.3333L11.7415 10.3809L9.36019 7.99999L11.7415 5.61904Z"
                              fill="#C30000"
                            />
                          </svg>
                        </i>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
      <EditEmployee
          isModalOpenListEmployee={isModalOpenListEmployee}
          handleCancelListEmployee={handleCancelListEmployee}
          employCheckInOut={employCheckInOut}
          convertDobToISO={convertDobToISO}
          convertTimeToInputFormat={convertTimeToInputFormat}
          handleOkListEmployee={handleOkListEmployee}
          UpdateCheckInOutForEmployee={UpdateCheckInOutForEmployee}
          showModalListEmployee={showModalListEmployee}
          actionEdit={actionEdit}
        />
    </div>
  );
};
export default Home;
