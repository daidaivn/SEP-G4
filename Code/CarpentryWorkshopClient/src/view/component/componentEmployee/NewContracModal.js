import React from "react";
import { Select, Input, Modal, Form, Switch } from "antd";

const NewContractModal = ({
  isModalOpenAddContract,
  handleOkAddContract,
  handleCancelAddContract,
  handleChange,
  contractCode,
  setContractCode,
  contractStartDate,
  setContractStartDate,
  contractEndDate,
  setContractEndDate,
  contractType,
  setContractType,
  contractLink,
  setContractLink,
  contractStatus,
  setContractStatus,
  convertDobToISO,
  contractTypes,
  amount,
  handleContractAmountChange,
  setAmount,
  originalOffice,
  setOriginalOffice,
  saveFileContract,
  setsaveFileContract
}) => {
  return (
    <Modal
      className="modal"
      open={isModalOpenAddContract}
      onOk={handleOkAddContract}
      onCancel={handleCancelAddContract}
    >
      <div className="modal-add-roleyee-employee modal-contract">
        <div className="modal-head">
          <h3>Thêm hợp đồng</h3>
        </div>
        <div className="body-add-role-employee body-modal-add-contract">
          <table>
            <thead className="thead-first">
              Bạn cần tạo hợp đồng để hoàn tất thêm nhân viên
            </thead>
            <div className="body-table body-table-contract">
              <tr>
                <Input
                  className="select-input"
                  placeholder="Mã hợp đồng"
                  style={{
                    width: "100%",
                  }}
                  value={contractCode} // Thêm dòng này để hiển thị giá trị từ state
                  onChange={(e) => setContractCode(e.target.value)} // Thêm dòng này để cập nhật giá trị vào state
                />
                <div className="input-date">
                  <Select
                    className="select-input"
                    value={contractType || undefined} // Thêm dòng này để hiển thị giá trị từ state
                    style={{
                      width: "100%",
                    }}
                    onChange={(value) => setContractType(value)} // Thêm dòng này để cập nhật giá trị vào state
                    options={
                      contractTypes
                        ? contractTypes.map((contractType) => ({
                          value: contractType.contractTypeId,
                          label: contractType.contractName,
                        }))
                        : []
                    }
                    placeholder="Loại hợp đồng"
                  />
                </div>
              </tr>
              <tr>
                <Input
                  type="number"
                  placeholder="Lương hợp đồng"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                ></Input>
              </tr>
              <tr>
                <div className="input-date">
                  <p className="salary-contract">Ngày bắt đầu hợp đồng:</p>
                  <Input
                    className="select-input"
                    placeholder="Thời gian bắt đầu"
                    type="date"
                    style={{
                      width: "100%",
                    }}
                    value={convertDobToISO(contractStartDate)} // Thêm dòng này để hiển thị giá trị từ state
                    onChange={(e) =>
                      setContractStartDate(convertDobToISO(e.target.value))
                    }
                  />
                </div>
              </tr>
              <tr>
                <div className="input-date">
                  <p className="salary-contract">Chọn file hợp đồng:</p>
                  <Input className="select-input" type="file" onChange={(e) => setsaveFileContract(e.target.files[0])} />
                </div>
              </tr>
            </div>
            <thead className="thead-last"></thead>
          </table>
        </div>
        <div className="modal-footer modal-footer-add-employee add">
          <button className="btn-cancel" onClick={handleCancelAddContract}>
            Hủy bỏ
          </button>
          <button className="btn-edit btn-save" onClick={handleOkAddContract}>
            Xong
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NewContractModal;
