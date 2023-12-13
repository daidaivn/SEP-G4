import React from "react";
import { Input, Modal } from "antd";

const ModalListShift = ({
  isModalOpenListShift,
  handleOkListShift,
  handleCancelListShift,
  allWorks,
  handlegetDataDetail,
  setActionWork,
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
                    <p className="head2">Thời gian công việc</p>
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
                            <p>{work.date}</p>
                          </>
                        </div>
                        {work.status === "WorkNotStart" ? (
                          <div
                            className="item4"
                            onClick={() => {
                              handlegetDataDetail(work.workId, work.status);
                              setActionWork("detailWork");
                            }}
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
                        ) : (
                          <div
                            className="item4"
                            onClick={() => {
                              setActionWork("viewWorkList");
                              handlegetDataDetail(work.workId, work.status);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M21.2699 9.18029C20.9799 8.72029 20.6699 8.29029 20.3499 7.89029C19.9799 7.42029 19.2799 7.38029 18.8599 7.80029L15.8599 10.8003C16.0799 11.4603 16.1199 12.2203 15.9199 13.0103C15.5699 14.4203 14.4299 15.5603 13.0199 15.9103C12.2299 16.1103 11.4699 16.0703 10.8099 15.8503C10.8099 15.8503 9.37995 17.2803 8.34995 18.3103C7.84995 18.8103 8.00995 19.6903 8.67995 19.9503C9.74995 20.3603 10.8599 20.5703 11.9999 20.5703C13.7799 20.5703 15.5099 20.0503 17.0899 19.0803C18.6999 18.0803 20.1499 16.6103 21.3199 14.7403C22.2699 13.2303 22.2199 10.6903 21.2699 9.18029Z"
                                fill="#80808F"
                              />
                              <path
                                d="M14.0201 9.98062L9.98014 14.0206C9.47014 13.5006 9.14014 12.7806 9.14014 12.0006C9.14014 10.4306 10.4201 9.14062 12.0001 9.14062C12.7801 9.14062 13.5001 9.47062 14.0201 9.98062Z"
                                fill="#80808F"
                              />
                              <path
                                d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
                                fill="#80808F"
                              />
                              <path
                                d="M14.8601 12.0001C14.8601 13.5701 13.5801 14.8601 12.0001 14.8601C11.9401 14.8601 11.8901 14.8601 11.8301 14.8401L14.8401 11.8301C14.8601 11.8901 14.8601 11.9401 14.8601 12.0001Z"
                                fill="#80808F"
                              />
                              <path
                                d="M21.7699 2.23086C21.4699 1.93086 20.9799 1.93086 20.6799 2.23086L2.22988 20.6909C1.92988 20.9909 1.92988 21.4809 2.22988 21.7809C2.37988 21.9209 2.56988 22.0009 2.76988 22.0009C2.96988 22.0009 3.15988 21.9209 3.30988 21.7709L21.7699 3.31086C22.0799 3.01086 22.0799 2.53086 21.7699 2.23086Z"
                                fill="#80808F"
                              />
                            </svg>
                          </div>
                        )}
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
