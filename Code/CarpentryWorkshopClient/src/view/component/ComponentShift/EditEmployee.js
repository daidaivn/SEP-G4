import React from "react";
import { Input, Modal } from "antd";

const EditEmployee = ({
  isModalOpenListEmployee,
  handleSave,
  handleCancelListEmployee,
  handleCancel,
}) => {
  return (
    <>
      {/* //chinh sua nhan vien */}
      <Modal
        className="modal"
        open={isModalOpenListEmployee}
        onOk={handleSave}
        onCancel={handleCancelListEmployee}
      >
        <div className="modal-add-roleyee-employee modal-shift-all">
          <div className="modal-head-employee modal-shift-head ">
            <h3>Chỉnh sửa nhân viên ca 1 ngày 11/02/2023 công việc dán gỗ</h3>
            <svg
              onClick={handleCancel}
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
                <td>Trạng thái</td>
                <td>Giờ</td>
              </thead>
              <div
                className="body-table body-table-edit scrollbar"
                id="style-15"
              >
                <tr>
                  <td>1</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="10"
                      viewBox="0 0 11 10"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_900_839)">
                        <path
                          d="M5.5 10C6.82608 10 8.09785 9.47322 9.03553 8.53553C9.97322 7.59785 10.5 6.32608 10.5 5C10.5 3.67392 9.97322 2.40215 9.03553 1.46447C8.09785 0.526784 6.82608 0 5.5 0C4.17392 0 2.90215 0.526784 1.96447 1.46447C1.02678 2.40215 0.5 3.67392 0.5 5C0.5 6.32608 1.02678 7.59785 1.96447 8.53553C2.90215 9.47322 4.17392 10 5.5 10Z"
                          fill="#34C759"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_900_839">
                          <rect
                            width="10"
                            height="10"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Bắt đầu
                  </td>
                  <td>
                    <Input type="date"></Input>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="10"
                      viewBox="0 0 11 10"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_900_841)">
                        <path
                          d="M5.5 10C6.82608 10 8.09785 9.47322 9.03553 8.53553C9.97322 7.59785 10.5 6.32608 10.5 5C10.5 3.67392 9.97322 2.40215 9.03553 1.46447C8.09785 0.526784 6.82608 0 5.5 0C4.17392 0 2.90215 0.526784 1.96447 1.46447C1.02678 2.40215 0.5 3.67392 0.5 5C0.5 6.32608 1.02678 7.59785 1.96447 8.53553C2.90215 9.47322 4.17392 10 5.5 10Z"
                          fill="#FC1E1E"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_900_841">
                          <rect
                            width="10"
                            height="10"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Ngưng
                  </td>
                  <td>
                    <Input type="date"></Input>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="10"
                      viewBox="0 0 11 10"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_900_839)">
                        <path
                          d="M5.5 10C6.82608 10 8.09785 9.47322 9.03553 8.53553C9.97322 7.59785 10.5 6.32608 10.5 5C10.5 3.67392 9.97322 2.40215 9.03553 1.46447C8.09785 0.526784 6.82608 0 5.5 0C4.17392 0 2.90215 0.526784 1.96447 1.46447C1.02678 2.40215 0.5 3.67392 0.5 5C0.5 6.32608 1.02678 7.59785 1.96447 8.53553C2.90215 9.47322 4.17392 10 5.5 10Z"
                          fill="#34C759"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_900_839">
                          <rect
                            width="10"
                            height="10"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Bắt đầu
                  </td>
                  <td>
                    <Input type="date"></Input>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="10"
                      viewBox="0 0 11 10"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_900_841)">
                        <path
                          d="M5.5 10C6.82608 10 8.09785 9.47322 9.03553 8.53553C9.97322 7.59785 10.5 6.32608 10.5 5C10.5 3.67392 9.97322 2.40215 9.03553 1.46447C8.09785 0.526784 6.82608 0 5.5 0C4.17392 0 2.90215 0.526784 1.96447 1.46447C1.02678 2.40215 0.5 3.67392 0.5 5C0.5 6.32608 1.02678 7.59785 1.96447 8.53553C2.90215 9.47322 4.17392 10 5.5 10Z"
                          fill="#FC1E1E"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_900_841">
                          <rect
                            width="10"
                            height="10"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Ngưng
                  </td>
                  <td>
                    <Input type="date"></Input>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="10"
                      viewBox="0 0 11 10"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_900_839)">
                        <path
                          d="M5.5 10C6.82608 10 8.09785 9.47322 9.03553 8.53553C9.97322 7.59785 10.5 6.32608 10.5 5C10.5 3.67392 9.97322 2.40215 9.03553 1.46447C8.09785 0.526784 6.82608 0 5.5 0C4.17392 0 2.90215 0.526784 1.96447 1.46447C1.02678 2.40215 0.5 3.67392 0.5 5C0.5 6.32608 1.02678 7.59785 1.96447 8.53553C2.90215 9.47322 4.17392 10 5.5 10Z"
                          fill="#34C759"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_900_839">
                          <rect
                            width="10"
                            height="10"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Bắt đầu
                  </td>
                  <td>
                    <Input type="date"></Input>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="10"
                      viewBox="0 0 11 10"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_900_841)">
                        <path
                          d="M5.5 10C6.82608 10 8.09785 9.47322 9.03553 8.53553C9.97322 7.59785 10.5 6.32608 10.5 5C10.5 3.67392 9.97322 2.40215 9.03553 1.46447C8.09785 0.526784 6.82608 0 5.5 0C4.17392 0 2.90215 0.526784 1.96447 1.46447C1.02678 2.40215 0.5 3.67392 0.5 5C0.5 6.32608 1.02678 7.59785 1.96447 8.53553C2.90215 9.47322 4.17392 10 5.5 10Z"
                          fill="#FC1E1E"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_900_841">
                          <rect
                            width="10"
                            height="10"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Ngưng
                  </td>
                  <td>
                    <Input type="date"></Input>
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

export default EditEmployee;
