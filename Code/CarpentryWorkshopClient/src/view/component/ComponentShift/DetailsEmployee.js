import React from "react";
import { Input, Modal } from "antd";

const DetailsEmployee = ({
  isModalOpenListEmployee,
  handleOkListEmployee,
  handleCancelListEmployee,
  handleEdit,
}) => {
  return (
    <>
      {/* // chi tiet nhan vien */}
      <Modal
        className="modal"
        open={isModalOpenListEmployee}
        onOk={handleOkListEmployee}
        onCancel={handleCancelListEmployee}
      >
        <div className="modal-add-roleyee-employee modal-shift-all">
          <div className="modal-head-employee modal-shift-head ">
            <h3>Danh sách nhân viên ca 1 ngày 11/02/2023 công việc dán gỗ </h3>
            <svg
              onClick={handleCancelListEmployee}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M26.25 5.48077L16.7308 15L26.25 24.5192L24.5192 26.25L15 16.7308L5.48077 26.25L3.75 24.5192L13.2692 15L3.75 5.48077L5.48077 3.75L15 13.2692L24.5192 3.75L26.25 5.48077Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="body-add-role-employee">
            <table className="table-modal-shift">
              <thead>
                <td>STT</td>
                <td>Tên nhân viên</td>
                <td>Mã số nhân viên</td>
                <td>Chi tiết / Sửa</td>
              </thead>
              <div className="body-table scrollbar" id="style-15">
                <tr>
                  <td>1</td>
                  <td>Nguyễn Văn An</td>
                  <td>1</td>
                  <td>
                    <svg
                      onClick={handleEdit}
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                    >
                      <path
                        d="M10.333 2.5V6.25"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20.333 2.5V6.25"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.70801 11.3633H25.958"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M24.3458 19.7124L19.9208 24.1374C19.7458 24.3124 19.5833 24.6374 19.5458 24.8749L19.3083 26.5624C19.2208 27.1749 19.6458 27.5999 20.2583 27.5124L21.9458 27.2749C22.1833 27.2374 22.5208 27.0749 22.6833 26.8999L27.1083 22.4749C27.8708 21.7124 28.2333 20.8249 27.1083 19.6999C25.9958 18.5874 25.1083 18.9499 24.3458 19.7124Z"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M23.708 20.3496C24.083 21.6996 25.133 22.7496 26.483 23.1246"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.333 27.5H10.333C5.95801 27.5 4.08301 25 4.08301 21.25V10.625C4.08301 6.875 5.95801 4.375 10.333 4.375H20.333C24.708 4.375 26.583 6.875 26.583 10.625V15"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.3271 17.125H15.3383"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.7011 17.125H10.7124"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.7011 20.875H10.7124"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Nguyễn Văn An</td>
                  <td>1</td>
                  <td>
                    <svg
                      onClick={handleEdit}
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                    >
                      <path
                        d="M10.333 2.5V6.25"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20.333 2.5V6.25"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.70801 11.3633H25.958"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M24.3458 19.7124L19.9208 24.1374C19.7458 24.3124 19.5833 24.6374 19.5458 24.8749L19.3083 26.5624C19.2208 27.1749 19.6458 27.5999 20.2583 27.5124L21.9458 27.2749C22.1833 27.2374 22.5208 27.0749 22.6833 26.8999L27.1083 22.4749C27.8708 21.7124 28.2333 20.8249 27.1083 19.6999C25.9958 18.5874 25.1083 18.9499 24.3458 19.7124Z"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M23.708 20.3496C24.083 21.6996 25.133 22.7496 26.483 23.1246"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.333 27.5H10.333C5.95801 27.5 4.08301 25 4.08301 21.25V10.625C4.08301 6.875 5.95801 4.375 10.333 4.375H20.333C24.708 4.375 26.583 6.875 26.583 10.625V15"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.3271 17.125H15.3383"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.7011 17.125H10.7124"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.7011 20.875H10.7124"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Nguyễn Văn An</td>
                  <td>1</td>
                  <td>
                    <svg
                      onClick={handleEdit}
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                    >
                      <path
                        d="M10.333 2.5V6.25"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20.333 2.5V6.25"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.70801 11.3633H25.958"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M24.3458 19.7124L19.9208 24.1374C19.7458 24.3124 19.5833 24.6374 19.5458 24.8749L19.3083 26.5624C19.2208 27.1749 19.6458 27.5999 20.2583 27.5124L21.9458 27.2749C22.1833 27.2374 22.5208 27.0749 22.6833 26.8999L27.1083 22.4749C27.8708 21.7124 28.2333 20.8249 27.1083 19.6999C25.9958 18.5874 25.1083 18.9499 24.3458 19.7124Z"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M23.708 20.3496C24.083 21.6996 25.133 22.7496 26.483 23.1246"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.333 27.5H10.333C5.95801 27.5 4.08301 25 4.08301 21.25V10.625C4.08301 6.875 5.95801 4.375 10.333 4.375H20.333C24.708 4.375 26.583 6.875 26.583 10.625V15"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.3271 17.125H15.3383"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.7011 17.125H10.7124"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.7011 20.875H10.7124"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Nguyễn Văn An</td>
                  <td>1</td>
                  <td>
                    <svg
                      onClick={handleEdit}
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                    >
                      <path
                        d="M10.333 2.5V6.25"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20.333 2.5V6.25"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.70801 11.3633H25.958"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M24.3458 19.7124L19.9208 24.1374C19.7458 24.3124 19.5833 24.6374 19.5458 24.8749L19.3083 26.5624C19.2208 27.1749 19.6458 27.5999 20.2583 27.5124L21.9458 27.2749C22.1833 27.2374 22.5208 27.0749 22.6833 26.8999L27.1083 22.4749C27.8708 21.7124 28.2333 20.8249 27.1083 19.6999C25.9958 18.5874 25.1083 18.9499 24.3458 19.7124Z"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M23.708 20.3496C24.083 21.6996 25.133 22.7496 26.483 23.1246"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.333 27.5H10.333C5.95801 27.5 4.08301 25 4.08301 21.25V10.625C4.08301 6.875 5.95801 4.375 10.333 4.375H20.333C24.708 4.375 26.583 6.875 26.583 10.625V15"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.3271 17.125H15.3383"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.7011 17.125H10.7124"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.7011 20.875H10.7124"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Nguyễn Văn An</td>
                  <td>1</td>
                  <td>
                    <svg
                      onClick={handleEdit}
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                    >
                      <path
                        d="M10.333 2.5V6.25"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20.333 2.5V6.25"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.70801 11.3633H25.958"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M24.3458 19.7124L19.9208 24.1374C19.7458 24.3124 19.5833 24.6374 19.5458 24.8749L19.3083 26.5624C19.2208 27.1749 19.6458 27.5999 20.2583 27.5124L21.9458 27.2749C22.1833 27.2374 22.5208 27.0749 22.6833 26.8999L27.1083 22.4749C27.8708 21.7124 28.2333 20.8249 27.1083 19.6999C25.9958 18.5874 25.1083 18.9499 24.3458 19.7124Z"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M23.708 20.3496C24.083 21.6996 25.133 22.7496 26.483 23.1246"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.333 27.5H10.333C5.95801 27.5 4.08301 25 4.08301 21.25V10.625C4.08301 6.875 5.95801 4.375 10.333 4.375H20.333C24.708 4.375 26.583 6.875 26.583 10.625V15"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.3271 17.125H15.3383"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.7011 17.125H10.7124"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.7011 20.875H10.7124"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Nguyễn Văn An</td>
                  <td>1</td>
                  <td>
                    <svg
                      onClick={handleEdit}
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                    >
                      <path
                        d="M10.333 2.5V6.25"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20.333 2.5V6.25"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.70801 11.3633H25.958"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M24.3458 19.7124L19.9208 24.1374C19.7458 24.3124 19.5833 24.6374 19.5458 24.8749L19.3083 26.5624C19.2208 27.1749 19.6458 27.5999 20.2583 27.5124L21.9458 27.2749C22.1833 27.2374 22.5208 27.0749 22.6833 26.8999L27.1083 22.4749C27.8708 21.7124 28.2333 20.8249 27.1083 19.6999C25.9958 18.5874 25.1083 18.9499 24.3458 19.7124Z"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M23.708 20.3496C24.083 21.6996 25.133 22.7496 26.483 23.1246"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.333 27.5H10.333C5.95801 27.5 4.08301 25 4.08301 21.25V10.625C4.08301 6.875 5.95801 4.375 10.333 4.375H20.333C24.708 4.375 26.583 6.875 26.583 10.625V15"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.3271 17.125H15.3383"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.7011 17.125H10.7124"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.7011 20.875H10.7124"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Nguyễn Văn An</td>
                  <td>1</td>
                  <td>
                    <svg
                      onClick={handleEdit}
                      xmlns="http://www.w3.org/2000/svg"
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                    >
                      <path
                        d="M10.333 2.5V6.25"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20.333 2.5V6.25"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.70801 11.3633H25.958"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M24.3458 19.7124L19.9208 24.1374C19.7458 24.3124 19.5833 24.6374 19.5458 24.8749L19.3083 26.5624C19.2208 27.1749 19.6458 27.5999 20.2583 27.5124L21.9458 27.2749C22.1833 27.2374 22.5208 27.0749 22.6833 26.8999L27.1083 22.4749C27.8708 21.7124 28.2333 20.8249 27.1083 19.6999C25.9958 18.5874 25.1083 18.9499 24.3458 19.7124Z"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M23.708 20.3496C24.083 21.6996 25.133 22.7496 26.483 23.1246"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.333 27.5H10.333C5.95801 27.5 4.08301 25 4.08301 21.25V10.625C4.08301 6.875 5.95801 4.375 10.333 4.375H20.333C24.708 4.375 26.583 6.875 26.583 10.625V15"
                        stroke="#FF8F19"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.3271 17.125H15.3383"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.7011 17.125H10.7124"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.7011 20.875H10.7124"
                        stroke="#FF8F19"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </td>
                </tr>
              </div>

              <thead className="thead-last"></thead>
            </table>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default DetailsEmployee;
