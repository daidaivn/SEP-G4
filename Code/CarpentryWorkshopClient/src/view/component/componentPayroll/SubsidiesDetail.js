import React from "react";
import { Input, Modal } from "antd";
import { formatMoney } from "../../logicTime/formatAll";

const SubsidiesDetail = ({
  isModalOpenSubsidies,
  handleOkSubsidies,
  handleCancelSubsidies,
  dataDeduction
}) => {
  return (
    <>
      {/* Modal Chi tiết phụ cấp */}
      <Modal
        className="modal"
        open={isModalOpenSubsidies}
        on
        Ok={handleOkSubsidies}
        onCancel={handleCancelSubsidies}
      >
        <div className="modal-payroll payroll-fix">
          <div className="modal-head">
            <div className="body-payroll1">
              <p>Khoản giảm trừ</p>
            </div>
            <div className="close">
              <svg
                onClick={handleCancelSubsidies}
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
          <div className="body-payroll">
            <div className="body-child1 scrollbar" id="style-15">
              {dataDeduction.deductions && dataDeduction.deductions.map((deduction, index) => (
                <div className="item-child1-col" key={index}>
                  <div className="child1-col">
                    <div className="child1-text">
                      <p className="text1">{index + 1}.</p>
                      <p>{deduction.deductionNames}</p>
                      <div className="money">
                        <p>{deduction.amounts && formatMoney(deduction.amounts)} VND</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="body-child2">
              <div className="body-child1-cn">
                <div className="item-chil1">
                  <div className="item-chil1-cn">
                    <p>Tổng số tiền khấu trừ</p>
                    <div className="money">
                      <p>{formatMoney(dataDeduction.totalDeductionAmounts)} VND</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default SubsidiesDetail;
