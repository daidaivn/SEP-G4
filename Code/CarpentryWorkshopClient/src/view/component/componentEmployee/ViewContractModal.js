import React from "react";
import { Modal, Select, Input, Form, Switch } from "antd";

const ViewContractModal = ({
  isModalOpenEditContract,
  handleOkEditContract,
  handleCancelEditContract,
  handleChange,
  handleEditContract,
  contract,
  contractTypes,
  convertDobToISO,
  originalOffice,
}) => {
  return (
    <Modal
      className="modal"
      open={isModalOpenEditContract}
      onOk={handleOkEditContract}
      onCancel={handleCancelEditContract}
    >
      <div className="modal-add-roleyee-employee modal-contract">
        <div className="modal-head">
          <h3>Hợp đồng</h3>
        </div>
        <div className="body-add-role-employee">
          <table>
            <thead className="thead-first"></thead>
            <div className="body-table body-table-contract">
              <tr>
                <div className="input-date">
                  <Input
                    className="select-input"
                    value={contract?.employeeName}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>
              </tr>
              <tr>
                <div className="input-date">
                  <Input
                    className="select-input"
                    value={contract?.contractCode}
                    style={{
                      width: "100%",
                    }}
                  />
                  <div className="input-date-cn">
                    <p>Trạng thái: </p>
                    <Form.Item valuePropName="checked" className="action">
                      <Switch checked={contract?.status} />
                    </Form.Item>
                  </div>
                </div>
              </tr>
              <tr>
                <div className="input-date">
                  <Select
                    className="select-input"
                    value={originalOffice} // Thêm dòng này để hiển thị giá trị từ state
                    style={{
                      width: "100%",
                    }}
                    options={[
                      {
                        value: true,
                        label: "Khối văn phòng",
                      },
                      {
                        value: false,
                        label: "Khối sản xuất",
                      },
                    ]
                    }
                  />
                </div>
              </tr>
              <tr>
                <div className="input-date">
                  <Input
                    className="select-input"
                    placeholder="Thời gian bắt đầu"
                    type="date"
                    value={convertDobToISO(contract?.startDate)}
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
                <div className="input-date">
                  <Input
                    className="select-input"
                    placeholder="Thời gian kết thúc"
                    type="date"
                    value={convertDobToISO(contract?.endDate)}
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
                <div className="input-date">
                  <Select
                    className="select-input"
                    value={contract?.contractTypeId}
                    style={{
                      width: "100%",
                    }}
                    onChange={handleChange}
                    options={
                      contractTypes
                        ? contractTypes.map((contractType) => ({
                            value: contractType.contractTypeId,
                            label: contractType.contractName,
                          }))
                        : []
                    }
                  />
                </div>
              </tr>
              
              <tr>
                <div className="input-date">
                  <Input
                    className="select-input"
                    value={contract?.linkDoc}
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
              </tr>
            </div>
            <thead className="thead-last"></thead>
          </table>
        </div>
        <div className="modal-footer modal-footer-add-employee add">
          <button
            className="btn-cancel"
            onClick={() => handleCancelEditContract()}
          >
            Hủy bỏ
          </button>
          <button className="btn-edit" onClick={() => handleEditContract()}>
            Chỉnh sửa
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewContractModal;
