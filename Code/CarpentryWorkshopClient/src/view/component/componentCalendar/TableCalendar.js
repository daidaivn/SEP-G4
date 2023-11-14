import React from 'react';
import { Input } from 'antd';

const TableCalendar = ({ handleEditDetailShift, showModalDetailShift, teamForSchedule }) => {
  return (
    <table className="list-table ">
      <thead>
        <tr>
          <td>STT</td>
          <td>Nhóm</td>
          <td>Số nhân viên</td>
          <td>Ca làm việc</td>
          <td>Trạng thái công việc</td>
          <td>Trưởng ca</td>
          <td>Giao việc / Chi tiết công việc</td>
        </tr>
      </thead>
      {Array.isArray(teamForSchedule) && teamForSchedule.length === 0 ? (
        <p>Thông tin nhân viên chưa sẵn sàng hoặc không tồn tại.</p>
      ) : (
        <tbody className="scrollbar" id="style-15">
          {Array.isArray(teamForSchedule) && teamForSchedule.map((team, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{team.teamName}</td>
              <td>{team.numberOfMember}</td>
              <td>{team.shiftTypeName}</td>
              <td>
                {team.workStatus === true ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_1178_2299)">
                        <path
                          d="M5.66675 10.5C6.99283 10.5 8.2646 9.97322 9.20228 9.03553C10.14 8.09785 10.6667 6.82608 10.6667 5.5C10.6667 4.17392 10.14 2.90215 9.20228 1.96447C8.2646 1.02678 6.99283 0.5 5.66675 0.5C4.34067 0.5 3.0689 1.02678 2.13121 1.96447C1.19353 2.90215 0.666748 4.17392 0.666748 5.5C0.666748 6.82608 1.19353 8.09785 2.13121 9.03553C3.0689 9.97322 4.34067 10.5 5.66675 10.5Z"
                          fill="#34C759"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1178_2299">
                          <rect
                            width="10"
                            height="10"
                            fill="white"
                            transform="translate(0.666748 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Đã có
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
                      <g clip-path="url(#clip0_1178_2303)">
                        <path
                          d="M5.66675 10.5C6.99283 10.5 8.2646 9.97322 9.20228 9.03553C10.14 8.09785 10.6667 6.82608 10.6667 5.5C10.6667 4.17392 10.14 2.90215 9.20228 1.96447C8.2646 1.02678 6.99283 0.5 5.66675 0.5C4.34067 0.5 3.0689 1.02678 2.13121 1.96447C1.19353 2.90215 0.666748 4.17392 0.666748 5.5C0.666748 6.82608 1.19353 8.09785 2.13121 9.03553C3.0689 9.97322 4.34067 10.5 5.66675 10.5Z"
                          fill="#FC1E1E"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1178_2303">
                          <rect
                            width="10"
                            height="10"
                            fill="white"
                            transform="translate(0.666748 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Chưa có
                  </>
                )}
              </td>
              <td>{team.teamLeaderName}</td>
              <td>
                <svg
                  onClick={handleEditDetailShift}
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                >
                  <g clip-path="url(#clip0_1178_2310)">
                    <path
                      d="M15.833 30.5C19.8113 30.5 23.6266 28.9196 26.4396 26.1066C29.2527 23.2936 30.833 19.4782 30.833 15.5C30.833 11.5218 29.2527 7.70644 26.4396 4.8934C23.6266 2.08035 19.8113 0.5 15.833 0.5C11.8548 0.5 8.03945 2.08035 5.22641 4.8934C2.41336 7.70644 0.833008 11.5218 0.833008 15.5C0.833008 19.4782 2.41336 23.2936 5.22641 26.1066C8.03945 28.9196 11.8548 30.5 15.833 30.5ZM14.4268 20.6562V16.9062H10.6768C9.89746 16.9062 9.27051 16.2793 9.27051 15.5C9.27051 14.7207 9.89746 14.0938 10.6768 14.0938H14.4268V10.3438C14.4268 9.56445 15.0537 8.9375 15.833 8.9375C16.6123 8.9375 17.2393 9.56445 17.2393 10.3438V14.0938H20.9893C21.7686 14.0938 22.3955 14.7207 22.3955 15.5C22.3955 16.2793 21.7686 16.9062 20.9893 16.9062H17.2393V20.6562C17.2393 21.4355 16.6123 22.0625 15.833 22.0625C15.0537 22.0625 14.4268 21.4355 14.4268 20.6562Z"
                      fill="#556A59"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1178_2310">
                      <rect
                        width="30"
                        height="30"
                        fill="white"
                        transform="translate(0.833008 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <svg
                  onClick={showModalDetailShift}
                  xmlns="http://www.w3.org/2000/svg"
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                >
                  <path
                    d="M27.3955 11.9371C24.508 7.39961 20.283 4.78711 15.833 4.78711C13.608 4.78711 11.4455 5.43711 9.47051 6.64961C7.49551 7.87461 5.72051 9.66211 4.27051 11.9371C3.02051 13.8996 3.02051 17.0871 4.27051 19.0496C7.15801 23.5996 11.383 26.1996 15.833 26.1996C18.058 26.1996 20.2205 25.5496 22.1955 24.3371C24.1705 23.1121 25.9455 21.3246 27.3955 19.0496C28.6455 17.0996 28.6455 13.8996 27.3955 11.9371ZM15.833 20.5496C13.033 20.5496 10.783 18.2871 10.783 15.4996C10.783 12.7121 13.033 10.4496 15.833 10.4496C18.633 10.4496 20.883 12.7121 20.883 15.4996C20.883 18.2871 18.633 20.5496 15.833 20.5496Z"
                    fill="#FF8F19"
                  />
                  <path
                    d="M15.833 11.9258C13.8705 11.9258 12.2705 13.5258 12.2705 15.5008C12.2705 17.4633 13.8705 19.0633 15.833 19.0633C17.7955 19.0633 19.408 17.4633 19.408 15.5008C19.408 13.5383 17.7955 11.9258 15.833 11.9258Z"
                    fill="#FF8F19"
                  />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default TableCalendar;