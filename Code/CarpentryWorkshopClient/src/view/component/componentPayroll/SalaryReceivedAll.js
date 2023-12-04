import React from "react";
import { Modal } from "antd";
import { formatMoney } from "../../logicTime/formatAll";
const SalaryReceived = ({
  isModalOpenSalaryReceived,
  handleOkSalaryReceived,
  handleCancelSalaryReceived,
  salaryDetail,
}) => {
  return (
    <>
      {/* Modal hiển thị tất cả danh sách lương thực nhận */}
      <div className="AllowanceAll">
        <Modal
          className="modal-AllowanceAll"
          open={isModalOpenSalaryReceived}
          onOk={handleOkSalaryReceived}
          onCancel={handleCancelSalaryReceived}
        >
          <div className="modal-allowance-all modal-salary-revice">
            <div className="head-allowance-all">
              <div className="text-head">
                <p>Chi tiết danh sách lương thực nhận</p>
                <svg
                  onClick={handleCancelSalaryReceived}
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
            <div className="body-allowance-all">
              <thead>
                <tr>
                  <div className="child1">MNV</div>
                  <div className="item-child">Họ và tên</div>
                  <div className="item-child">Lương chính</div>
                  <div className="item-child">Khoản giảm trừ</div>
                  <div className="item-child">Phụ cấp</div>
                  <div className="item-child">Thuế TNCN</div>
                  <div className="item-child">Các khoản phúc lợi khác</div>
                  <div className="item-child">Ứng</div>
                  <div className="item-child">Thực nhận</div>
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
                            {item.actualDaySalary === 0
                              ? "0"
                              : formatMoney(item.actualDaySalary)}{" "}
                            VNĐ
                          </div>
                          <div className="item-child-body">
                            {item.deductions.socialInsurance +
                              item.deductions.healthInsurance +
                              item.deductions.unemploymentInsurance +
                              item.deductions.unionFees ===
                            0
                              ? "0"
                              : formatMoney(
                                  item.deductions.socialInsurance +
                                    item.deductions.healthInsurance +
                                    item.deductions.unemploymentInsurance +
                                    item.deductions.unionFees
                                )}{" "}
                            VNĐ
                          </div>
                          <div className="item-child-body">
                            {item.allowances.meal +
                              item.allowances.uniform +
                              item.allowances.petrol ===
                            0
                              ? "0"
                              : formatMoney(
                                  item.allowances.meal +
                                    item.allowances.uniform +
                                    item.allowances.petrol
                                )}{" "}
                            VNĐ
                          </div>
                          <div className="item-child-body">
                            {item.personalIncomeTax === 0
                              ? "0"
                              : formatMoney(item.personalIncomeTax)}{" "}
                            VNĐ
                          </div>
                          <div className="item-child-body">
                            {item.jobIncentives === 0
                              ? "0"
                              : formatMoney(item.jobIncentives)}{" "}
                            VNĐ
                          </div>
                          <div className="item-child-body">
                            {item.advances === 0
                              ? "0"
                              : formatMoney(item.advances)}{" "}
                            VNĐ
                          </div>
                          <div className="item-child-body">
                            {item.actualReceived === 0
                              ? "0"
                              : formatMoney(item.actualReceived)}{" "}
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
export default SalaryReceived;
