import React from "react";
import { Modal } from "antd";

const DetailModal = ({
  isModalOpenDetail,
  handleOkDetail,
  handleCancelDetail,
  teamName,
  detailTeamID,
  showModalChange,
  showModalChangeName,
  handleGetAllMember,
  DelteMemberForTeam,
  cancelTeamMember,
}) => {
  return (
    <div className="detail-group-all">
      <Modal
        open={isModalOpenDetail}
        className="modal-detail-group"
        on
        Ok={handleOkDetail}
        onCancel={handleCancelDetail}
        width={566}
      >
        <div className="">
          <div className="modal-head">
            {" "}
            <h3>{detailTeamID.teamName}</h3>
          </div>
          <div className=" modal-group">
            <div className="info-detail-group">
              <div className="info-body-group group-modal-responsive">
                {detailTeamID.shiftManager ||
                detailTeamID.shiftAssistant ||
                (detailTeamID.staff && detailTeamID.staff.length > 0) ? (
                  <>
                    <div className="box1-modal-group">
                      <div className="box1-child">
                        <p className="child1-group">STT</p>
                      </div>
                      <div className="box2-child">
                        <p className="child2-group">Chức vụ</p>
                      </div>
                      <div className="box3-child">
                        <p className="child3-group">Họ và tên</p>
                      </div>
                      <div className="box5-child">
                        <p className="child5-group">Đổi nhóm</p>
                      </div>
                      <div className="box4-child">
                        <p className="child4-group">Xóa khỏi nhóm</p>
                      </div>
                    </div>
                    <div className="box2-modal-group"></div>
                    <div className="department-scroll scrollbar" id="style-15">
                      {detailTeamID.shiftManager ? (
                        <div className="box1-modal-group box3-group">
                          <div className="box1-child">
                            <p className="child1-group">1</p>
                          </div>
                          <div className="box2-child">
                            <p className="child2-group">Ca trưởng</p>
                          </div>
                          <div className="box3-child">
                            <div className="child3-group">
                              <p>
                                {detailTeamID.shiftManager
                                  ? detailTeamID.shiftManager.fullName
                                  : ""}
                              </p>
                            </div>
                          </div>
                          <div
                            className="box5-child"
                            onClick={() => {
                              if (detailTeamID.shiftManager) {
                                showModalChange(
                                  detailTeamID.shiftManager.employeeId,
                                  detailTeamID.shiftManager.fullName,
                                  1
                                );
                              }
                            }}
                          >
                            <p className="child5-group">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                              >
                                <path
                                  d="M20.2375 2.5H9.7625C5.2125 2.5 2.5 5.2125 2.5 9.7625V20.225C2.5 24.7875 5.2125 27.5 9.7625 27.5H20.225C24.775 27.5 27.4875 24.7875 27.4875 20.2375V9.7625C27.5 5.2125 24.7875 2.5 20.2375 2.5ZM22.3125 17.625C22.2625 17.7375 22.2 17.8375 22.1125 17.925L18.3125 21.725C18.125 21.9125 17.8875 22 17.65 22C17.4125 22 17.175 21.9125 16.9875 21.725C16.625 21.3625 16.625 20.7625 16.9875 20.4L19.1875 18.2H8.5625C8.05 18.2 7.625 17.775 7.625 17.2625C7.625 16.75 8.05 16.325 8.5625 16.325H21.45C21.575 16.325 21.6875 16.35 21.8125 16.4C22.0375 16.5 22.225 16.675 22.325 16.9125C22.4 17.1375 22.4 17.4 22.3125 17.625ZM21.4375 13.6625H8.5625C8.4375 13.6625 8.325 13.6375 8.2 13.5875C7.975 13.4875 7.7875 13.3125 7.6875 13.075C7.5875 12.85 7.5875 12.5875 7.6875 12.3625C7.7375 12.25 7.8 12.15 7.8875 12.0625L11.6875 8.2625C12.05 7.9 12.65 7.9 13.0125 8.2625C13.375 8.625 13.375 9.225 13.0125 9.5875L10.825 11.7875H21.45C21.9625 11.7875 22.3875 12.2125 22.3875 12.725C22.3875 13.2375 21.9625 13.6625 21.4375 13.6625Z"
                                  fill="#3A5A40"
                                />
                              </svg>
                            </p>
                          </div>
                          <div className="box4-child">
                            <p className="child4-group">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M7 5V4C7 2.34315 8.34315 1 10 1H14C15.6569 1 17 2.34315 17 4V5H22V7H19.9355L19.1222 19.1996C19.0172 20.7755 17.7083 22 16.1289 22H7.87108C6.29169 22 4.98279 20.7755 4.87773 19.1996L4.06442 7H2V5H7ZM9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V5H9V4ZM9 9V18H11V9H9ZM13 9V18H15V9H13Z"
                                  fill="#FC1E1E"
                                />
                              </svg>
                            </p>
                          </div>
                        </div>
                      ) : null}
                      {detailTeamID.shiftAssistant ? (
                        <div className="box1-modal-group box3-group">
                          <div className="box1-child">
                            <p className="child1-group">2</p>
                          </div>
                          <div className="box2-child">
                            <p className="child2-group">Ca phó</p>
                          </div>
                          <div className="box3-child">
                            <div className="child3-group">
                              <p>{detailTeamID.shiftAssistant.fullName}</p>
                            </div>
                          </div>
                          <div
                            className="box5-child"
                            onClick={() => {
                              if (detailTeamID.shiftAssistant) {
                                showModalChange(
                                  detailTeamID.shiftAssistant.employeeId,
                                  detailTeamID.shiftAssistant.fullName,
                                  2
                                );
                              }
                            }}
                          >
                            <p className="child5-group">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                              >
                                <path
                                  d="M20.2375 2.5H9.7625C5.2125 2.5 2.5 5.2125 2.5 9.7625V20.225C2.5 24.7875 5.2125 27.5 9.7625 27.5H20.225C24.775 27.5 27.4875 24.7875 27.4875 20.2375V9.7625C27.5 5.2125 24.7875 2.5 20.2375 2.5ZM22.3125 17.625C22.2625 17.7375 22.2 17.8375 22.1125 17.925L18.3125 21.725C18.125 21.9125 17.8875 22 17.65 22C17.4125 22 17.175 21.9125 16.9875 21.725C16.625 21.3625 16.625 20.7625 16.9875 20.4L19.1875 18.2H8.5625C8.05 18.2 7.625 17.775 7.625 17.2625C7.625 16.75 8.05 16.325 8.5625 16.325H21.45C21.575 16.325 21.6875 16.35 21.8125 16.4C22.0375 16.5 22.225 16.675 22.325 16.9125C22.4 17.1375 22.4 17.4 22.3125 17.625ZM21.4375 13.6625H8.5625C8.4375 13.6625 8.325 13.6375 8.2 13.5875C7.975 13.4875 7.7875 13.3125 7.6875 13.075C7.5875 12.85 7.5875 12.5875 7.6875 12.3625C7.7375 12.25 7.8 12.15 7.8875 12.0625L11.6875 8.2625C12.05 7.9 12.65 7.9 13.0125 8.2625C13.375 8.625 13.375 9.225 13.0125 9.5875L10.825 11.7875H21.45C21.9625 11.7875 22.3875 12.2125 22.3875 12.725C22.3875 13.2375 21.9625 13.6625 21.4375 13.6625Z"
                                  fill="#3A5A40"
                                />
                              </svg>
                            </p>
                          </div>
                          <div className="box4-child">
                            <p className="child4-group">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M7 5V4C7 2.34315 8.34315 1 10 1H14C15.6569 1 17 2.34315 17 4V5H22V7H19.9355L19.1222 19.1996C19.0172 20.7755 17.7083 22 16.1289 22H7.87108C6.29169 22 4.98279 20.7755 4.87773 19.1996L4.06442 7H2V5H7ZM9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V5H9V4ZM9 9V18H11V9H9ZM13 9V18H15V9H13Z"
                                  fill="#FC1E1E"
                                />
                              </svg>
                            </p>
                          </div>
                        </div>
                      ) : null}
                      {detailTeamID &&
                        detailTeamID.staff &&
                        detailTeamID.staff.map((staffMember, index) => (
                          <div className="box1-modal-group box3-group">
                            <div className="box1-child">
                              <p className="child1-group">{index + 3}</p>
                            </div>
                            <div className="box2-child">
                              <p className="child2-group">Nhân viên</p>
                            </div>
                            <div className="box3-child">
                              <div className="child3-group">
                                <p>{staffMember ? staffMember.fullName : ""}</p>
                              </div>
                            </div>
                            <div
                              className="box5-child"
                              onClick={() => {
                                if (staffMember) {
                                  showModalChange(
                                    staffMember.employeeId,
                                    staffMember.fullName,
                                    3
                                  );
                                }
                              }}
                            >
                              <p className="child5-group">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="30"
                                  height="30"
                                  viewBox="0 0 30 30"
                                  fill="none"
                                >
                                  <path
                                    d="M20.2375 2.5H9.7625C5.2125 2.5 2.5 5.2125 2.5 9.7625V20.225C2.5 24.7875 5.2125 27.5 9.7625 27.5H20.225C24.775 27.5 27.4875 24.7875 27.4875 20.2375V9.7625C27.5 5.2125 24.7875 2.5 20.2375 2.5ZM22.3125 17.625C22.2625 17.7375 22.2 17.8375 22.1125 17.925L18.3125 21.725C18.125 21.9125 17.8875 22 17.65 22C17.4125 22 17.175 21.9125 16.9875 21.725C16.625 21.3625 16.625 20.7625 16.9875 20.4L19.1875 18.2H8.5625C8.05 18.2 7.625 17.775 7.625 17.2625C7.625 16.75 8.05 16.325 8.5625 16.325H21.45C21.575 16.325 21.6875 16.35 21.8125 16.4C22.0375 16.5 22.225 16.675 22.325 16.9125C22.4 17.1375 22.4 17.4 22.3125 17.625ZM21.4375 13.6625H8.5625C8.4375 13.6625 8.325 13.6375 8.2 13.5875C7.975 13.4875 7.7875 13.3125 7.6875 13.075C7.5875 12.85 7.5875 12.5875 7.6875 12.3625C7.7375 12.25 7.8 12.15 7.8875 12.0625L11.6875 8.2625C12.05 7.9 12.65 7.9 13.0125 8.2625C13.375 8.625 13.375 9.225 13.0125 9.5875L10.825 11.7875H21.45C21.9625 11.7875 22.3875 12.2125 22.3875 12.725C22.3875 13.2375 21.9625 13.6625 21.4375 13.6625Z"
                                    fill="#3A5A40"
                                  />
                                </svg>
                              </p>
                            </div>
                            <div className="box4-child">
                              <p
                                className="child4-group"
                                onClick={() => {
                                  if (staffMember) {
                                    DelteMemberForTeam(staffMember.employeeId);
                                  }
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
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M7 5V4C7 2.34315 8.34315 1 10 1H14C15.6569 1 17 2.34315 17 4V5H22V7H19.9355L19.1222 19.1996C19.0172 20.7755 17.7083 22 16.1289 22H7.87108C6.29169 22 4.98279 20.7755 4.87773 19.1996L4.06442 7H2V5H7ZM9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V5H9V4ZM9 9V18H11V9H9ZM13 9V18H15V9H13Z"
                                    fill="#FC1E1E"
                                  />
                                </svg>
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                ) : (
                  <p>Không có thành viên trong nhóm</p>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer modal-footer-deparment modal-footer-group">
            <button className="btn-cancel" onClick={handleCancelDetail}>
              Thoát
            </button>
            <button
              className="btn-edit btn-fix-group"
              onClick={showModalChangeName}
            >
              Đổi tên nhóm
            </button>
            <button
              className="btn-edit btn-fix-group"
              onClick={handleGetAllMember}
            >
              Thêm nhân viên
            </button>
            <button
              className="btn-edit btn-fix-group"
              onClick={cancelTeamMember}
            >
              Kết thúc nhóm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DetailModal;
