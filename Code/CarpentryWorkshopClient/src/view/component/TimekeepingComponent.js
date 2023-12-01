import { Input, Modal, Select } from "antd";
import React, { useState, useEffect, useMemo } from "react";

import { toast } from "react-toastify";
import dayjs from "dayjs";
import "../scss/TimekeepingComponent.scss";
import "../scss/fonts.scss";
import "../scss/index.scss";
import ListUserHeader from "./componentUI/ListUserHeader";
import MenuResponsive from "./componentUI/MenuResponsive";
import "../scss/DepartmentComponent.scss";
import { EditEmployee } from "./componentCheckIn-Out";
import {
  fetchAllCheckInOut,
  addAllCheckInOut,
  fetchAllDataWorks,
  updateDataWorks,
  GetDataCheckInOutByDateAndEmployeeId,
  UpdateCheckInOutForEmployee,
} from "../../sevices/TimekeepingService";
import { el } from "date-fns/locale";
const TimekeepingComponent = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const [checksInOut, setChecksInOut] = useState([]);
  const [work, setWork] = useState([]);
  const [number, setNumber] = useState(null);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [employCheckInOut, setEmployCheckInOut] = useState([]);
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const userEmployeeID =
    localStorage.getItem("userEmployeeID") ||
    sessionStorage.getItem("userEmployeeID");

  const [isModalOpenListEmployee, setIsModalOpenListEmployee] = useState(false);
  const showModalListEmployee = (id, date1) => {
    setDate(date1);
    setEmployeeId(id);
    toast.promise(
      GetDataCheckInOutByDateAndEmployeeId(id, date1)
        .then((data) => {
          setEmployCheckInOut(data);
          fetchData();
          setIsModalOpenListEmployee(true);
          console.log("employ", data);
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
        success: "Thanh cong",
      }
    );
  };
  const handleOkListEmployee = () => {
    setIsModalOpenListEmployee(false);
  };
  const handleCancelListEmployee = () => {
    setIsModalOpenListEmployee(false);
  };

  const handleCheckInOut = (employeeID, action) => {
    console.log("employeeID", employeeID);
    const actionText = action === "start" ? "Bắt đầu" : "Ngưng";
    const successText =
      action === "start"
        ? "Bắt đầu tính thời gian làm việc"
        : "Ngưng tính thời gian làm việc";

    toast.promise(
      new Promise((resolve) => {
        addAllCheckInOut(employeeID)
          .then((data) => {
            resolve(data);
            fetchData();
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        success: successText,
        error: `Lỗi ${actionText} làm việc`,
      }
    );
  };
  //Convert number
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
  dayjs.locale("vn");
  //Convert time
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

  //validate data number
  const validateData = () => {
    const errors = [];
    if (!number || isNaN(number)) {
      errors.push("Please enter a valid number");
    }
    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.warning(error);
      });
      return false;
    }
    return true;
  };
  // Sử dụng hàm handleCheckInOut để bắt đầu hoặc kết thúc
  const handleCheckStart = (employeeID) => {
    handleCheckInOut(employeeID, "start");
  };

  const handleCheckEnd = (employeeID) => {
    handleCheckInOut(employeeID, "end");
  };

  const fetchData = () => {
    let isDataReceived = false;
    const fetchDataPromise = new Promise((resolve) => {
      fetchAllCheckInOut(userEmployeeID)
        .then((data) => {
          setChecksInOut(data);
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
          error: "Lỗi tải dữ liệu",
        });
      }
    }, 1000);
  };
  console.log("userEmployeeID:", userEmployeeID);

  useEffect(() => {
    // Ban đầu, gọi hàm tải dữ liệu
    fetchData();
    fetchDataWorkPerDay();
  }, []);

  // Modal Chi tiết công việc trong ngày
  const [isModalOpenDetailShift, setIsModalOpenDetailShift] = useState(false);
  const showModalDetailShift = () => {
    setIsModalOpenDetailShift(true);
  };
  const handleOkDetailShift = () => {
    setIsModalOpenDetailShift(false);
  };
  const handleCancelDetailShift = () => {
    setIsModalOpenDetailShift(false);
  };
  //Load data for work day
  const fetchDataWorkPerDay = () => {
    toast.promise(
      new Promise((resolve) => {
        fetchAllDataWorks(userEmployeeID)
          .then((data) => {
            setWork(data);

            resolve(data);
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
  console.log("data:", work);
  //Thay doi trang thai công việc trong ngày

  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    const check = validateData();
    if (!check) {
      return;
    }
    toast.promise(
      new Promise((resolve) => {
        updateDataWorks(work.teamWorkId, number)
          .then((data) => {
            resolve(data);
            fetchDataWorkPerDay();
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        success: "Update success",
        error: "Lỗi",
      }
    );

    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  return (
    <>
      <div className="col-right-container">
        <div className="list-container-header">
          <div className="list-text-header">
            <h2>Công việc và Điểm danh</h2>
            <span>Quản lý công việc nhóm và điểm danh hàng ngày</span>
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
            <i className="list-filter-icon1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M14.3201 19.07C14.3201 19.68 13.92 20.48 13.41 20.79L12.0001 21.7C10.6901 22.51 8.87006 21.6 8.87006 19.98V14.63C8.87006 13.92 8.47006 13.01 8.06006 12.51L4.22003 8.47C3.71003 7.96 3.31006 7.06001 3.31006 6.45001V4.13C3.31006 2.92 4.22008 2.01001 5.33008 2.01001H18.67C19.78 2.01001 20.6901 2.92 20.6901 4.03V6.25C20.6901 7.06 20.1801 8.07001 19.6801 8.57001"
                  stroke="#3A5A40"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.07 16.5201C17.8373 16.5201 19.27 15.0874 19.27 13.3201C19.27 11.5528 17.8373 10.1201 16.07 10.1201C14.3027 10.1201 12.87 11.5528 12.87 13.3201C12.87 15.0874 14.3027 16.5201 16.07 16.5201Z"
                  stroke="#3A5A40"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.87 17.1201L18.87 16.1201"
                  stroke="#3A5A40"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </i>
            <Select
              className="select-input"
              defaultValue="Trạng thái: bật"
              style={{
                width: 120,
              }}
              options={[
                {
                  value: true,
                  label: "Trạng thái: bật",
                },
                {
                  value: false,
                  label: "Trạng thái: tắt",
                },
              ]}
            />
          </div>
          <div className="ListWork">
            <svg
              onClick={showModalDetailShift}
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="37"
              viewBox="0 0 36 37"
              fill="none"
            >
              <path
                d="M0 7.25C0 4.76797 1.79375 2.75 4 2.75H32C34.2062 2.75 36 4.76797 36 7.25V29.75C36 32.232 34.2062 34.25 32 34.25H4C1.79375 34.25 0 32.232 0 29.75V7.25ZM8 20.75C8.53043 20.75 9.03914 20.5129 9.41421 20.091C9.78929 19.669 10 19.0967 10 18.5C10 17.9033 9.78929 17.331 9.41421 16.909C9.03914 16.4871 8.53043 16.25 8 16.25C7.46957 16.25 6.96086 16.4871 6.58579 16.909C6.21071 17.331 6 17.9033 6 18.5C6 19.0967 6.21071 19.669 6.58579 20.091C6.96086 20.5129 7.46957 20.75 8 20.75ZM10 11.75C10 11.1533 9.78929 10.581 9.41421 10.159C9.03914 9.73705 8.53043 9.5 8 9.5C7.46957 9.5 6.96086 9.73705 6.58579 10.159C6.21071 10.581 6 11.1533 6 11.75C6 12.3467 6.21071 12.919 6.58579 13.341C6.96086 13.7629 7.46957 14 8 14C8.53043 14 9.03914 13.7629 9.41421 13.341C9.78929 12.919 10 12.3467 10 11.75ZM8 27.5C8.53043 27.5 9.03914 27.2629 9.41421 26.841C9.78929 26.419 10 25.8467 10 25.25C10 24.6533 9.78929 24.081 9.41421 23.659C9.03914 23.2371 8.53043 23 8 23C7.46957 23 6.96086 23.2371 6.58579 23.659C6.21071 24.081 6 24.6533 6 25.25C6 25.8467 6.21071 26.419 6.58579 26.841C6.96086 27.2629 7.46957 27.5 8 27.5ZM14 10.0625C13.1687 10.0625 12.5 10.8148 12.5 11.75C12.5 12.6852 13.1687 13.4375 14 13.4375H28C28.8312 13.4375 29.5 12.6852 29.5 11.75C29.5 10.8148 28.8312 10.0625 28 10.0625H14ZM14 16.8125C13.1687 16.8125 12.5 17.5648 12.5 18.5C12.5 19.4352 13.1687 20.1875 14 20.1875H28C28.8312 20.1875 29.5 19.4352 29.5 18.5C29.5 17.5648 28.8312 16.8125 28 16.8125H14ZM14 23.5625C13.1687 23.5625 12.5 24.3148 12.5 25.25C12.5 26.1852 13.1687 26.9375 14 26.9375H28C28.8312 26.9375 29.5 26.1852 29.5 25.25C29.5 24.3148 28.8312 23.5625 28 23.5625H14Z"
                fill="white"
              />
            </svg>
          </div>
          <i className="icon-responsive icon-filter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M7.15979 9.53513C7.15979 9.84013 6.95977 10.2401 6.70477 10.3951L5.99979 10.8501C5.34479 11.2551 4.43478 10.8001 4.43478 9.99013V7.31512C4.43478 6.96012 4.23479 6.50513 4.02979 6.25513L2.10977 4.23512C1.85477 3.98012 1.65479 3.53013 1.65479 3.22513V2.06512C1.65479 1.46012 2.10979 1.00513 2.66479 1.00513H9.33478C9.88978 1.00513 10.3448 1.46012 10.3448 2.01512V3.12512C10.3448 3.53012 10.0898 4.03513 9.83978 4.28513"
                stroke="white"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.03506 8.26006C8.91872 8.26006 9.63507 7.54372 9.63507 6.66006C9.63507 5.77641 8.91872 5.06006 8.03506 5.06006C7.15141 5.06006 6.43506 5.77641 6.43506 6.66006C6.43506 7.54372 7.15141 8.26006 8.03506 8.26006Z"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.93506 8.56006L9.43506 8.06006"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </i>
          <i className="icon-responsive icon-filter icon-add">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <path
                d="M8.48719 6.94879H7.56411V6.02571C7.56411 5.8575 7.42462 5.71802 7.25642 5.71802C7.08821 5.71802 6.94873 5.8575 6.94873 6.02571V6.94879H6.02565C5.85744 6.94879 5.71796 7.08827 5.71796 7.25648C5.71796 7.42468 5.85744 7.56417 6.02565 7.56417H6.94873V8.48725C6.94873 8.65545 7.08821 8.79494 7.25642 8.79494C7.42462 8.79494 7.56411 8.65545 7.56411 8.48725V7.56417H8.48719C8.65539 7.56417 8.79488 7.42468 8.79488 7.25648C8.79488 7.08827 8.65539 6.94879 8.48719 6.94879Z"
                fill="white"
              />
              <path
                opacity="0.4"
                d="M9.10254 3.57233V1.70977C9.10254 1.13131 8.83997 0.897461 8.18766 0.897461H6.53023C5.87792 0.897461 5.61536 1.13131 5.61536 1.70977V3.56823C5.61536 4.15079 5.87792 4.38054 6.53023 4.38054H8.18766C8.83997 4.38464 9.10254 4.15079 9.10254 3.57233Z"
                fill="white"
              />
              <path
                d="M4.38458 3.57233V1.70977C4.38458 1.13131 4.12202 0.897461 3.46971 0.897461H1.81227C1.15996 0.897461 0.8974 1.13131 0.8974 1.70977V3.56823C0.8974 4.15079 1.15996 4.38054 1.81227 4.38054H3.46971C4.12202 4.38464 4.38458 4.15079 4.38458 3.57233Z"
                fill="white"
              />
              <path
                opacity="0.4"
                d="M4.38458 8.18779V6.53035C4.38458 5.87804 4.12202 5.61548 3.46971 5.61548H1.81227C1.15996 5.61548 0.8974 5.87804 0.8974 6.53035V8.18779C0.8974 8.84009 1.15996 9.10266 1.81227 9.10266H3.46971C4.12202 9.10266 4.38458 8.84009 4.38458 8.18779Z"
                fill="white"
              />
            </svg>
          </i>
        </div>
        <div className="list-search-filter-add">
          {checksInOut.map((employee, index) => (
            <p>
              Thời gian ca làm: {employee.timeIn} đến {employee.timeout} ngày{" "}
              {employee.date}{" "}
            </p>
          ))}
        </div>
        <div className="list-text-header-res">
          <h2>Phân quyền</h2>
          <span>Phân chia quyền truy cập theo chức vụ</span>
        </div>
        <table className="list-table">
          <thead>
            <tr>
              <td>STT</td>
              <td>Tên nhân viên</td>
              <td>Mã nhân viên</td>
              <td>Trạng thái</td>
              <td>Chi tiết điểm danh</td>
              <td>Hành động</td>
            </tr>
          </thead>
          {checksInOut.length === 0 ? (
            <p>
              Thông tin điểm danh ca làm việc theo nhóm chưa sẵn sàng hoặc không
              tồn tại.
            </p>
          ) : (
            <tbody>
              {checksInOut.length > 0 &&
                checksInOut[0].result.map((employee, index) => (
                  <tr key={employee.employeeId}>
                    <td>{index + 1}</td>
                    <td>{employee.name}</td>
                    <td>{employee.employeeId}</td>
                    <td>
                      {employee.status === 1 ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_469_914)">
                              <path
                                d="M5.75 10.5C7.07608 10.5 8.34785 9.97322 9.28553 9.03553C10.2232 8.09785 10.75 6.82608 10.75 5.5C10.75 4.17392 10.2232 2.90215 9.28553 1.96447C8.34785 1.02678 7.07608 0.5 5.75 0.5C4.42392 0.5 3.15215 1.02678 2.21447 1.96447C1.27678 2.90215 0.75 4.17392 0.75 5.5C0.75 6.82608 1.27678 8.09785 2.21447 9.03553C3.15215 9.97322 4.42392 10.5 5.75 10.5Z"
                                fill="#C5C5C5"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_469_914">
                                <rect
                                  width="10"
                                  height="10"
                                  fill="white"
                                  transform="translate(0.75 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <p>Chưa có mặt</p>
                        </>
                      ) : employee.status === 2 ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_469_1044)">
                              <path
                                d="M5.25 10.5C6.57608 10.5 7.84785 9.97322 8.78553 9.03553C9.72322 8.09785 10.25 6.82608 10.25 5.5C10.25 4.17392 9.72322 2.90215 8.78553 1.96447C7.84785 1.02678 6.57608 0.5 5.25 0.5C3.92392 0.5 2.65215 1.02678 1.71447 1.96447C0.776784 2.90215 0.25 4.17392 0.25 5.5C0.25 6.82608 0.776784 8.09785 1.71447 9.03553C2.65215 9.97322 3.92392 10.5 5.25 10.5Z"
                                fill="#34C759"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_469_1044">
                                <rect
                                  width="10"
                                  height="10"
                                  fill="white"
                                  transform="translate(0.25 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <p>Có mặt</p>
                        </>
                      ) : employee.status === 3 ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_469_973)">
                              <path
                                d="M5.25 10.5C6.57608 10.5 7.84785 9.97322 8.78553 9.03553C9.72322 8.09785 10.25 6.82608 10.25 5.5C10.25 4.17392 10.2232 2.90215 9.28553 1.96447C8.34785 1.02678 7.07608 0.5 5.25 0.5C3.92392 0.5 2.65215 1.02678 1.71447 1.96447C0.776784 2.90215 0.25 4.17392 0.25 5.5C0.25 6.82608 0.776784 8.09785 1.71447 9.03553C2.65215 9.97322 3.92392 10.5 5.25 10.5Z"
                                fill="#FC1E1E"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_469_973">
                                <rect
                                  width="10"
                                  height="10"
                                  fill="white"
                                  transform="translate(0.25 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <p>Vắng mặt</p>
                        </>
                      ) : employee.status === 4 ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_469_973)">
                              <path
                                d="M5.25 10.5C6.57608 10.5 7.84785 9.97322 8.78553 9.03553C9.72322 8.09785 10.25 6.82608 10.25 5.5C10.25 4.17392 10.2232 2.90215 9.28553 1.96447C8.34785 1.02678 7.07608 0.5 5.25 0.5C3.92392 0.5 2.65215 1.02678 1.71447 1.96447C0.776784 2.90215 0.25 4.17392 0.25 5.5C0.25 6.82608 0.776784 8.09785 1.71447 9.03553C2.65215 9.97322 3.92392 10.5 5.25 10.5Z"
                                fill="#FC1E1E"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_469_973">
                                <rect
                                  width="10"
                                  height="10"
                                  fill="white"
                                  transform="translate(0.25 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <p>Chưa có công việc</p>
                        </>
                      ) : employee.status === 5 ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_469_973)">
                              <path
                                d="M5.25 10.5C6.57608 10.5 7.84785 9.97322 8.78553 9.03553C9.72322 8.09785 10.25 6.82608 10.25 5.5C10.25 4.17392 10.2232 2.90215 9.28553 1.96447C8.34785 1.02678 7.07608 0.5 5.25 0.5C3.92392 0.5 2.65215 1.02678 1.71447 1.96447C0.776784 2.90215 0.25 4.17392 0.25 5.5C0.25 6.82608 0.776784 8.09785 1.71447 9.03553C2.65215 9.97322 3.92392 10.5 5.25 10.5Z"
                                fill="#FC1E1E"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_469_973">
                                <rect
                                  width="10"
                                  height="10"
                                  fill="white"
                                  transform="translate(0.25 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <p>Tạm ngưng</p>
                        </>
                      ) : employee.status === 6 ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_469_973)">
                              <path
                                d="M5.25 10.5C6.57608 10.5 7.84785 9.97322 8.78553 9.03553C9.72322 8.09785 10.25 6.82608 10.25 5.5C10.25 4.17392 10.2232 2.90215 9.28553 1.96447C8.34785 1.02678 7.07608 0.5 5.25 0.5C3.92392 0.5 2.65215 1.02678 1.71447 1.96447C0.776784 2.90215 0.25 4.17392 0.25 5.5C0.25 6.82608 0.776784 8.09785 1.71447 9.03553C2.65215 9.97322 3.92392 10.5 5.25 10.5Z"
                                fill="#FC1E1E"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_469_973">
                                <rect
                                  width="10"
                                  height="10"
                                  fill="white"
                                  transform="translate(0.25 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <p>Tan ca</p>
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_469_973)">
                              <path
                                d="M5.25 10.5C6.57608 10.5 7.84785 9.97322 8.78553 9.03553C9.72322 8.09785 10.25 6.82608 10.25 5.5C10.25 4.17392 10.2232 2.90215 9.28553 1.96447C8.34785 1.02678 7.07608 0.5 5.25 0.5C3.92392 0.5 2.65215 1.02678 1.71447 1.96447C0.776784 2.90215 0.25 4.17392 0.25 5.5C0.25 6.82608 0.776784 8.09785 1.71447 9.03553C2.65215 9.97322 3.92392 10.5 5.25 10.5Z"
                                fill="#FC1E1E"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_469_973">
                                <rect
                                  width="10"
                                  height="10"
                                  fill="white"
                                  transform="translate(0.25 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <p>Chưa biết</p>
                        </>
                      )}
                    </td>
                    <td
                      onClick={() => {
                        checksInOut.map((dateString, index) =>
                          showModalListEmployee(
                            employee.employeeId,
                            dateString.date
                          )
                        );
                      }}
                    >
                      Chỉnh sửa
                    </td>
                    <td>
                      {employee.checkStatus === "CheckIn" ? (
                        <span
                          className="enter"
                          onClick={() => handleCheckStart(employee.employeeId)}
                        >
                          <p>Bắt đầu</p>
                        </span>
                      ) : (
                        <span
                          className="go-out"
                          onClick={() => handleCheckEnd(employee.employeeId)}
                        >
                          <p>Ngưng</p>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
        {isEditing ? (
          //chinh sua cong viec trong ngay
          <Modal
            className="modal-detail-shift-all"
            open={isModalOpenDetailShift}
            onOk={handleSave}
            onCancel={handleCancelDetailShift}
          >
            <div className="modal-detail-shift">
              <div className="modal-head">
                <div className="text-head">
                  <p>Chi tiết công việc trong ngày</p>
                </div>
              </div>
              <div className="body-edit">
                <div className="item-modal">
                  <p>Tên công việc</p>
                  <Input type="text" value={work.workName}></Input>
                </div>
                <div className="item-modal">
                  <p>Loại sản phẩm:</p>
                  <Input type="text" value={work.productName}></Input>
                </div>

                <div className="item-modal">
                  <p>Số sản phẩm đã hoàn thành</p>
                  <Input
                    type="text"
                    value={number != null ? number : work.numberOFProductToday}
                    onChange={(e) => setNumber(e.target.value)}
                  ></Input>
                </div>

                <div className="item-modal">
                  <p>Ngày làm việc</p>
                  <Input type="date" value={convertDobToISO(work.date)}></Input>
                </div>
                <div className="footer-modal">
                  <span className="back" onClick={handleCancel}>
                    Hủy bỏ
                  </span>
                  <span className="edit save" onClick={handleSave}>
                    Lưu
                  </span>
                </div>
              </div>
            </div>
          </Modal>
        ) : (
          // chi tieet cong viec trong ngay
          <Modal
            className="modal-detail-shift-all"
            open={isModalOpenDetailShift}
            onOk={handleOkDetailShift}
            onCancel={handleCancelDetailShift}
          >
            <div className="modal-detail-shift">
              <div className="modal-head">
                <div className="text-head">
                  <p>Chi tiết công việc trong ngày</p>
                </div>
                <svg
                  onClick={handleCancelDetailShift}
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
              <div className="body-edit">
                <div className="item-modal">
                  <p>Tên công việc</p>
                  <Input type="text" value={work.workName}></Input>
                </div>
                <div className="item-modal">
                  <p>Tên nhóm</p>
                  <Input type="text" value={work.teamName}></Input>
                </div>
                <div className="item-modal">
                  <p>Loại sản phẩm:</p>
                  <Input type="text" value={work.productName}></Input>
                </div>
                <div className="item-modal">
                  <p>Đơn giá 1 sản phẩm</p>
                  <Input type="text" value={work.cost}></Input>
                </div>
                <div className="item-modal">
                  <p>Số sản phẩm đã hoàn thành</p>
                  <Input type="text" value={work.numberOFProductToday}></Input>
                </div>
                <div className="item-modal">
                  <p>Số sản phẩm cần sản xuất</p>
                  <Input type="text" value={work.numberOfProduct}></Input>
                </div>
                <div className="item-modal">
                  <p>Khu vục sản xuất</p>
                  <Input type="text" value={work.workAreaName}></Input>
                </div>
                <div className="item-modal">
                  <p>Ngày làm việc</p>
                  <Input type="date" value={convertDobToISO(work.date)}></Input>
                </div>
                <div className="footer-modal fix-modal-shift">
                  <span className="edit" onClick={handleEdit}>
                    Cập nhật số sản phẩm hoàn thành
                  </span>
                </div>
              </div>
            </div>
          </Modal>
        )}

        <EditEmployee
          isModalOpenListEmployee={isModalOpenListEmployee}
          handleSave={handleSave}
          handleCancelListEmployee={handleCancelListEmployee}
          handleCancel={handleCancel}
          employCheckInOut={employCheckInOut}
          convertDobToISO={convertDobToISO}
          convertTimeToInputFormat={convertTimeToInputFormat}
          handleOkListEmployee={handleOkListEmployee}
          UpdateCheckInOutForEmployee={UpdateCheckInOutForEmployee}
          showModalListEmployee={showModalListEmployee}
          date={date}
          employeeId={employeeId}
        />
      </div>
    </>
  );
};
export default TimekeepingComponent;
