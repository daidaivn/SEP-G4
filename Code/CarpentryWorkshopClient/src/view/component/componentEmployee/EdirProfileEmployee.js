import React from 'react';
import { Modal, Input, Select, Radio, Form, Switch } from "antd";
const EditProfileEmployee = ({
    avt,
    isModalOpen,
    handleOkEditRole,
    handleCancel,
    originalLastName,
    setOriginalLastName,
    originalFirstName,
    setOriginalFirstName,
    originalPhoneNumber,
    setOriginalPhoneNumber,
    originalGender,
    setOriginalGender,
    originalNationality,
    setOriginalNationality,
    countries,
    originalAddress,
    setOriginalAddress,
    originalCIC,
    setOriginalCIC,
    originalTaxId,
    setOriginalTaxId,
    idDetail,
    convertDobToISO,
    originalDOB,
    setOriginalDOB,
    originalStatus,
    setOriginalStatus,
    showModalEditContract,
    showModalEditRole,
    handleSave,
    handleCancelView,
}) => {
    return (
        <Modal
            className="modal"
            visible={isModalOpen}
            onOk={handleSave}
            onCancel={handleCancel}
            width={1252}
        >
            <div className="modal-add-employee">
                <div className="modal-head-employee">
                    <h3>Sửa thông tin nhân viên</h3>
                </div>
                <div className="modal-add-employee-all">
                    <div className="modal-employee-box1">
                        <div className="modal-child-body1">
                            <div className="img-body1">
                                <img src={avt} alt="" />
                            </div>
                        </div>
                        <div className="modal-child-body2">
                            <div className="div-modal-child2 div-detail div1-modal-child2">
                                <div className="div1-modal-cn">
                                    <p>Họ:</p>
                                    <Input
                                        value={originalLastName}
                                        onChange={(e) => setOriginalLastName(e.target.value)}
                                    />
                                </div>
                                <div className="div1-modal-cn div2-fix">
                                    <p>Tên:</p>
                                    <Input
                                        value={originalFirstName}
                                        onChange={(e) => setOriginalFirstName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="div-modal-child2 div-detail">
                                <p>Số điện thoại:</p>
                                <Input
                                    value={originalPhoneNumber}
                                    onChange={(e) => setOriginalPhoneNumber(e.target.value)}
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
                                    value={originalNationality}
                                    onChange={(value) => setOriginalNationality(value)}
                                    style={{
                                        width: "100%",
                                    }}
                                    options={countries.map((country) => ({
                                        value: country.countryId,
                                        label: country.countryName,
                                    }))}
                                />
                            </div>
                            <div className="div-modal-child2 div-detail">
                                <p>Địa chỉ: </p>
                                <Input
                                    value={originalAddress}
                                    onChange={(e) => setOriginalAddress(e.target.value)}
                                />
                            </div>
                            <div className="div-modal-child2 div-detail">
                                <p>Mã định danh: </p>
                                <Input
                                    value={originalCIC}
                                    onChange={(e) => setOriginalCIC(e.target.value)}
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
                                    />
                                </div>
                                <div className="box-child-employee1 div-detail">
                                    <p>Lương cơ bản:</p>
                                    <Input
                                        value={
                                            idDetail && idDetail.wageNumber
                                                ? idDetail.wageNumber
                                                : "Chưa có thông tin"
                                        }
                                    />
                                </div>
                            </div>
                            <div className="box2-child-cn">
                                <div className="box-child-employee1 div-detail">
                                    <p>Ngày sinh:</p>
                                    <input
                                        type="date"
                                        value={convertDobToISO(originalDOB)}
                                        onChange={(e) => setOriginalDOB(convertDobToISO(e.target.value))}
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
                            className="modal-footer1 add-origin"
                            onClick={showModalEditContract}
                        >
                            Sửa hợp đồng
                        </div>
                        <div
                            className="modal-footer1 add-origin"
                            onClick={showModalEditRole}
                        >
                            Sửa chức vụ
                        </div>
                    </div>

                    <div className="modal-footer modal-footer2">
                        <button className="btn-cancel" onClick={handleCancelView}>
                            Hủy bỏ
                        </button>
                        <button className="btn-edit btn-save" onClick={handleSave}>
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default EditProfileEmployee;
