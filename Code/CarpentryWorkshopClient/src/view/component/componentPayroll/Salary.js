import React from "react";
import { Input, Modal } from "antd";
import { formatMoney } from "../../logicTime/formatAll";

const Salary = ({
  isModalOpenSalary,
  handleOkSalary,
  handleCancelSalary,
  salaryDetail,
}) => {
  return (
    <>
      {/* Modal Chi tiết Lương chính */}
      <div className="AllowanceAll">
        <Modal
          className="modal-AllowanceAll"
          open={isModalOpenSalary}
          onOk={handleOkSalary}
          onCancel={handleCancelSalary}
        >
          <div className="modal-allowance-all">
            <div className="head-allowance-all">
              <div className="text-head">
                <p>Chi tiết danh sách lương chính</p>
                <svg
                  onClick={handleCancelSalary}
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
            <div className="body-allowance-all table-payroll">
              <thead>
                <tr>
                  <div className="child1">MNV</div>
                  <div className="item-child">Họ và tên</div>
                  <div className="item-child">Công thực tế</div>
                  <div className="item-child">Công lễ tết</div>
                  <div className="item-child">Công làm thêm</div>
                  <div className="item-child">Lương ngày công thực tế</div>
                  <div className="item-child">Lương làm thêm</div>
                  <div className="item-child">Lương kinh doanh sản lượng</div>
                  <div className="item-child">Tổng</div>
                </tr>
              </thead>
              <div className="tbody scrollbar" id="style-15">
                {salaryDetail.length === 0 ? (
                  <p>Thông tin chưa sẵn sàng hoặc không tồn tại.</p>
                ) : (
                  <React.Fragment>
                    {Array.isArray(salaryDetail) &&
                      salaryDetail.map((item, index) => (
                        <div className="item-body">
                          <div className="item-first">{index + 1}</div>
                          <div className="item-second">{item.fullName}</div>
                          <div className="item-child-body">
                            {item.actualWork === 0 ? "0" : item.actualWork} Công
                          </div>
                          <div className="item-child-body">
                            {item.holidayWork === 0 ? "0" : item.holidayWork}{" "}
                            Công
                          </div>
                          <div className="item-child-body">
                            {item.overtime === 0 ? "0" : item.overtime} Công
                          </div>
                          <div className="item-child-body">
                            {item.actualDaySalary === 0
                              ? "0"
                              : formatMoney(item.actualDaySalary)}{" "}
                            VNĐ
                          </div>
                          <div className="item-child-body">
                            {item.overtimeSalary === 0
                              ? "0"
                              : formatMoney(item.overtimeSalary)}{" "}
                            VNĐ
                          </div>
                          <div className="item-child-body">
                            {item.businessSalary === 0
                              ? "0"
                              : formatMoney(item.businessSalary)}{" "}
                            VNĐ
                          </div>
                          <div className="item-child-body">
                            {item.actualDaySalary + item.overtimeSalary + item.businessSalary === 0
                              ? "0"
                              : formatMoney(
                                  item.actualDaySalary + item.overtimeSalary + item.businessSalary
                                )}{" "}
                            VNĐ
                          </div>
                        </div>
                      ))}
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default Salary;
