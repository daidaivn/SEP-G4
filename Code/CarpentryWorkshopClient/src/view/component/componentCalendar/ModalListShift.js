import React from "react";
import { Input, Modal } from "antd";

const ModalListShift = ({
  isModalOpenListShift,
  handleOkListShift,
  handleCancelListShift,
  showModalDetail,
  allWorks,
  fetchWorkDetailById,
}) => {
  return (
    <div className="modal-shift">
      <Modal
        className="modal-shift"
        open={isModalOpenListShift}
        onOk={handleOkListShift}
        onCancel={handleCancelListShift}
      >
        <div className="modal-listShift">
          <div className="head-listShift">
            <div className="text-head">
              <p>Danh sách công việc</p>
            </div>
            <svg
              onClick={handleCancelListShift}
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
          <div className="body-listShift">
            <div className="list-table-all">
              <table className="list-table">
                <thead>
                  <div className="head1-table">
                    <p className="head1">STT</p>
                  </div>
                  <div className="head2-table">
                    <p className="head2">Tên công việc</p>
                  </div>
                  <div className="head2-table">
                    <p className="head2">Nhóm nhận việc</p>
                  </div>
                  <div className="head2-table head-fix">
                    <p className="head2">Trạng thái công việc</p>
                  </div>
                  <div className="head3-table">
                    <p className="head3">Chi tiết</p>
                  </div>
                </thead>
                <tbody className="scrollbar" id="style-15">
                  {Array.isArray(allWorks) &&
                    allWorks.map((work, index) => (
                      <tr>
                        <div className="item1">
                          <p>{index + 1}</p>
                        </div>
                        <div className="item2">
                          <p>{work.workName}</p>
                        </div>
                        <div className="item2">
                          {work.teamName && work.teamName.length > 0 ? (
                            <p>{work.teamName.join(", ")}</p>
                          ) : (
                            <p>Không có nhóm</p>
                          )}
                        </div>
                        <div className="item3">
                          {work.status === "Done" ? (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="10"
                                viewBox="0 0 11 10"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_1195_1030)">
                                  <path
                                    d="M5.83301 10C7.15909 10 8.43086 9.47322 9.36854 8.53553C10.3062 7.59785 10.833 6.32608 10.833 5C10.833 3.67392 10.3062 2.40215 9.36854 1.46447C8.43086 0.526784 7.15909 0 5.83301 0C4.50693 0 3.23516 0.526784 2.29747 1.46447C1.35979 2.40215 0.833008 3.67392 0.833008 5C0.833008 6.32608 1.35979 7.59785 2.29747 8.53553C3.23516 9.47322 4.50693 10 5.83301 10Z"
                                    fill="#34C759"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1195_1030">
                                    <rect
                                      width="10"
                                      height="10"
                                      fill="white"
                                      transform="translate(0.833008)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                              <p>Hoàn thành</p>
                            </>
                          ) : work.status === "WorkNotStart" ? (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="10"
                                viewBox="0 0 11 10"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_1195_1030)">
                                  <path
                                    d="M5.83301 10C7.15909 10 8.43086 9.47322 9.36854 8.53553C10.3062 7.59785 10.833 6.32608 10.833 5C10.833 3.67392 10.3062 2.40215 9.36854 1.46447C8.43086 0.526784 7.15909 0 5.83301 0C4.50693 0 3.23516 0.526784 2.29747 1.46447C1.35979 2.40215 0.833008 3.67392 0.833008 5C0.833008 6.32608 1.35979 7.59785 2.29747 8.53553C3.23516 9.47322 4.50693 10 5.83301 10Z"
                                    fill="#34C759"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1195_1030">
                                    <rect
                                      width="10"
                                      height="10"
                                      fill="white"
                                      transform="translate(0.833008)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                              <p>Công việc chưa tới thời gian</p>
                            </>
                          ) : work.status === "WorkEnd" ? (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="10"
                                viewBox="0 0 11 10"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_1195_1030)">
                                  <path
                                    d="M5.83301 10C7.15909 10 8.43086 9.47322 9.36854 8.53553C10.3062 7.59785 10.833 6.32608 10.833 5C10.833 3.67392 10.3062 2.40215 9.36854 1.46447C8.43086 0.526784 7.15909 0 5.83301 0C4.50693 0 3.23516 0.526784 2.29747 1.46447C1.35979 2.40215 0.833008 3.67392 0.833008 5C0.833008 6.32608 1.35979 7.59785 2.29747 8.53553C3.23516 9.47322 4.50693 10 5.83301 10Z"
                                    fill="#34C759"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1195_1030">
                                    <rect
                                      width="10"
                                      height="10"
                                      fill="white"
                                      transform="translate(0.833008)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                              <p>Công việc kết thúc</p>
                            </>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="10"
                                viewBox="0 0 11 10"
                                fill="none"
                              >
                                <g clip-path="url(#clip0_1301_1041)">
                                  <path
                                    d="M5.83301 10C7.15909 10 8.43086 9.47322 9.36854 8.53553C10.3062 7.59785 10.833 6.32608 10.833 5C10.833 3.67392 10.3062 2.40215 9.36854 1.46447C8.43086 0.526784 7.15909 0 5.83301 0C4.50693 0 3.23516 0.526784 2.29747 1.46447C1.35979 2.40215 0.833008 3.67392 0.833008 5C0.833008 6.32608 1.35979 7.59785 2.29747 8.53553C3.23516 9.47322 4.50693 10 5.83301 10Z"
                                    fill="#FC1E1E"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1301_1041">
                                    <rect
                                      width="10"
                                      height="10"
                                      fill="white"
                                      transform="translate(0.833008)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                              <p>Chưa hoàn thành</p>
                            </>
                          )}
                        </div>
                        <div
                          className="item4"
                          onClick={() => fetchWorkDetailById(work.workId)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <path
                              d="M26.5625 11.4371C23.675 6.89961 19.45 4.28711 15 4.28711C12.775 4.28711 10.6125 4.93711 8.6375 6.14961C6.6625 7.37461 4.8875 9.16211 3.4375 11.4371C2.1875 13.3996 2.1875 16.5871 3.4375 18.5496C6.325 23.0996 10.55 25.6996 15 25.6996C17.225 25.6996 19.3875 25.0496 21.3625 23.8371C23.3375 22.6121 25.1125 20.8246 26.5625 18.5496C27.8125 16.5996 27.8125 13.3996 26.5625 11.4371ZM15 20.0496C12.2 20.0496 9.95 17.7871 9.95 14.9996C9.95 12.2121 12.2 9.94961 15 9.94961C17.8 9.94961 20.05 12.2121 20.05 14.9996C20.05 17.7871 17.8 20.0496 15 20.0496Z"
                              fill="#3A5A40"
                            />
                            <path
                              d="M15 11.4258C13.0375 11.4258 11.4375 13.0258 11.4375 15.0008C11.4375 16.9633 13.0375 18.5633 15 18.5633C16.9625 18.5633 18.575 16.9633 18.575 15.0008C18.575 13.0383 16.9625 11.4258 15 11.4258Z"
                              fill="#3A5A40"
                            />
                          </svg>
                        </div>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalListShift;
