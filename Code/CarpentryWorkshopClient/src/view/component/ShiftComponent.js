import "../scss/reset.scss";
import "../scss/index.scss";
import "../scss/fonts.scss";
import "../scss/ShiftComponent.scss";
import MenuResponsive from "./componentUI/MenuResponsive";
import ListUserHeader from "./componentUI/ListUserHeader";
import { Input, Modal, Select } from "antd";
import { useState } from "react";
import DetailsEmployee from "./ComponentShift/DetailsEmployee";
import EditEmployee from "./ComponentShift/EditEmployee";
const ShiftComponent = () => {
  // Modal chi tiet thanh vien
  const [isModalOpenListEmployee, setIsModalOpenListEmployee] = useState(false);
  const showModalListEmployee = () => {
    setIsModalOpenListEmployee(true);
  };
  const handleOkListEmployee = () => {
    setIsModalOpenListEmployee(false);
  };
  const handleCancelListEmployee = () => {
    setIsModalOpenListEmployee(false);
  };

  //Thay doi trang thai chinh sua nhan vien
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
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
            <h2>Thông tin các ca làm của nhóm trong 7 ngày</h2>
            <span>Hiển thị thông tin các ca làm của nhóm trong 3 ngày</span>
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

        <table className="list-table table-shift">
          <thead>
            <tr>
              <td>STT</td>
              <td>Tên ca làm</td>
              <td>Công việc</td>
              <td>Thời gian làm việc</td>
              <td>Ngày</td>
              <td>Trạng thái</td>
              <td>Chi tiết thành viên</td>
            </tr>
          </thead>
          <tbody className="scrollbar" id="style-15">
            <tr>
              <td>1</td>
              <td>Ca 1</td>
              <td>Dán gỗ</td>
              <td>07:00 - 15:00</td>
              <td> 11/02/2023</td>
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="11"
                  viewBox="0 0 10 11"
                  fill="none"
                >
                  <g clip-path="url(#clip0_876_1715)">
                    <path
                      d="M4.99951 10.5C6.32559 10.5 7.59736 9.97322 8.53505 9.03553C9.47273 8.09785 9.99951 6.82608 9.99951 5.5C9.99951 4.17392 9.47273 2.90215 8.53505 1.96447C7.59736 1.02678 6.32559 0.5 4.99951 0.5C3.67343 0.5 2.40166 1.02678 1.46398 1.96447C0.526296 2.90215 -0.000488281 4.17392 -0.000488281 5.5C-0.000488281 6.82608 0.526296 8.09785 1.46398 9.03553C2.40166 9.97322 3.67343 10.5 4.99951 10.5Z"
                      fill="#34C759"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_876_1715">
                      <rect
                        width="10"
                        height="10"
                        fill="white"
                        transform="translate(-0.000488281 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Trong ca
              </td>
              <td>
                <svg
                  onClick={showModalListEmployee}
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                >
                  <path
                    d="M21.833 0.5H9.83301C3.83301 0.5 0.833008 3.5 0.833008 9.5V29C0.833008 29.825 1.50801 30.5 2.33301 30.5H21.833C27.833 30.5 30.833 27.5 30.833 21.5V9.5C30.833 3.5 27.833 0.5 21.833 0.5ZM14.498 22.49C14.123 22.865 13.433 23.21 12.923 23.285L9.80301 23.72C9.68301 23.735 9.56301 23.75 9.45801 23.75C8.93301 23.75 8.45301 23.57 8.10801 23.225C7.68801 22.805 7.50801 22.19 7.61301 21.53L8.04801 18.41C8.12301 17.9 8.46801 17.195 8.84301 16.835L14.498 11.18C14.588 11.45 14.708 11.72 14.843 12.02C14.978 12.29 15.113 12.56 15.263 12.815C15.383 13.025 15.518 13.235 15.638 13.385C15.788 13.61 15.938 13.805 16.043 13.91C16.103 14 16.163 14.06 16.178 14.09C16.508 14.465 16.853 14.825 17.183 15.095C17.273 15.185 17.333 15.23 17.348 15.245C17.543 15.395 17.723 15.56 17.903 15.665C18.098 15.815 18.308 15.95 18.518 16.07C18.773 16.22 19.043 16.37 19.328 16.505C19.613 16.64 19.883 16.745 20.153 16.835L14.498 22.49ZM22.658 14.345L21.488 15.515C21.413 15.59 21.308 15.635 21.203 15.635C21.173 15.635 21.113 15.635 21.083 15.62C18.503 14.885 16.448 12.83 15.713 10.25C15.668 10.115 15.713 9.965 15.818 9.86L17.003 8.675C18.938 6.74 20.768 6.785 22.658 8.675C23.618 9.635 24.098 10.565 24.083 11.525C24.083 12.47 23.618 13.385 22.658 14.345Z"
                    fill="#FF8F19"
                  />
                </svg>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Ca 2</td>
              <td>Bóc gỗ</td>
              <td>15:15 - 19:15</td>
              <td> 11/02/2023</td>
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="11"
                  viewBox="0 0 10 11"
                  fill="none"
                >
                  <g clip-path="url(#clip0_876_1742)">
                    <path
                      d="M4.99951 10.5C6.32559 10.5 7.59736 9.97322 8.53505 9.03553C9.47273 8.09785 9.99951 6.82608 9.99951 5.5C9.99951 4.17392 9.47273 2.90215 8.53505 1.96447C7.59736 1.02678 6.32559 0.5 4.99951 0.5C3.67343 0.5 2.40166 1.02678 1.46398 1.96447C0.526296 2.90215 -0.000488281 4.17392 -0.000488281 5.5C-0.000488281 6.82608 0.526296 8.09785 1.46398 9.03553C2.40166 9.97322 3.67343 10.5 4.99951 10.5Z"
                      fill="#C5C5C5"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_876_1742">
                      <rect
                        width="10"
                        height="10"
                        fill="white"
                        transform="translate(-0.000488281 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Chưa đến ca
              </td>
              <td>
                <svg
                  onClick={showModalListEmployee}
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                >
                  <path
                    d="M21.833 0.5H9.83301C3.83301 0.5 0.833008 3.5 0.833008 9.5V29C0.833008 29.825 1.50801 30.5 2.33301 30.5H21.833C27.833 30.5 30.833 27.5 30.833 21.5V9.5C30.833 3.5 27.833 0.5 21.833 0.5ZM14.498 22.49C14.123 22.865 13.433 23.21 12.923 23.285L9.80301 23.72C9.68301 23.735 9.56301 23.75 9.45801 23.75C8.93301 23.75 8.45301 23.57 8.10801 23.225C7.68801 22.805 7.50801 22.19 7.61301 21.53L8.04801 18.41C8.12301 17.9 8.46801 17.195 8.84301 16.835L14.498 11.18C14.588 11.45 14.708 11.72 14.843 12.02C14.978 12.29 15.113 12.56 15.263 12.815C15.383 13.025 15.518 13.235 15.638 13.385C15.788 13.61 15.938 13.805 16.043 13.91C16.103 14 16.163 14.06 16.178 14.09C16.508 14.465 16.853 14.825 17.183 15.095C17.273 15.185 17.333 15.23 17.348 15.245C17.543 15.395 17.723 15.56 17.903 15.665C18.098 15.815 18.308 15.95 18.518 16.07C18.773 16.22 19.043 16.37 19.328 16.505C19.613 16.64 19.883 16.745 20.153 16.835L14.498 22.49ZM22.658 14.345L21.488 15.515C21.413 15.59 21.308 15.635 21.203 15.635C21.173 15.635 21.113 15.635 21.083 15.62C18.503 14.885 16.448 12.83 15.713 10.25C15.668 10.115 15.713 9.965 15.818 9.86L17.003 8.675C18.938 6.74 20.768 6.785 22.658 8.675C23.618 9.635 24.098 10.565 24.083 11.525C24.083 12.47 23.618 13.385 22.658 14.345Z"
                    fill="#FF8F19"
                  />
                </svg>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Ca 1</td>
              <td>Vận chuyển</td>
              <td>07:00 - 15:00</td>
              <td>10/02/2023</td>
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                >
                  <g clip-path="url(#clip0_876_1769)">
                    <path
                      d="M5.49951 10.5C6.82559 10.5 8.09736 9.97322 9.03505 9.03553C9.97273 8.09785 10.4995 6.82608 10.4995 5.5C10.4995 4.17392 9.97273 2.90215 9.03505 1.96447C8.09736 1.02678 6.82559 0.5 5.49951 0.5C4.17343 0.5 2.90166 1.02678 1.96398 1.96447C1.0263 2.90215 0.499512 4.17392 0.499512 5.5C0.499512 6.82608 1.0263 8.09785 1.96398 9.03553C2.90166 9.97322 4.17343 10.5 5.49951 10.5Z"
                      fill="#FC1E1E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_876_1769">
                      <rect
                        width="10"
                        height="10"
                        fill="white"
                        transform="translate(0.499512 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Kết thúc ca
              </td>
              <td>
                <svg
                  onClick={showModalListEmployee}
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                >
                  <path
                    d="M21.833 0.5H9.83301C3.83301 0.5 0.833008 3.5 0.833008 9.5V29C0.833008 29.825 1.50801 30.5 2.33301 30.5H21.833C27.833 30.5 30.833 27.5 30.833 21.5V9.5C30.833 3.5 27.833 0.5 21.833 0.5ZM14.498 22.49C14.123 22.865 13.433 23.21 12.923 23.285L9.80301 23.72C9.68301 23.735 9.56301 23.75 9.45801 23.75C8.93301 23.75 8.45301 23.57 8.10801 23.225C7.68801 22.805 7.50801 22.19 7.61301 21.53L8.04801 18.41C8.12301 17.9 8.46801 17.195 8.84301 16.835L14.498 11.18C14.588 11.45 14.708 11.72 14.843 12.02C14.978 12.29 15.113 12.56 15.263 12.815C15.383 13.025 15.518 13.235 15.638 13.385C15.788 13.61 15.938 13.805 16.043 13.91C16.103 14 16.163 14.06 16.178 14.09C16.508 14.465 16.853 14.825 17.183 15.095C17.273 15.185 17.333 15.23 17.348 15.245C17.543 15.395 17.723 15.56 17.903 15.665C18.098 15.815 18.308 15.95 18.518 16.07C18.773 16.22 19.043 16.37 19.328 16.505C19.613 16.64 19.883 16.745 20.153 16.835L14.498 22.49ZM22.658 14.345L21.488 15.515C21.413 15.59 21.308 15.635 21.203 15.635C21.173 15.635 21.113 15.635 21.083 15.62C18.503 14.885 16.448 12.83 15.713 10.25C15.668 10.115 15.713 9.965 15.818 9.86L17.003 8.675C18.938 6.74 20.768 6.785 22.658 8.675C23.618 9.635 24.098 10.565 24.083 11.525C24.083 12.47 23.618 13.385 22.658 14.345Z"
                    fill="#FF8F19"
                  />
                </svg>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Ca 1</td>
              <td>Dán gỗ</td>
              <td>07:00 - 15:00</td>
              <td> 11/02/2023</td>
              <td>
                <svg
                  onClick={showModalListEmployee}
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="11"
                  viewBox="0 0 10 11"
                  fill="none"
                >
                  <g clip-path="url(#clip0_876_1715)">
                    <path
                      d="M4.99951 10.5C6.32559 10.5 7.59736 9.97322 8.53505 9.03553C9.47273 8.09785 9.99951 6.82608 9.99951 5.5C9.99951 4.17392 9.47273 2.90215 8.53505 1.96447C7.59736 1.02678 6.32559 0.5 4.99951 0.5C3.67343 0.5 2.40166 1.02678 1.46398 1.96447C0.526296 2.90215 -0.000488281 4.17392 -0.000488281 5.5C-0.000488281 6.82608 0.526296 8.09785 1.46398 9.03553C2.40166 9.97322 3.67343 10.5 4.99951 10.5Z"
                      fill="#34C759"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_876_1715">
                      <rect
                        width="10"
                        height="10"
                        fill="white"
                        transform="translate(-0.000488281 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Trong ca
              </td>
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                >
                  <path
                    d="M21.833 0.5H9.83301C3.83301 0.5 0.833008 3.5 0.833008 9.5V29C0.833008 29.825 1.50801 30.5 2.33301 30.5H21.833C27.833 30.5 30.833 27.5 30.833 21.5V9.5C30.833 3.5 27.833 0.5 21.833 0.5ZM14.498 22.49C14.123 22.865 13.433 23.21 12.923 23.285L9.80301 23.72C9.68301 23.735 9.56301 23.75 9.45801 23.75C8.93301 23.75 8.45301 23.57 8.10801 23.225C7.68801 22.805 7.50801 22.19 7.61301 21.53L8.04801 18.41C8.12301 17.9 8.46801 17.195 8.84301 16.835L14.498 11.18C14.588 11.45 14.708 11.72 14.843 12.02C14.978 12.29 15.113 12.56 15.263 12.815C15.383 13.025 15.518 13.235 15.638 13.385C15.788 13.61 15.938 13.805 16.043 13.91C16.103 14 16.163 14.06 16.178 14.09C16.508 14.465 16.853 14.825 17.183 15.095C17.273 15.185 17.333 15.23 17.348 15.245C17.543 15.395 17.723 15.56 17.903 15.665C18.098 15.815 18.308 15.95 18.518 16.07C18.773 16.22 19.043 16.37 19.328 16.505C19.613 16.64 19.883 16.745 20.153 16.835L14.498 22.49ZM22.658 14.345L21.488 15.515C21.413 15.59 21.308 15.635 21.203 15.635C21.173 15.635 21.113 15.635 21.083 15.62C18.503 14.885 16.448 12.83 15.713 10.25C15.668 10.115 15.713 9.965 15.818 9.86L17.003 8.675C18.938 6.74 20.768 6.785 22.658 8.675C23.618 9.635 24.098 10.565 24.083 11.525C24.083 12.47 23.618 13.385 22.658 14.345Z"
                    fill="#FF8F19"
                  />
                </svg>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Ca 2</td>
              <td>Bóc gỗ</td>
              <td>15:15 - 19:15</td>
              <td> 11/02/2023</td>
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="11"
                  viewBox="0 0 10 11"
                  fill="none"
                >
                  <g clip-path="url(#clip0_876_1742)">
                    <path
                      d="M4.99951 10.5C6.32559 10.5 7.59736 9.97322 8.53505 9.03553C9.47273 8.09785 9.99951 6.82608 9.99951 5.5C9.99951 4.17392 9.47273 2.90215 8.53505 1.96447C7.59736 1.02678 6.32559 0.5 4.99951 0.5C3.67343 0.5 2.40166 1.02678 1.46398 1.96447C0.526296 2.90215 -0.000488281 4.17392 -0.000488281 5.5C-0.000488281 6.82608 0.526296 8.09785 1.46398 9.03553C2.40166 9.97322 3.67343 10.5 4.99951 10.5Z"
                      fill="#C5C5C5"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_876_1742">
                      <rect
                        width="10"
                        height="10"
                        fill="white"
                        transform="translate(-0.000488281 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Chưa đến ca
              </td>
              <td>
                <svg
                  onClick={showModalListEmployee}
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                >
                  <path
                    d="M21.833 0.5H9.83301C3.83301 0.5 0.833008 3.5 0.833008 9.5V29C0.833008 29.825 1.50801 30.5 2.33301 30.5H21.833C27.833 30.5 30.833 27.5 30.833 21.5V9.5C30.833 3.5 27.833 0.5 21.833 0.5ZM14.498 22.49C14.123 22.865 13.433 23.21 12.923 23.285L9.80301 23.72C9.68301 23.735 9.56301 23.75 9.45801 23.75C8.93301 23.75 8.45301 23.57 8.10801 23.225C7.68801 22.805 7.50801 22.19 7.61301 21.53L8.04801 18.41C8.12301 17.9 8.46801 17.195 8.84301 16.835L14.498 11.18C14.588 11.45 14.708 11.72 14.843 12.02C14.978 12.29 15.113 12.56 15.263 12.815C15.383 13.025 15.518 13.235 15.638 13.385C15.788 13.61 15.938 13.805 16.043 13.91C16.103 14 16.163 14.06 16.178 14.09C16.508 14.465 16.853 14.825 17.183 15.095C17.273 15.185 17.333 15.23 17.348 15.245C17.543 15.395 17.723 15.56 17.903 15.665C18.098 15.815 18.308 15.95 18.518 16.07C18.773 16.22 19.043 16.37 19.328 16.505C19.613 16.64 19.883 16.745 20.153 16.835L14.498 22.49ZM22.658 14.345L21.488 15.515C21.413 15.59 21.308 15.635 21.203 15.635C21.173 15.635 21.113 15.635 21.083 15.62C18.503 14.885 16.448 12.83 15.713 10.25C15.668 10.115 15.713 9.965 15.818 9.86L17.003 8.675C18.938 6.74 20.768 6.785 22.658 8.675C23.618 9.635 24.098 10.565 24.083 11.525C24.083 12.47 23.618 13.385 22.658 14.345Z"
                    fill="#FF8F19"
                  />
                </svg>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Ca 1</td>
              <td>Vận chuyển</td>
              <td>07:00 - 15:00</td>
              <td>10/02/2023</td>
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                >
                  <g clip-path="url(#clip0_876_1769)">
                    <path
                      d="M5.49951 10.5C6.82559 10.5 8.09736 9.97322 9.03505 9.03553C9.97273 8.09785 10.4995 6.82608 10.4995 5.5C10.4995 4.17392 9.97273 2.90215 9.03505 1.96447C8.09736 1.02678 6.82559 0.5 5.49951 0.5C4.17343 0.5 2.90166 1.02678 1.96398 1.96447C1.0263 2.90215 0.499512 4.17392 0.499512 5.5C0.499512 6.82608 1.0263 8.09785 1.96398 9.03553C2.90166 9.97322 4.17343 10.5 5.49951 10.5Z"
                      fill="#FC1E1E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_876_1769">
                      <rect
                        width="10"
                        height="10"
                        fill="white"
                        transform="translate(0.499512 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Kết thúc ca
              </td>
              <td>
                <svg
                  onClick={showModalListEmployee}
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                >
                  <path
                    d="M21.833 0.5H9.83301C3.83301 0.5 0.833008 3.5 0.833008 9.5V29C0.833008 29.825 1.50801 30.5 2.33301 30.5H21.833C27.833 30.5 30.833 27.5 30.833 21.5V9.5C30.833 3.5 27.833 0.5 21.833 0.5ZM14.498 22.49C14.123 22.865 13.433 23.21 12.923 23.285L9.80301 23.72C9.68301 23.735 9.56301 23.75 9.45801 23.75C8.93301 23.75 8.45301 23.57 8.10801 23.225C7.68801 22.805 7.50801 22.19 7.61301 21.53L8.04801 18.41C8.12301 17.9 8.46801 17.195 8.84301 16.835L14.498 11.18C14.588 11.45 14.708 11.72 14.843 12.02C14.978 12.29 15.113 12.56 15.263 12.815C15.383 13.025 15.518 13.235 15.638 13.385C15.788 13.61 15.938 13.805 16.043 13.91C16.103 14 16.163 14.06 16.178 14.09C16.508 14.465 16.853 14.825 17.183 15.095C17.273 15.185 17.333 15.23 17.348 15.245C17.543 15.395 17.723 15.56 17.903 15.665C18.098 15.815 18.308 15.95 18.518 16.07C18.773 16.22 19.043 16.37 19.328 16.505C19.613 16.64 19.883 16.745 20.153 16.835L14.498 22.49ZM22.658 14.345L21.488 15.515C21.413 15.59 21.308 15.635 21.203 15.635C21.173 15.635 21.113 15.635 21.083 15.62C18.503 14.885 16.448 12.83 15.713 10.25C15.668 10.115 15.713 9.965 15.818 9.86L17.003 8.675C18.938 6.74 20.768 6.785 22.658 8.675C23.618 9.635 24.098 10.565 24.083 11.525C24.083 12.47 23.618 13.385 22.658 14.345Z"
                    fill="#FF8F19"
                  />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
        {isEditing ? (
          <EditEmployee
            isModalOpenListEmployee={isModalOpenListEmployee}
            handleSave={handleSave}
            handleCancelListEmployee={handleCancelListEmployee}
            handleCancel={handleCancel}
          />
        ) : (
          <DetailsEmployee
            isModalOpenListEmployee={isModalOpenListEmployee}
            handleOkListEmployee={handleOkListEmployee}
            handleCancelListEmployee={handleCancelListEmployee}
            handleEdit={handleEdit}
          />
        )}
      </div>
    </>
  );
};
export default ShiftComponent;
