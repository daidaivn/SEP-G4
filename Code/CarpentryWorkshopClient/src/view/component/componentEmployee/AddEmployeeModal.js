import React from "react";
import { Select, Input, Modal, Radio, Form, Switch } from "antd";



const AddEmployeeModal = ({
  avt,
  isModalOpenAdd,
  handleOkAdd,
  handleCancelAdd,
  originalLastName,
  setOriginalLastName,
  originalFirstName,
  setOriginalFirstName,
  originalPhoneNumber,
  originalGender,
  setOriginalGender,
  originalNationality,
  setOriginalNationality,
  originalAddress,
  setOriginalAddress,
  originalCIC,
  originalTaxId,
  setOriginalTaxId,
  originalEmail,
  setOriginalEmail,
  originalDOB,
  setOriginalDOB,
  originalStatus,
  setOriginalStatus,
  convertDobToISO,
  showModalAddContract,
  showModalAddRole,
  countries,
  handlePhoneNumberChange,
  handleCICChange,
  handleImageUpload,
  previewImage,
  handleFileChangeAdd
}) => {
  return (
    <>
      <div className="modal-res">
        <Modal
          className="modal-employee"
          open={isModalOpenAdd}
          onOk={handleOkAdd}
          onCancel={handleCancelAdd}
          width={1252}
        >
          <div className="modal-add-employee modal-add-res">
            <div className="modal-head-employee">
              <h3>Thêm nhân viên</h3>
            </div>
            <div className="modal-add-employee-all">
              <div className="modal-employee-box1">
                <div className="modal-child-body1">
                  <div className="img-body1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    {previewImage && (
                      <img src={previewImage} alt="Xem trước ảnh" />
                    )}
                  </div>
                </div>
                <div className="modal-child-body2">
                  <div className="div-modal-child2 div-detail div1-modal-child2">
                    <div className="div1-modal-cn">
                      <p>Họ:</p>
                      <Input
                        value={originalLastName}
                        onChange={(e) => setOriginalLastName(e.target.value)}
                        placeholder="Nhập họ, tên đệm"
                      />
                    </div>
                    <div className="div1-modal-cn div2-fix">
                      <p>Tên:</p>
                      <Input
                        value={originalFirstName}
                        onChange={(e) => setOriginalFirstName(e.target.value)}
                        placeholder="Nhập tên"
                      />
                    </div>
                  </div>
                  <div className="div-modal-child2 div-detail">
                    <p>Số điện thoại:</p>
                    <Input
                      value={originalPhoneNumber}
                      onChange={handlePhoneNumberChange}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>

                  <div className="div-modal-child2">
                    <p>Giới tính: </p>
                    <div className="radio-employee">
                      <Radio.Group
                        onChange={(e) => setOriginalGender(e.target.value)}
                        value={originalGender}
                      >
                        <Radio value={true} className="gender">
                          Nam
                        </Radio>
                        <Radio value={false} className="gender">
                          Nữ
                        </Radio>
                      </Radio.Group>
                    </div>
                  </div>
                  <div className="div-modal-child2">
                    <p>Quốc tịch:</p>
                    <Select
                      className="select-input"
                      value={originalNationality || undefined}
                      onChange={(value) => setOriginalNationality(value)}
                      style={{
                        width: "100%",
                      }}
                      placeholder="Chọn quốc tịch"
                      options={countries.map((country) => ({
                        value: country.countryId,
                        label: country.countryName,
                      }))}
                    />
                  </div>
                  <div className="div-modal-child2 div-detail fix-res">
                    <p>Ngày sinh:</p>
                    <Input
                      type="date"
                      value={convertDobToISO(originalDOB)}
                      onChange={(e) =>
                        setOriginalDOB(convertDobToISO(e.target.value))
                      }
                    />
                  </div>
                  <div className="div-modal-child2 div-detail ">
                    <p>Mã định danh: </p>
                    <Input
                      value={originalCIC}
                      onChange={handleCICChange}
                      placeholder="Ví dụ: CMND, CCCD"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-employee-box2">
                <div className="modal-box2-child">
                  <div className="box2-child-cn ">
                    <div className="box-child-employee1 div-detail">
                      <p>Mã số thuế:</p>
                      <Input
                        value={originalTaxId}
                        onChange={(e) => setOriginalTaxId(e.target.value)}
                        placeholder="Nhập mã số thuế"
                      />
                    </div>
                    <div className="box-child-employee1 div-detail">
                      <p>Địa chỉ: </p>
                      <textarea
                        value={originalAddress}
                        onChange={(e) => setOriginalAddress(e.target.value)}
                        placeholder="Nhập địa chỉ"
                      />
                    </div>
                  </div>
                  <div className="box2-child-cn">
                    <div className="box-child-employee1 div-detail">
                      <p>Email:</p>
                      <Input
                        value={originalEmail}
                        onChange={(e) => setOriginalEmail(e.target.value)}
                        placeholder="Nhập email"
                      />
                    </div>
                    <div className="box-child-employee1 div-detail">
                      <p>Trạng thái:</p>
                      <Form.Item valuePropName="checked" className="action">
                        <Switch
                          checked={originalStatus}
                          onChange={(checked) => setOriginalStatus(checked)}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer modal-footer-add">
              <div className="btn-left">
                <div
                  className="modal-footer1 add-green"
                  onClick={showModalAddContract}
                >
                  Thêm hợp đồng
                </div>
                <div
                  className="modal-footer1 add-green"
                  onClick={showModalAddRole}
                >
                  Thêm chức vụ
                </div>
              </div>

              <div className="modal-footer modal-footer2">
                <button className="btn-cancel" onClick={handleOkAdd}>
                  Thoát
                </button>
                <button className="btn-edit btn-save" onClick={handleFileChangeAdd}>
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AddEmployeeModal;
