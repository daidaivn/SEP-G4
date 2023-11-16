import React from "react";
import { Input, Modal } from "antd";

const RewardCompany = ({
  isModalOpenRewardCompany,
  handleOkRewardCompany,
  handleCancelRewardCompany,
  showModalRewardPersonal,
  showModalRewardAll,
  showModalHoliday,
}) => {
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
              <Input type="date"></Input>
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
              </thead>
              <div className="item-reward">
                <p className="stt">1</p>
                <div className="child-reward">
                  <p>Thưởng Tết</p>
                </div>
                <div className="child-reward">
                  <p>1.000.000</p>
                </div>
                <div className="child-reward">
                  <p>Toàn thể nhân viên</p>
                </div>
                <div className="child-reward last1">
                  <p>20/10/2023</p>
                </div>
              </div>
              <div className="item-reward">
                <p className="stt">2</p>
                <div className="child-reward">
                  <p>Nhân viên xuất sắc</p>
                </div>
                <div className="child-reward">
                  <p>500.000</p>
                </div>
                <div className="child-reward">
                  <p>Nguyễn Văn an</p>
                </div>
                <div className="child-reward last1">
                  <p>30/10/2023</p>
                </div>
              </div>
              <div className="item-reward">
                <p className="stt">3</p>
                <div className="child-reward">
                  <p>Thưởng 30/4 - 1/5</p>
                </div>
                <div className="child-reward">
                  <p>500.000</p>
                </div>
                <div className="child-reward">
                  <p>Toàn thể nhân viên</p>
                </div>
                <div className="child-reward last1">
                  <p>15/11/2023</p>
                </div>
              </div>
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
