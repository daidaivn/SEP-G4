import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Input, Select, Modal } from "antd";

import "../scss/reset.scss";
import "../scss/index.scss";
import "../scss/fonts.scss";
import "../scss/PayrollComponent.scss";

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
  ExcelModal
} from "./componentPayroll";

import { fetchAllSalaries, fetchAllReward } from "../../sevices/PayrollSevice";
const PayrollComponent = () => {
  const [salaries, setSalaries] = useState([]);
  const [reward, setReward] = useState([]);
  const [date, setDate] = useState("");
  const currentDateTime = new Date();

  const currentMonth = currentDateTime.getMonth() + 1;
  const currentYear = currentDateTime.getFullYear();

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

  //modal Hiếu hỉ
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
  // get All salaries
  const fetData = () => {
    toast.promise(
      new Promise((resolve) => {
        fetchAllSalaries(currentMonth, currentYear)
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
  useEffect(() => {
    fetData();
  }, []);

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
          <div className="excel" onClick={showModalExcel}>
            <svg
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
            Xuất Excel
          </div>
          <div className="ListWork">
            <svg
              //show Modal Thưởng công ty
              onClick={showModalRewardCompany}
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
          {/* Show modal Các loại thưởng */}
          <div className="buttonAdd" onClick={showModalTypeReward}>
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
        <table className="list-table ">
          <thead>
            <tr>
              <td>MNV</td>
              <td>Họ và tên</td>
              <td>Lương chính</td>
              <td>Khoản giảm trừ</td>
              <td>Phụ cấp</td>
              <td>Lương thực nhận</td>
            </tr>
          </thead>
          {salaries.length === 0 ? (
            <p>Thông tin sẵn sàng hoặc không tồn tại.</p>
          ) : (
            <tbody className="scrollbar" id="style-15">
              {salaries.map((Salary, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{Salary.employeeName}</td>
                  <td>
                    {Salary.mainSalary == 0 ? "-" : Salary.mainSalary} VNĐ{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                    >
                      <path
                        d="M19.6749 15.0004C19.6749 17.4754 17.6749 19.4754 15.1999 19.4754C12.7249 19.4754 10.7249 17.4754 10.7249 15.0004C10.7249 12.5254 12.7249 10.5254 15.1999 10.5254C17.6749 10.5254 19.6749 12.5254 19.6749 15.0004Z"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.2 25.3379C19.6125 25.3379 23.725 22.7379 26.5875 18.2379C27.7125 16.4754 27.7125 13.5129 26.5875 11.7504C23.725 7.25039 19.6125 4.65039 15.2 4.65039C10.7875 4.65039 6.675 7.25039 3.8125 11.7504C2.6875 13.5129 2.6875 16.4754 3.8125 18.2379C6.675 22.7379 10.7875 25.3379 15.2 25.3379Z"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </td>
                  {/* show Modal Chi tiết trợ cấp */}
                  <td onClick={showModalAllowance}>
                    {Salary.allowances == 0 ? "-" : Salary.allowances} VNĐ{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                    >
                      <path
                        d="M19.6749 15.0004C19.6749 17.4754 17.6749 19.4754 15.1999 19.4754C12.7249 19.4754 10.7249 17.4754 10.7249 15.0004C10.7249 12.5254 12.7249 10.5254 15.1999 10.5254C17.6749 10.5254 19.6749 12.5254 19.6749 15.0004Z"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.2 25.3379C19.6125 25.3379 23.725 22.7379 26.5875 18.2379C27.7125 16.4754 27.7125 13.5129 26.5875 11.7504C23.725 7.25039 19.6125 4.65039 15.2 4.65039C10.7875 4.65039 6.675 7.25039 3.8125 11.7504C2.6875 13.5129 2.6875 16.4754 3.8125 18.2379C6.675 22.7379 10.7875 25.3379 15.2 25.3379Z"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </td>
                  {/* show Modal Chi tiết phụ cấp */}
                  <td onClick={showModalSubsidies}>
                    {Salary.deductions == 0 ? "-" : Salary.deductions}VNĐ{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                    >
                      <path
                        d="M19.6749 15.0004C19.6749 17.4754 17.6749 19.4754 15.1999 19.4754C12.7249 19.4754 10.7249 17.4754 10.7249 15.0004C10.7249 12.5254 12.7249 10.5254 15.1999 10.5254C17.6749 10.5254 19.6749 12.5254 19.6749 15.0004Z"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.2 25.3379C19.6125 25.3379 23.725 22.7379 26.5875 18.2379C27.7125 16.4754 27.7125 13.5129 26.5875 11.7504C23.725 7.25039 19.6125 4.65039 15.2 4.65039C10.7875 4.65039 6.675 7.25039 3.8125 11.7504C2.6875 13.5129 2.6875 16.4754 3.8125 18.2379C6.675 22.7379 10.7875 25.3379 15.2 25.3379Z"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </td>
                  {/* show Modal Chi tiết thưởng */}
                  <td onClick={showModalReward}>
                    {Salary.actualSalary == 0 ? "-" : Salary.actualSalary} VNĐ{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                    >
                      <path
                        d="M19.6749 15.0004C19.6749 17.4754 17.6749 19.4754 15.1999 19.4754C12.7249 19.4754 10.7249 17.4754 10.7249 15.0004C10.7249 12.5254 12.7249 10.5254 15.1999 10.5254C17.6749 10.5254 19.6749 12.5254 19.6749 15.0004Z"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.2 25.3379C19.6125 25.3379 23.725 22.7379 26.5875 18.2379C27.7125 16.4754 27.7125 13.5129 26.5875 11.7504C23.725 7.25039 19.6125 4.65039 15.2 4.65039C10.7875 4.65039 6.675 7.25039 3.8125 11.7504C2.6875 13.5129 2.6875 16.4754 3.8125 18.2379C6.675 22.7379 10.7875 25.3379 15.2 25.3379Z"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        <SubsidiesDetail
          isModalOpenSubsidies={isModalOpenSubsidies}
          handleOkSubsidies={handleOkSubsidies}
          handleCancelSubsidies={handleCancelSubsidies}
        />

        <AllowanceDetails
          isModalOpenAllowance={isModalOpenAllowance}
          handleOkAllowance={handleOkAllowance}
          handleCancelAllowance={handleCancelAllowance}
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
        />
      </div>
    </>
  );
};
export default PayrollComponent;
