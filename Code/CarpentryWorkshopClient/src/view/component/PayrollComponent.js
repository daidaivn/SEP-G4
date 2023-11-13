import "../scss/reset.scss";
import "../scss/index.scss";
import "../scss/fonts.scss";
import "../scss/PayrollComponent.scss";
import MenuResponsive from "./componentUI/MenuResponsive";
import ListUserHeader from "./componentUI/ListUserHeader";
import { Form, Input, Select, Switch, Modal } from "antd";
import { useState } from "react";
const PayrollComponent = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
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
  const showModalRewardCompany = () => {
    setIsModalOpenRewardCompany(true);
  };
  const handleOkRewardCompany = () => {
    setIsModalOpenRewardCompany(false);
  };
  const handleCancelRewardCompany = () => {
    setIsModalOpenRewardCompany(false);
  };

  //modal Thưởng cá nhân
  const [isModalOpenRewardPersonal, setIsModalOpenRewardPersonal] = useState(
    false
  );
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
              <td>Trợ cấp</td>
              <td>Phụ cấp</td>
              <td>Thưởng</td>
            </tr>
          </thead>
          <tbody className="scrollbar" id="style-15">
            <tr>
              <td>1</td>
              <td>Nguyễn Văn An</td>
              <td>
                9.000.000 VNĐ{" "}
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
                500.000 VNĐ{" "}
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
                800.000 VNĐ{" "}
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
                200.000 VNĐ{" "}
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
            <tr>
              <td>1</td>
              <td>Nguyễn Văn An</td>
              <td>
                9.000.000 VNĐ{" "}
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
                500.000 VNĐ{" "}
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
                800.000 VNĐ{" "}
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
                200.000 VNĐ{" "}
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
            <tr>
              <td>1</td>
              <td>Nguyễn Văn An</td>
              <td>
                9.000.000 VNĐ{" "}
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
                500.000 VNĐ{" "}
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
                800.000 VNĐ{" "}
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
                200.000 VNĐ{" "}
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
            <tr>
              <td>1</td>
              <td>Nguyễn Văn An</td>
              <td>
                9.000.000 VNĐ{" "}
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
                500.000 VNĐ{" "}
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
                800.000 VNĐ{" "}
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
                200.000 VNĐ{" "}
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
            <tr>
              <td>1</td>
              <td>Nguyễn Văn An</td>
              <td>
                9.000.000 VNĐ{" "}
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
                500.000 VNĐ{" "}
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
                800.000 VNĐ{" "}
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
                200.000 VNĐ{" "}
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
            <tr>
              <td>1</td>
              <td>Nguyễn Văn An</td>
              <td>
                9.000.000 VNĐ{" "}
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
                500.000 VNĐ{" "}
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
                800.000 VNĐ{" "}
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
                200.000 VNĐ{" "}
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
          </tbody>
        </table>

        {/* Modal Chi tiết phụ cấp */}
        <Modal
          className="modal"
          open={isModalOpenSubsidies}
          on
          Ok={handleOkSubsidies}
          onCancel={handleCancelSubsidies}
        >
          <div className="modal-payroll">
            <div className="modal-head">
              <div className="body-payroll1">
                <p>Chi tiết phụ cấp</p>
              </div>
              <div className="close">
                <svg
                  onClick={handleCancelSubsidies}
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
            <div className="body-payroll">
              <div className="body-child1 scrollbar" id="style-15">
                <div className="body-child1-cn">
                  <div className="item-chil1">
                    <div className="item-chil1-cn">
                      <p className="text1">1.</p>
                      <p>Lương chính</p>
                      <div className="money">
                        <p>9.000.000 VND</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item-child1-col">
                  <div className="child1-col">
                    <div className="child1-text">
                      <p className="text1">2.</p>
                      <p>Phụ cấp</p>
                      <div className="money">
                        <p>9.000.000 VND</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item-child1-col">
                  <div className="child1-col">
                    <div className="child1-text">
                      <p className="text1">3.</p>
                      <p>Thưởng</p>
                      <div className="money">
                        {" "}
                        <p>9.000.000 VND</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item-child1-col">
                  <div className="child1-col">
                    <div className="child1-text">
                      <p className="text1">4.</p>
                      <p>Xăng xe</p>
                      <div className="money">
                        {" "}
                        <p>9.000.000 VND</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="body-child2">
                <div className="body-child1-cn">
                  <div className="item-chil1">
                    <div className="item-chil1-cn">
                      <p>Tổng số tiền phụ cấp</p>
                      <div className="money">
                        <p>9.000.000 VND</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* Modal Chi tiết trợ cấp */}
        <Modal
          className="modal"
          open={isModalOpenAllowance}
          on
          Ok={handleOkAllowance}
          onCancel={handleCancelAllowance}
        >
          <div className="modal-payroll">
            <div className="modal-head">
              <div className="body-payroll1">
                <p>Chi tiết trợ cấp</p>
              </div>
              <div className="close">
                <svg
                  onClick={handleCancelAllowance}
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
            <div className="body-payroll">
              <div className="body-child1 scrollbar" id="style-15">
                <div className="body-child1-cn">
                  <div className="item-chil1">
                    <div className="item-chil1-cn">
                      <p className="text1">1.</p>
                      <p>Lương chính</p>
                      <div className="money">
                        <p>9.000.000 VND</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item-child1-col">
                  <div className="child1-col">
                    <div className="child1-text">
                      <p className="text1">2.</p>
                      <p>Phụ cấp</p>
                      <div className="money">
                        <p>9.000.000 VND</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item-child1-col">
                  <div className="child1-col">
                    <div className="child1-text">
                      <p className="text1">3.</p>
                      <p>Thưởng</p>
                      <div className="money">
                        {" "}
                        <p>9.000.000 VND</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item-child1-col">
                  <div className="child1-col">
                    <div className="child1-text">
                      <p className="text1">4.</p>
                      <p>Xăng xe</p>
                      <div className="money">
                        {" "}
                        <p>9.000.000 VND</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="body-child2">
                <div className="body-child1-cn">
                  <div className="item-chil1">
                    <div className="item-chil1-cn">
                      <p>Tổng số tiền trợ cấp</p>
                      <div className="money">
                        <p>9.000.000 VND</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* Modal Chi tiết thưởng */}
        <Modal
          className="modal"
          open={isModalOpenReward}
          on
          Ok={handleOkReward}
          onCancel={handleCancelReward}
        >
          <div className="modal-payroll">
            <div className="modal-head">
              <div className="body-payroll1">
                <p>Chi tiết thưởng</p>
              </div>
              <div className="close">
                <svg
                  onClick={handleCancelReward}
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
            <div className="body-payroll">
              <div className="body-child1 scrollbar" id="style-15">
                <div className="body-child1-cn">
                  <div className="item-chil1">
                    <div className="item-chil1-cn">
                      <p className="text1">1.</p>
                      <p>Lương chính</p>
                      <div className="money">
                        <p>9.000.000 VND</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item-child1-col">
                  <div className="child1-col">
                    <div className="child1-text">
                      <p className="text1">2.</p>
                      <p>Phụ cấp</p>
                      <div className="money">
                        <p>9.000.000 VND</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item-child1-col">
                  <div className="child1-col">
                    <div className="child1-text">
                      <p className="text1">3.</p>
                      <p>Thưởng</p>
                      <div className="money">
                        {" "}
                        <p>9.000.000 VND</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item-child1-col">
                  <div className="child1-col">
                    <div className="child1-text">
                      <p className="text1">4.</p>
                      <p>Xăng xe</p>
                      <div className="money">
                        {" "}
                        <p>9.000.000 VND</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="body-child2">
                <div className="body-child1-cn">
                  <div className="item-chil1">
                    <div className="item-chil1-cn">
                      <p>Tổng số tiền thưởng</p>
                      <div className="money">
                        <p>9.000.000 VND</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* Modal Thưởng công ty */}
        <Modal
          className="modal-reward-company-all"
          open={isModalOpenRewardCompany}
          on
          Ok={handleOkRewardCompany}
          onCancel={handleCancelRewardCompany}
        >
          <div className="modal-payroll modal-reward-company">
            <div className="modal-head">
              <div className="body-payroll1">
                <p>Thưởng công ty</p>
                <Input type="date"></Input>
              </div>
              <div className="close">
                <svg
                  onClick={handleCancelRewardCompany}
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
            <div className="body-reward">
              <div className="div1">
                <thead>
                  <td className="first">STT</td>
                  <td className="middle">Loại thưởng</td>
                  <td className="middle">Số tiền thưởng / người</td>
                  <td className="middle">Người được thưởng</td>
                  <td className="last">Ngày khen thưởng</td>
                </thead>
                <div className="item-reward">
                  <p className="stt">1</p>
                  <div className="child-reward">
                    <p>Thưởng Tết</p>
                  </div>
                  <div className="child-reward">
                    <p>1.000.000</p>
                  </div>
                  <div className="child-reward">
                    <p>Toàn thể nhân viên</p>
                  </div>
                  <div className="child-reward last1">
                    <p>20/10/2023</p>
                  </div>
                </div>
                <div className="item-reward">
                  <p className="stt">2</p>
                  <div className="child-reward">
                    <p>Nhân viên xuất sắc</p>
                  </div>
                  <div className="child-reward">
                    <p>500.000</p>
                  </div>
                  <div className="child-reward">
                    <p>Nguyễn Văn an</p>
                  </div>
                  <div className="child-reward last1">
                    <p>30/10/2023</p>
                  </div>
                </div>
                <div className="item-reward">
                  <p className="stt">3</p>
                  <div className="child-reward">
                    <p>Thưởng 30/4 - 1/5</p>
                  </div>
                  <div className="child-reward">
                    <p>500.000</p>
                  </div>
                  <div className="child-reward">
                    <p>Toàn thể nhân viên</p>
                  </div>
                  <div className="child-reward last1">
                    <p>15/11/2023</p>
                  </div>
                </div>
              </div>
              <div className="div2">
                {/*show Modal Thưởng cá nhân */}
                <span className="btn-reward" onClick={showModalRewardPersonal}>
                  Thưởng cá nhân
                </span>
                {/* show modal Thưởng toàn thể công ty */}
                <span className="btn-reward" onClick={showModalRewardAll}>
                  Thưởng toàn thể công ty
                </span>
              </div>
            </div>
          </div>
        </Modal>

        {/* Modal Thưởng cá nhân */}
        <Modal
          className="modal"
          open={isModalOpenRewardPersonal}
          onOk={handleOkRewardPersonal}
          onCancel={handleCancelRewardPersonal}
        >
          <div className="modal-detail-all">
            <div className="head-modal">
              <p>Thưởng cá nhân</p>
            </div>
            <div className="body-modal">
              <div className="item-modal">
                <p>Loại thưởng</p>
                <Select
                  defaultValue="lucy"
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                  ]}
                />
              </div>
              <div className="item-modal">
                <p>Số tiền thưởng:</p>
                <Input type="text"></Input>
              </div>
              <div className="item-modal">
                <p>Chọn nhân viên</p>
                <Select
                  defaultValue="lucy"
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                  ]}
                />
              </div>

              <div className="footer-modal">
                <span className="back" onClick={handleOkRewardPersonal}>
                  Hủy bỏ
                </span>
                <span
                  className="edit save"
                  onClick={handleCancelRewardPersonal}
                >
                  Lưu
                </span>
              </div>
            </div>
          </div>
        </Modal>
        {/* Modal Thưởng toàn thể công ty */}
        <Modal
          className="modal"
          open={isModalOpenRewardAll}
          onOk={handleOkRewardAll}
          onCancel={handleCancelRewardAll}
        >
          <div className="modal-detail-all">
            <div className="head-modal">
              <p>Thưởng toàn thể công ty</p>
            </div>
            <div className="body-modal">
              <div className="item-modal">
                <p>Loại thưởng</p>
                <Select
                  defaultValue="lucy"
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe",
                    },
                  ]}
                />
              </div>
              <div className="item-modal">
                <p>Số tiền thưởng:</p>
                <Input type="text"></Input>
              </div>

              <div className="footer-modal">
                <span className="back" onClick={handleOkRewardAll}>
                  Hủy bỏ
                </span>
                <span className="edit save" onClick={handleCancelRewardAll}>
                  Lưu
                </span>
              </div>
            </div>
          </div>
        </Modal>

        {/* Modal Các loại thưởng */}
        <Modal
          className="modal"
          open={isModalOpenTypeReward}
          onOk={handleOkTypeReward}
          onCancel={handleCancelTypeReward}
        >
          <div className="modal-type-reward-all">
            <div className="modal-head">
              <div className="text-head">
                <p>Các loại thưởng</p>
              </div>
              <svg
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
            <div className="modal-body">
              <div className="body-head">
                <p>Thêm loại thưởng:</p>
                <Input type="text" placeholder="Thưởng Tết"></Input>
                <span>Lưu</span>
              </div>
              <div className="body-mid">
                <thead>
                  <td className="td1">STT</td>
                  <td className="td2">Loại thưởng</td>
                  <td className="td3">Sửa</td>
                </thead>
                <div className="item-scroll scrollbar" id="style-15">
                  <div className="item">
                    <p className="stt">1</p>
                    <div className="type">
                      <p>Thưởng Tết</p>
                    </div>
                    <div className="edit">
                      <svg
                        onClick={showModalEditReward}
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <path
                          d="M21 0H9C3 0 0 3 0 9V28.5C0 29.325 0.675 30 1.5 30H21C27 30 30 27 30 21V9C30 3 27 0 21 0ZM13.665 21.99C13.29 22.365 12.6 22.71 12.09 22.785L8.97 23.22C8.85 23.235 8.73 23.25 8.625 23.25C8.1 23.25 7.62 23.07 7.275 22.725C6.855 22.305 6.675 21.69 6.78 21.03L7.215 17.91C7.29 17.4 7.635 16.695 8.01 16.335L13.665 10.68C13.755 10.95 13.875 11.22 14.01 11.52C14.145 11.79 14.28 12.06 14.43 12.315C14.55 12.525 14.685 12.735 14.805 12.885C14.955 13.11 15.105 13.305 15.21 13.41C15.27 13.5 15.33 13.56 15.345 13.59C15.675 13.965 16.02 14.325 16.35 14.595C16.44 14.685 16.5 14.73 16.515 14.745C16.71 14.895 16.89 15.06 17.07 15.165C17.265 15.315 17.475 15.45 17.685 15.57C17.94 15.72 18.21 15.87 18.495 16.005C18.78 16.14 19.05 16.245 19.32 16.335L13.665 21.99ZM21.825 13.845L20.655 15.015C20.58 15.09 20.475 15.135 20.37 15.135C20.34 15.135 20.28 15.135 20.25 15.12C17.67 14.385 15.615 12.33 14.88 9.75C14.835 9.615 14.88 9.465 14.985 9.36L16.17 8.175C18.105 6.24 19.935 6.285 21.825 8.175C22.785 9.135 23.265 10.065 23.25 11.025C23.25 11.97 22.785 12.885 21.825 13.845Z"
                          fill="#FF8F19"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="item">
                    <p className="stt">1</p>
                    <div className="type">
                      <p>Thưởng Tết</p>
                    </div>
                    <div className="edit">
                      <svg
                        onClick={showModalEditReward}
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <path
                          d="M21 0H9C3 0 0 3 0 9V28.5C0 29.325 0.675 30 1.5 30H21C27 30 30 27 30 21V9C30 3 27 0 21 0ZM13.665 21.99C13.29 22.365 12.6 22.71 12.09 22.785L8.97 23.22C8.85 23.235 8.73 23.25 8.625 23.25C8.1 23.25 7.62 23.07 7.275 22.725C6.855 22.305 6.675 21.69 6.78 21.03L7.215 17.91C7.29 17.4 7.635 16.695 8.01 16.335L13.665 10.68C13.755 10.95 13.875 11.22 14.01 11.52C14.145 11.79 14.28 12.06 14.43 12.315C14.55 12.525 14.685 12.735 14.805 12.885C14.955 13.11 15.105 13.305 15.21 13.41C15.27 13.5 15.33 13.56 15.345 13.59C15.675 13.965 16.02 14.325 16.35 14.595C16.44 14.685 16.5 14.73 16.515 14.745C16.71 14.895 16.89 15.06 17.07 15.165C17.265 15.315 17.475 15.45 17.685 15.57C17.94 15.72 18.21 15.87 18.495 16.005C18.78 16.14 19.05 16.245 19.32 16.335L13.665 21.99ZM21.825 13.845L20.655 15.015C20.58 15.09 20.475 15.135 20.37 15.135C20.34 15.135 20.28 15.135 20.25 15.12C17.67 14.385 15.615 12.33 14.88 9.75C14.835 9.615 14.88 9.465 14.985 9.36L16.17 8.175C18.105 6.24 19.935 6.285 21.825 8.175C22.785 9.135 23.265 10.065 23.25 11.025C23.25 11.97 22.785 12.885 21.825 13.845Z"
                          fill="#FF8F19"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="item">
                    <p className="stt">1</p>
                    <div className="type">
                      <p>Thưởng Tết</p>
                    </div>
                    <div className="edit">
                      <svg
                        onClick={showModalEditReward}
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <path
                          d="M21 0H9C3 0 0 3 0 9V28.5C0 29.325 0.675 30 1.5 30H21C27 30 30 27 30 21V9C30 3 27 0 21 0ZM13.665 21.99C13.29 22.365 12.6 22.71 12.09 22.785L8.97 23.22C8.85 23.235 8.73 23.25 8.625 23.25C8.1 23.25 7.62 23.07 7.275 22.725C6.855 22.305 6.675 21.69 6.78 21.03L7.215 17.91C7.29 17.4 7.635 16.695 8.01 16.335L13.665 10.68C13.755 10.95 13.875 11.22 14.01 11.52C14.145 11.79 14.28 12.06 14.43 12.315C14.55 12.525 14.685 12.735 14.805 12.885C14.955 13.11 15.105 13.305 15.21 13.41C15.27 13.5 15.33 13.56 15.345 13.59C15.675 13.965 16.02 14.325 16.35 14.595C16.44 14.685 16.5 14.73 16.515 14.745C16.71 14.895 16.89 15.06 17.07 15.165C17.265 15.315 17.475 15.45 17.685 15.57C17.94 15.72 18.21 15.87 18.495 16.005C18.78 16.14 19.05 16.245 19.32 16.335L13.665 21.99ZM21.825 13.845L20.655 15.015C20.58 15.09 20.475 15.135 20.37 15.135C20.34 15.135 20.28 15.135 20.25 15.12C17.67 14.385 15.615 12.33 14.88 9.75C14.835 9.615 14.88 9.465 14.985 9.36L16.17 8.175C18.105 6.24 19.935 6.285 21.825 8.175C22.785 9.135 23.265 10.065 23.25 11.025C23.25 11.97 22.785 12.885 21.825 13.845Z"
                          fill="#FF8F19"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="item">
                    <p className="stt">1</p>
                    <div className="type">
                      <p>Thưởng Tết</p>
                    </div>
                    <div className="edit">
                      <svg
                        onClick={showModalEditReward}
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <path
                          d="M21 0H9C3 0 0 3 0 9V28.5C0 29.325 0.675 30 1.5 30H21C27 30 30 27 30 21V9C30 3 27 0 21 0ZM13.665 21.99C13.29 22.365 12.6 22.71 12.09 22.785L8.97 23.22C8.85 23.235 8.73 23.25 8.625 23.25C8.1 23.25 7.62 23.07 7.275 22.725C6.855 22.305 6.675 21.69 6.78 21.03L7.215 17.91C7.29 17.4 7.635 16.695 8.01 16.335L13.665 10.68C13.755 10.95 13.875 11.22 14.01 11.52C14.145 11.79 14.28 12.06 14.43 12.315C14.55 12.525 14.685 12.735 14.805 12.885C14.955 13.11 15.105 13.305 15.21 13.41C15.27 13.5 15.33 13.56 15.345 13.59C15.675 13.965 16.02 14.325 16.35 14.595C16.44 14.685 16.5 14.73 16.515 14.745C16.71 14.895 16.89 15.06 17.07 15.165C17.265 15.315 17.475 15.45 17.685 15.57C17.94 15.72 18.21 15.87 18.495 16.005C18.78 16.14 19.05 16.245 19.32 16.335L13.665 21.99ZM21.825 13.845L20.655 15.015C20.58 15.09 20.475 15.135 20.37 15.135C20.34 15.135 20.28 15.135 20.25 15.12C17.67 14.385 15.615 12.33 14.88 9.75C14.835 9.615 14.88 9.465 14.985 9.36L16.17 8.175C18.105 6.24 19.935 6.285 21.825 8.175C22.785 9.135 23.265 10.065 23.25 11.025C23.25 11.97 22.785 12.885 21.825 13.845Z"
                          fill="#FF8F19"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="item">
                    <p className="stt">1</p>
                    <div className="type">
                      <p>Thưởng Tết</p>
                    </div>
                    <div className="edit">
                      <svg
                        onClick={showModalEditReward}
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <path
                          d="M21 0H9C3 0 0 3 0 9V28.5C0 29.325 0.675 30 1.5 30H21C27 30 30 27 30 21V9C30 3 27 0 21 0ZM13.665 21.99C13.29 22.365 12.6 22.71 12.09 22.785L8.97 23.22C8.85 23.235 8.73 23.25 8.625 23.25C8.1 23.25 7.62 23.07 7.275 22.725C6.855 22.305 6.675 21.69 6.78 21.03L7.215 17.91C7.29 17.4 7.635 16.695 8.01 16.335L13.665 10.68C13.755 10.95 13.875 11.22 14.01 11.52C14.145 11.79 14.28 12.06 14.43 12.315C14.55 12.525 14.685 12.735 14.805 12.885C14.955 13.11 15.105 13.305 15.21 13.41C15.27 13.5 15.33 13.56 15.345 13.59C15.675 13.965 16.02 14.325 16.35 14.595C16.44 14.685 16.5 14.73 16.515 14.745C16.71 14.895 16.89 15.06 17.07 15.165C17.265 15.315 17.475 15.45 17.685 15.57C17.94 15.72 18.21 15.87 18.495 16.005C18.78 16.14 19.05 16.245 19.32 16.335L13.665 21.99ZM21.825 13.845L20.655 15.015C20.58 15.09 20.475 15.135 20.37 15.135C20.34 15.135 20.28 15.135 20.25 15.12C17.67 14.385 15.615 12.33 14.88 9.75C14.835 9.615 14.88 9.465 14.985 9.36L16.17 8.175C18.105 6.24 19.935 6.285 21.825 8.175C22.785 9.135 23.265 10.065 23.25 11.025C23.25 11.97 22.785 12.885 21.825 13.845Z"
                          fill="#FF8F19"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="item">
                    <p className="stt">1</p>
                    <div className="type">
                      <p>Thưởng Tết</p>
                    </div>
                    <div className="edit">
                      <svg
                        onClick={showModalEditReward}
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <path
                          d="M21 0H9C3 0 0 3 0 9V28.5C0 29.325 0.675 30 1.5 30H21C27 30 30 27 30 21V9C30 3 27 0 21 0ZM13.665 21.99C13.29 22.365 12.6 22.71 12.09 22.785L8.97 23.22C8.85 23.235 8.73 23.25 8.625 23.25C8.1 23.25 7.62 23.07 7.275 22.725C6.855 22.305 6.675 21.69 6.78 21.03L7.215 17.91C7.29 17.4 7.635 16.695 8.01 16.335L13.665 10.68C13.755 10.95 13.875 11.22 14.01 11.52C14.145 11.79 14.28 12.06 14.43 12.315C14.55 12.525 14.685 12.735 14.805 12.885C14.955 13.11 15.105 13.305 15.21 13.41C15.27 13.5 15.33 13.56 15.345 13.59C15.675 13.965 16.02 14.325 16.35 14.595C16.44 14.685 16.5 14.73 16.515 14.745C16.71 14.895 16.89 15.06 17.07 15.165C17.265 15.315 17.475 15.45 17.685 15.57C17.94 15.72 18.21 15.87 18.495 16.005C18.78 16.14 19.05 16.245 19.32 16.335L13.665 21.99ZM21.825 13.845L20.655 15.015C20.58 15.09 20.475 15.135 20.37 15.135C20.34 15.135 20.28 15.135 20.25 15.12C17.67 14.385 15.615 12.33 14.88 9.75C14.835 9.615 14.88 9.465 14.985 9.36L16.17 8.175C18.105 6.24 19.935 6.285 21.825 8.175C22.785 9.135 23.265 10.065 23.25 11.025C23.25 11.97 22.785 12.885 21.825 13.845Z"
                          fill="#FF8F19"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

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
      </div>
    </>
  );
};
export default PayrollComponent;
