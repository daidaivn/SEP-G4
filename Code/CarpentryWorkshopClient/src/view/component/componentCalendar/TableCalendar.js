import { parseWeekRange } from "../../logicTime/getWeeDays";
import { format, parse } from "date-fns";

const TableCalendar = ({
  showModalDetailShift,
  dataForSchedule,
  selectedWeek,
  defaultValue,
  showModalGroup,
  setActionWork,
  handlegetDataDetail,
  setWorkidDetail,
  setWorkDetailById,
  setShift,
  fetchAllShiftType,
  detailTeam
}) => {
  const weekDays = selectedWeek
    ? parseWeekRange(selectedWeek)
    : parseWeekRange(defaultValue);

    console.log('selectedWeek',weekDays);
    

  return (
    <table className="list-table-calendar">
      <thead>
        <tr>
          <td className="td-first">
            <div className="day">Ngày</div>
            <div className="month">Nhóm</div>
          </td>
          {weekDays.map((day, index) => (
            <td key={index}>{day}</td>
          ))}
        </tr>
      </thead>
      <div className="body-calendar">
        {dataForSchedule && dataForSchedule.length > 0 ? (
          <tbody className="scrollbar" id="style-15">
            {dataForSchedule.map((team, index) => (
                <tr key={team.teamId}>
                  <td>
                    {team.teamName}
                    <div
                      className="shift"
                      onClick={() => {
                        showModalGroup();
                      }}
                    >
                      {team.shiftType.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setShift({
                              ShiftId: item.shiftTypeId,
                              ShiftName: item.typeName,
                              TeamName: team.teamName,
                              NumberOfMember: team.numberMember,
                              TeamID: team.teamId,
                            });
                            fetchAllShiftType(item.shiftTypeId);
                            detailTeam(team.teamId);
                          }
                          }
                        >
                          {item.typeName}
                        </div>
                      ))}
                    </div>
                  </td>
                  {team.dataForWork.map((work, workIndex) => (
                    <td key={workIndex}>
                      {work.status === "end" ? (
                        <>
                          Kết thúc
                          <svg
                            onClick={() => {
                              handlegetDataDetail(work.workId);
                              setActionWork("viewWork");
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="31"
                            height="30"
                            viewBox="0 0 31 30"
                            fill="none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="31"
                              height="30"
                              viewBox="0 0 31 30"
                              fill="none"
                            >
                              <path
                                d="M27.4197 11.4371C24.5322 6.89961 20.3072 4.28711 15.8572 4.28711C13.6322 4.28711 11.4697 4.93711 9.49468 6.14961C7.51968 7.37461 5.74468 9.16211 4.29468 11.4371C3.04468 13.3996 3.04468 16.5871 4.29468 18.5496C7.18218 23.0996 11.4072 25.6996 15.8572 25.6996C18.0822 25.6996 20.2447 25.0496 22.2197 23.8371C24.1947 22.6121 25.9697 20.8246 27.4197 18.5496C28.6697 16.5996 28.6697 13.3996 27.4197 11.4371ZM15.8572 20.0496C13.0572 20.0496 10.8072 17.7871 10.8072 14.9996C10.8072 12.2121 13.0572 9.94961 15.8572 9.94961C18.6572 9.94961 20.9072 12.2121 20.9072 14.9996C20.9072 17.7871 18.6572 20.0496 15.8572 20.0496Z"
                                fill="#FC1E1E"
                              />
                              <path
                                d="M15.8572 11.4258C13.8947 11.4258 12.2947 13.0258 12.2947 15.0008C12.2947 16.9633 13.8947 18.5633 15.8572 18.5633C17.8197 18.5633 19.4322 16.9633 19.4322 15.0008C19.4322 13.0383 17.8197 11.4258 15.8572 11.4258Z"
                                fill="#FC1E1E"
                              />
                            </svg>
                          </svg>
                        </>
                      ) : work.status === "no" ? (
                        <>
                        <></>
                          Thêm
                          <svg
                            onClick={() => {
                              showModalDetailShift();
                              setActionWork("addWork");
                              setWorkidDetail(team.teamId);
                              const columnIndex = workIndex;
                              const selectedDate = weekDays[columnIndex];
                              console.log('selectedDate',selectedDate);
                              
                              const formattedDate = format(
                                parse(selectedDate, "dd-MM", new Date()),
                                "dd-MM-yyyy"
                              );
                              console.log("date111", formattedDate);
                              setWorkDetailById({
                                date: formattedDate,
                              });
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_1943_4151)">
                              <path
                                d="M15 30C18.9782 30 22.7936 28.4196 25.6066 25.6066C28.4196 22.7936 30 18.9782 30 15C30 11.0218 28.4196 7.20644 25.6066 4.3934C22.7936 1.58035 18.9782 0 15 0C11.0218 0 7.20644 1.58035 4.3934 4.3934C1.58035 7.20644 0 11.0218 0 15C0 18.9782 1.58035 22.7936 4.3934 25.6066C7.20644 28.4196 11.0218 30 15 30ZM13.5938 20.1562V16.4062H9.84375C9.06445 16.4062 8.4375 15.7793 8.4375 15C8.4375 14.2207 9.06445 13.5938 9.84375 13.5938H13.5938V9.84375C13.5938 9.06445 14.2207 8.4375 15 8.4375C15.7793 8.4375 16.4062 9.06445 16.4062 9.84375V13.5938H20.1562C20.9355 13.5938 21.5625 14.2207 21.5625 15C21.5625 15.7793 20.9355 16.4062 20.1562 16.4062H16.4062V20.1562C16.4062 20.9355 15.7793 21.5625 15 21.5625C14.2207 21.5625 13.5938 20.9355 13.5938 20.1562Z"
                                fill="#556A59"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1943_4151">
                                <rect width="30" height="30" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </>
                      ) : work.status === "yes" ? (
                        <>
                          Chi tiết
                          <svg
                            onClick={() => {
                              setActionWork("editWork");
                              handlegetDataDetail(work.workId);
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="31"
                            height="30"
                            viewBox="0 0 31 30"
                            fill="none"
                          >
                            <path
                              d="M27.134 11.4371C24.2465 6.89961 20.0215 4.28711 15.5715 4.28711C13.3465 4.28711 11.184 4.93711 9.20903 6.14961C7.23403 7.37461 5.45903 9.16211 4.00903 11.4371C2.75903 13.3996 2.75903 16.5871 4.00903 18.5496C6.89653 23.0996 11.1215 25.6996 15.5715 25.6996C17.7965 25.6996 19.959 25.0496 21.934 23.8371C23.909 22.6121 25.684 20.8246 27.134 18.5496C28.384 16.5996 28.384 13.3996 27.134 11.4371ZM15.5715 20.0496C12.7715 20.0496 10.5215 17.7871 10.5215 14.9996C10.5215 12.2121 12.7715 9.94961 15.5715 9.94961C18.3715 9.94961 20.6215 12.2121 20.6215 14.9996C20.6215 17.7871 18.3715 20.0496 15.5715 20.0496Z"
                              fill="#C5C5C5"
                            />
                            <path
                              d="M15.5715 11.4258C13.609 11.4258 12.009 13.0258 12.009 15.0008C12.009 16.9633 13.609 18.5633 15.5715 18.5633C17.534 18.5633 19.1465 16.9633 19.1465 15.0008C19.1465 13.0383 17.534 11.4258 15.5715 11.4258Z"
                              fill="#C5C5C5"
                            />
                          </svg>
                        </>
                      ) : (
                        <></>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        ) : (
          <p>Thông lịch làm việc của các nhóm chưa sẵn sàng hoặc không tồn tại.</p>

        )
        }

      </div>
    </table>
  );
};

export default TableCalendar;
