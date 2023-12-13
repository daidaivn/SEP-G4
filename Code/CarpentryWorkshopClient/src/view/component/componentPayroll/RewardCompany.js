import React, { useState, useEffect } from "react";
import { Input, Modal } from "antd";

const RewardCompany = ({
  isModalOpenRewardCompany,
  handleOkRewardCompany,
  handleCancelRewardCompany,
  showModalRewardPersonal,
  showModalRewardAll,
  showModalHoliday,
  reward,
  date,
  setDate,
}) => {
  let tableIndex = 0;
  return (
    <>
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
                <td className="last">Chỉnh sửa</td>
              </thead>
              {reward &&
              reward.personalRewardList &&
              Array.isArray(reward.personalRewardList) &&
              reward.personalRewardList.length === 0 &&
              reward.companyRewardList &&
              Array.isArray(reward.companyRewardList) &&
              reward.companyRewardList.length === 0 &&
              reward.specialOcationList &&
              Array.isArray(reward.specialOcationList) &&
              reward.specialOcationList.length === 0 ? (
                <p>Thông tin chưa sẵn sàng hoặc không tồn tại.</p>
              ) : (
                <React.Fragment>
                  {Array.isArray(reward.specialOcationList) &&
                    reward.specialOcationList.map((item, index) => (
                      // Render individual items here
                      <div key={index} className="item-reward">
                        <p className="stt">{(tableIndex = tableIndex + 1)}</p>
                        <div className="child-reward">
                          <p>{item.occasionType}</p>
                        </div>
                        <div className="child-reward">
                          <p>{item.amount}VNĐ</p>
                        </div>
                        <div className="child-reward">
                          <p>{item.beneficiary}</p>
                        </div>
                        <div className="child-reward last1">
                          <p>{item.occasionDateString}</p>
                        </div>
                        <div
                          className="child-reward last1"
                          onClick={showModalHoliday}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="31"
                            height="30"
                            viewBox="0 0 31 30"
                            fill="none"
                          >
                            <path
                              d="M21.75 0H9.75C3.75 0 0.75 3 0.75 9V28.5C0.75 29.325 1.425 30 2.25 30H21.75C27.75 30 30.75 27 30.75 21V9C30.75 3 27.75 0 21.75 0ZM14.415 21.99C14.04 22.365 13.35 22.71 12.84 22.785L9.72 23.22C9.6 23.235 9.48 23.25 9.375 23.25C8.85 23.25 8.37 23.07 8.025 22.725C7.605 22.305 7.425 21.69 7.53 21.03L7.965 17.91C8.04 17.4 8.385 16.695 8.76 16.335L14.415 10.68C14.505 10.95 14.625 11.22 14.76 11.52C14.895 11.79 15.03 12.06 15.18 12.315C15.3 12.525 15.435 12.735 15.555 12.885C15.705 13.11 15.855 13.305 15.96 13.41C16.02 13.5 16.08 13.56 16.095 13.59C16.425 13.965 16.77 14.325 17.1 14.595C17.19 14.685 17.25 14.73 17.265 14.745C17.46 14.895 17.64 15.06 17.82 15.165C18.015 15.315 18.225 15.45 18.435 15.57C18.69 15.72 18.96 15.87 19.245 16.005C19.53 16.14 19.8 16.245 20.07 16.335L14.415 21.99ZM22.575 13.845L21.405 15.015C21.33 15.09 21.225 15.135 21.12 15.135C21.09 15.135 21.03 15.135 21 15.12C18.42 14.385 16.365 12.33 15.63 9.75C15.585 9.615 15.63 9.465 15.735 9.36L16.92 8.175C18.855 6.24 20.685 6.285 22.575 8.175C23.535 9.135 24.015 10.065 24 11.025C24 11.97 23.535 12.885 22.575 13.845Z"
                              fill="#FF8F19"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  {Array.isArray(reward.companyRewardList) &&
                    reward.companyRewardList.map((item, index) => (
                      // Render individual items here
                      <div key={index} className="item-reward">
                        <p className="stt">{(tableIndex = tableIndex + 1)}</p>
                        <div className="child-reward">
                          <p>{item.bonusName}</p>
                        </div>
                        <div className="child-reward">
                          <p>{item.bonusAmount}VNĐ</p>
                        </div>
                        <div className="child-reward">
                          <p>{item.beneficiary}</p>
                        </div>
                        <div className="child-reward last1">
                          <p>{item.bonusDatestring}</p>
                        </div>
                        <div
                          className="child-reward last1"
                          onClick={showModalRewardAll}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="31"
                            height="30"
                            viewBox="0 0 31 30"
                            fill="none"
                          >
                            <path
                              d="M21.75 0H9.75C3.75 0 0.75 3 0.75 9V28.5C0.75 29.325 1.425 30 2.25 30H21.75C27.75 30 30.75 27 30.75 21V9C30.75 3 27.75 0 21.75 0ZM14.415 21.99C14.04 22.365 13.35 22.71 12.84 22.785L9.72 23.22C9.6 23.235 9.48 23.25 9.375 23.25C8.85 23.25 8.37 23.07 8.025 22.725C7.605 22.305 7.425 21.69 7.53 21.03L7.965 17.91C8.04 17.4 8.385 16.695 8.76 16.335L14.415 10.68C14.505 10.95 14.625 11.22 14.76 11.52C14.895 11.79 15.03 12.06 15.18 12.315C15.3 12.525 15.435 12.735 15.555 12.885C15.705 13.11 15.855 13.305 15.96 13.41C16.02 13.5 16.08 13.56 16.095 13.59C16.425 13.965 16.77 14.325 17.1 14.595C17.19 14.685 17.25 14.73 17.265 14.745C17.46 14.895 17.64 15.06 17.82 15.165C18.015 15.315 18.225 15.45 18.435 15.57C18.69 15.72 18.96 15.87 19.245 16.005C19.53 16.14 19.8 16.245 20.07 16.335L14.415 21.99ZM22.575 13.845L21.405 15.015C21.33 15.09 21.225 15.135 21.12 15.135C21.09 15.135 21.03 15.135 21 15.12C18.42 14.385 16.365 12.33 15.63 9.75C15.585 9.615 15.63 9.465 15.735 9.36L16.92 8.175C18.855 6.24 20.685 6.285 22.575 8.175C23.535 9.135 24.015 10.065 24 11.025C24 11.97 23.535 12.885 22.575 13.845Z"
                              fill="#FF8F19"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  {Array.isArray(reward.personalRewardList) &&
                    reward.personalRewardList.map((item, index) => (
                      // Render individual items here
                      <div key={index} className="item-reward">
                        <p className="stt">{(tableIndex = tableIndex + 1)}</p>
                        <div className="child-reward">
                          <p>{item.bonusName}</p>
                        </div>
                        <div className="child-reward">
                          <p>{item.bonusAmount}VNĐ</p>
                        </div>
                        <div className="child-reward">
                          <p>{item.beneficiary}</p>
                        </div>
                        <div className="child-reward last1">
                          <p>{item.bonusDatestring}</p>
                        </div>
                        <div
                          className="child-reward last1"
                          onClick={showModalRewardPersonal}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="31"
                            height="30"
                            viewBox="0 0 31 30"
                            fill="none"
                          >
                            <path
                              d="M21.75 0H9.75C3.75 0 0.75 3 0.75 9V28.5C0.75 29.325 1.425 30 2.25 30H21.75C27.75 30 30.75 27 30.75 21V9C30.75 3 27.75 0 21.75 0ZM14.415 21.99C14.04 22.365 13.35 22.71 12.84 22.785L9.72 23.22C9.6 23.235 9.48 23.25 9.375 23.25C8.85 23.25 8.37 23.07 8.025 22.725C7.605 22.305 7.425 21.69 7.53 21.03L7.965 17.91C8.04 17.4 8.385 16.695 8.76 16.335L14.415 10.68C14.505 10.95 14.625 11.22 14.76 11.52C14.895 11.79 15.03 12.06 15.18 12.315C15.3 12.525 15.435 12.735 15.555 12.885C15.705 13.11 15.855 13.305 15.96 13.41C16.02 13.5 16.08 13.56 16.095 13.59C16.425 13.965 16.77 14.325 17.1 14.595C17.19 14.685 17.25 14.73 17.265 14.745C17.46 14.895 17.64 15.06 17.82 15.165C18.015 15.315 18.225 15.45 18.435 15.57C18.69 15.72 18.96 15.87 19.245 16.005C19.53 16.14 19.8 16.245 20.07 16.335L14.415 21.99ZM22.575 13.845L21.405 15.015C21.33 15.09 21.225 15.135 21.12 15.135C21.09 15.135 21.03 15.135 21 15.12C18.42 14.385 16.365 12.33 15.63 9.75C15.585 9.615 15.63 9.465 15.735 9.36L16.92 8.175C18.855 6.24 20.685 6.285 22.575 8.175C23.535 9.135 24.015 10.065 24 11.025C24 11.97 23.535 12.885 22.575 13.845Z"
                              fill="#FF8F19"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                </React.Fragment>
              )}
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
              {/* show modal Thưởng toàn thể công ty */}
              <span className="btn-reward" onClick={showModalHoliday}>
                Hiếu hỉ
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default RewardCompany;
