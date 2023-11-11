import "../scss/reset.scss";
import "../scss/index.scss";
import "../scss/ListEmployeeComponent.scss";
import "../scss/responsive/responsive.scss";
import "../scss/responsive/ListEmployee.scss";
import "../scss/fonts.scss";
import { Input, Switch, Form, Space } from "antd";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { Radio } from "antd";
import React, { useState, useEffect } from "react";
import {
  fetchAllEmplyee,
  SearchEmployees,
  DetailID,
  UpdateEmployee,
  GetAllCountry,
  CreateEmployee
} from "../../sevices/EmployeeService";
import { fetchAllRole } from "../../sevices/RoleService";
import { fetchAllDepadment } from "../../sevices/DepartmentService";
import { GetEmployeeContract, GetAllContractType } from "../../sevices/contracts";
import profile from "../assets/images/Ellipse 72.svg";
import MenuResponsive from "./componentUI/MenuResponsive";
import Filter from "./componentUI/Filter";
import ListUserHeader from "./componentUI/ListUserHeader";
import { Select } from "antd";
import {
  TableEmployee,
  ListSearchAndFilter,
  EditRoleDepartmentModule,
  ViewRoleDepartmentModule,
} from "./componentEmployee";
import avt from "../assets/images/Frame 1649.svg";
function ListEmployeeComponent() {
  const [employees, setEmployees] = useState([]);
  const [countries, setCountries] = useState([]);
  const [contract, setContract] = useState([]);
  const [contractTypes, setContractTypes] = useState([]);


  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [id, setId] = useState(null);
  const [idDetail, setIdDetail] = useState(null);
  const updatedIdDetail = { ...idDetail };

  const [originalLastName, setOriginalLastName] = useState("");
  const [originalFirstName, setOriginalFirstName] = useState("");
  const [originalPhoneNumber, setOriginalPhoneNumber] = useState("");
  const [originalGender, setOriginalGender] = useState("");
  const [originalNationality, setOriginalNationality] = useState("");
  const [originalAddress, setOriginalAddress] = useState("");
  const [originalCIC, setOriginalCIC] = useState("");
  const [originalTaxId, setOriginalTaxId] = useState("");
  const [originalDOB, setOriginalDOB] = useState("");
  const [originalStatus, setOriginalStatus] = useState(true);
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalImage, setOriginalImage] = useState("");
  const [originalWage, SetOriginalWage] = useState("");
  const [originalDepartment, setOriginalDepartment] = useState("");

  //contract
  const [contractCode, setContractCode] = useState("");
  const [contractStartDate, setContractStartDate] = useState("");  // Tên state đã được sửa
  const [contractEndDate, setContractEndDate] = useState("");  // Tên state đã được sửa
  const [contractType, setContractType] = useState("");
  const [contractLink, setContractLink] = useState("");
  const [contractStatus, setContractStatus] = useState("");

console.log('contractCode',contractCode);


  const [gender, setGender] = useState();

  const [filterGender, setFilterGender] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterRole, setFilterRole] = useState(null);
  const [inputSearch, setInputSearch] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [roleDepartmentValues, setRoleDepartmentValues] = useState([]);

  const log = () => {
    console.log("id", id);
    console.log("LastName", originalLastName);
    console.log("FirstName", originalFirstName);
    console.log("PhoneNumber", originalPhoneNumber);
    console.log("Gender", originalGender);
    console.log("NationalityID", originalNationality);
    console.log("Address", originalAddress);
    console.log("CIC", originalCIC);
    console.log("TaxId", originalTaxId);
    console.log("DOB", originalDOB);
    console.log("TaxStatus", originalStatus);
    console.log("avt", avt);
    console.log("Email", originalEmail);
    console.log("Roles:", updatedRoleDepartments);
    console.log("Roles:", updatedRoleDepartmentsAdd);
  };
  // log();

  const addDependent = () => {
    if (updatedIdDetail && updatedIdDetail.roleDepartments) {
      const newRoleDepartmentValues = updatedIdDetail.roleDepartments.map(
        (roleDept) => ({
          roleID: roleDept.roleID,
          departmentID: roleDept.departmentID,
        })
      );
      setRoleDepartmentValues(newRoleDepartmentValues);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const formattedValue = e.target.value.replace(/\D/g, '');
    setOriginalPhoneNumber(formattedValue);
  };
  const handleCICChange = (e) => {
    const formattedValue = e.target.value.replace(/\D/g, '');
    setOriginalCIC(formattedValue);
  };

  const updatedRoleDepartmentsAdd = roleDepartmentValues.map((value) => {
    const updatedValue = {};
    if (value) {
      updatedValue.roleID = value.roleID;
      updatedValue.departmentID = value.departmentID;
    } else {
      updatedValue.roleID = null;
      updatedValue.departmentID = null;
    }
    return updatedValue;
  });

  const handleEdit = () => {
    fetchAllCountry();
    setIsEditing(true);
  };

  const updatedRoleDepartments = (updatedIdDetail?.roleDepartments || []).map(
    (roleDept) => ({
      roleID: roleDept.roleID,
      departmentID: roleDept.departmentID,
    })
  );

  const featchAllContract = () => {
    GetAllContractType()
      .then((data) => {
        console.log('', data);
        setContractTypes(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const featchEmployeeContract = (value) => {
    console.log(value);

    GetEmployeeContract(value)
      .then((data) => {
        setContract(data);
        setContractCode(data.contractCode);
        setContractStatus(data.status);
        setContractType(data.contractTypeId);
        setContractStartDate(data.startDate);  // Tên state đã được sửa
        setContractEndDate(data.endDate);  // Tên state đã được sửa
        setContractLink(data.linkDoc);
      })
      .catch((error) => {
        console.log('error', error);

      });
  };

  const validateData = () => {
    const errors = [];

    if (!originalLastName) {
      errors.push("Vui lòng nhập họ và tên đệm.");
    }

    if (!originalFirstName) {
      errors.push("Vui lòng nhập tên.");
    }

    if (!originalPhoneNumber || originalPhoneNumber.length !== 10) {
      errors.push("Vui lòng nhập số điện thoại có 10 số.");
    }

    if (!originalNationality) {
      errors.push("Vui lòng chọn quốc tịch.");
    }

    if (!originalAddress) {
      errors.push("Vui lòng nhập địa chỉ.");
    }

    if (originalCIC && !(originalCIC.length === 9 || originalCIC.length === 12)) {
      errors.push("Mã định danh phải có 9 hoặc 12 số.");
    }

    const taxIdRegex = /^[0-9A-Za-z]{10}$|^[0-9A-Za-z]{13}$/;
    if (originalTaxId && !taxIdRegex.test(originalTaxId)) {
      errors.push("Mã số thuế phải có 10 hoặc 13 và kí tự khác.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (originalEmail && !emailRegex.test(originalEmail)) {
      errors.push("Email không hợp lệ.");
    }

    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.warning(error);
      });
      return false;
    }

    return true;
  };

  const UpdateEditEmployee = () => {
    if (!validateData()) {
      return;
    }

    toast.promise(
      new Promise((resolve) => {
        UpdateEmployee(
          id,
          originalLastName,
          originalFirstName,
          originalPhoneNumber,
          originalGender,
          originalNationality,
          originalAddress,
          originalCIC,
          originalTaxId,
          originalDOB,
          originalStatus,
          updatedRoleDepartments,
          originalEmail,
          originalImage
        )
          .then((data) => {
            resolve(data);
            handlelDetail(id);
            handleSave()
            fetchData();
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        success: "Cập nhật nhân viên thành công",
        error: "Lỗi cập nhật nhân viên",
      }
    );
  };

  const AddEmployee = () => {
    if (!validateData()) {
      return;
    }

    toast.promise(
      new Promise((resolve) => {
        CreateEmployee(
          originalLastName,
          originalFirstName,
          originalPhoneNumber,
          originalGender,
          originalNationality,
          originalAddress,
          originalCIC,
          originalTaxId,
          originalDOB,
          originalStatus,
          updatedRoleDepartments,
          originalEmail,
          originalImage
        )
          .then((data) => {
            resolve(data);
            fetchData();
            handleCancelAdd();
            resetOriginalDetail();
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        success: "Thêm nhân viên thành công",
        error: "Lỗi thêm nhân viên",
      }
    );
  };


  const fetchAllCountry = () => {
    GetAllCountry()
      .then((data) => {
        setCountries(data);
        console.log(data);
      })
      .catch((error) => { });
  };



  const handleSave = () => {
    resetOriginalDetail();
    setIsEditing(false);
  };

  const [isEditingRole, setIsEditingRole] = useState(false);
  const handleEditRole = () => {
    setIsEditingRole(true);
  };
  const handleSaveRole = () => {
    setIsEditingRole(false);
  };

  const [isEditingContract, setIsEditingContract] = useState(false);
  const handleEditContract = () => {
    setIsEditingContract(true);
  };
  const handleSaveContract = () => {
    setIsEditingContract(false);
  };

  const resetOriginalDetail = () => {
    setIsModalOpen(false);
    setOriginalLastName("");
    setOriginalFirstName("");
    setOriginalPhoneNumber("");
    setOriginalGender(true);
    setOriginalNationality("");
    setOriginalAddress("");
    setOriginalCIC("");
    setOriginalTaxId("");
    setOriginalDOB("");
    setOriginalStatus(true);
    setOriginalEmail("");
    setOriginalImage("");
  };

  const handleCancelView = () => {
    setIsEditing(false); // Đặt trạng thái chỉnh sửa về false
    setIsModalOpen(true);
    setIsModalOpen(false);
    resetOriginalDetail();
  };
  const handleCancelView1 = () => {
    setIsEditingRole(false); // Đặt trạng thái chỉnh sửa về false
    setIsModalOpenEditRole(true);
  };
  const handleCancelViewContract = () => {
    setIsEditingContract(false); // Đặt trạng thái chỉnh sửa về false
    setIsModalOpenEditContract(true);
  };
  const allRole = () => {
    fetchAllRole()
      .then((data) => {
        setRoles(data);
      })
      .catch((error) => { });
  };
  const searchandfilter = (ipSearch, ftGender, ftStatus, ftRole) => {
    SearchEmployees(ipSearch, ftGender, ftStatus, ftRole)
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const convertDobToISO = (dobstring) => {
    if (dobstring) {
      const parts = dobstring.split("-");
      if (parts.length === 3) {
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        return `${year}-${month}-${day}`;
      }
      return dobstring;
    }
    return dobstring;
  };
  const fetDataDepartment = () => {
    fetchAllDepadment()
      .then((data) => {
        setDepartments(data);
      })
      .catch((error) => { });
  };

  const fetchData = () => {
    toast.promise(
      new Promise((resolve) => {
        fetchAllEmplyee()
          .then((data) => {
            setEmployees(data);
            resolve(data);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang tải dữ liệu",
        error: "Lỗi tải dữ liệu",
      }
    );
  };
  const handlelDetail = (value) => {
    toast.promise(
      new Promise((resolve) => {
        DetailID(value)
          .then((data) => {
            setIdDetail(data);
            setOriginalLastName(
              data.fullName.split(" ").slice(0, -1).join(" ")
            );
            setOriginalFirstName(data.fullName.split(" ").slice(-1).join(" "));
            setOriginalPhoneNumber(data.phoneNumber);
            setOriginalGender(data.gender);
            setOriginalNationality(data.countryId);
            setOriginalAddress(data.address);
            setOriginalCIC(data.cic);
            setOriginalTaxId(data.taxId);
            setOriginalDOB(data.dobstring);
            setOriginalStatus(data.status);
            SetOriginalWage(data.wave);
            setOriginalEmail(data.email)
            resolve(data);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        error: "Lỗi dữ liệu thông tin chi tiết!",
      }
    );
  };

  useEffect(() => {
    fetchAllCountry();
    fetchData();
    allRole();
    fetDataDepartment();
  }, [id]);

  function handleSelectChange(value) {
    const actualValue = value === null ? null : value;
    setFilterRole(actualValue);
    searchandfilter(inputSearch, filterGender, filterStatus, actualValue);
  }

  const selectOptions = [
    ...(filterRole
      ? [
        {
          value: null,
          label: "Bỏ chọn",
        },
      ]
      : []),
    ...roles.map((role) => ({
      value: role.roleID,
      label: role.roleName,
    })),
  ];
  const handleChangeFilterGender = (value) => {
    setFilterGender(value);
    searchandfilter(inputSearch, value, filterStatus, filterRole);
  };
  const handleChangeFilterStatus = (value) => {
    setFilterStatus(value);
    searchandfilter(inputSearch, filterGender, value, filterRole);
  };
  const handleChangeInnputSearch = (e) => {
    setInputSearch(e.target.value);
    searchandfilter(e.target.value, filterGender, filterStatus, filterRole);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const { Option } = Select;
  const handleChangeAddEmployee = (value) => {
    console.log(`selected ${value}`);
  };
  const [value, setValue] = useState(1);
  const onChangeRadio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModalDetail = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    resetOriginalDetail();
  };

  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const showModalAdd = () => {
    setIsModalOpenAdd(true);
  };
  const handleOkAdd = () => {
    setIsModalOpenAdd(false);
    resetOriginalDetail()
  };
  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  const [isModalOpenEditRole, setIsModalOpenEditRole] = useState(false);
  const showModalEditRole = () => {
    setIsModalOpenEditRole(true);
  };
  const handleOkEditRole = () => {
    setIsModalOpenEditRole(false);
  };
  const handleCancelEditRole = () => {
    setIsModalOpenEditRole(false);
  };

  const [isModalOpenAddRole, setIsModalOpenAddRole] = useState(false);
  const showModalAddRole = () => {
    setIsModalOpenAddRole(true);
  };
  const handleOkAddRole = () => {
    setIsModalOpenAddRole(false);
  };
  const handleCancelAddRole = () => {
    setIsModalOpenAddRole(false);
  };

  const [isModalOpenEditContract, setIsModalOpenEditContract] = useState(false);
  const showModalEditContract = () => {
    setIsModalOpenEditContract(true);
  };
  const handleOkEditContract = () => {
    setIsModalOpenEditContract(false);
  };
  const handleCancelEditContract = () => {
    setIsModalOpenEditContract(false);
  };

  const [isModalOpenAddContract, setIsModalOpenAddContract] = useState(false);
  const showModalAddContract = () => {
    setIsModalOpenAddContract(true);
  };
  const handleOkAddContract = () => {
    setIsModalOpenAddContract(false);
  };
  const handleCancelAddContract = () => {
    setIsModalOpenAddContract(false);
  };

  const [isModalOpenContract, setIsModalOpenContract] = useState(false);
  const showModalContract = () => {
    setIsModalOpenContract(true);
  };
  const handleOkContract = () => {
    setIsModalOpenContract(false);
  };
  const handleCancelContract = () => {
    setIsModalOpenContract(false);
  };
  return (
    <div className="col-right-container">
      <div className="list-container-header">
        <div className="list-text-header">
          <h2>Danh sách nhân viên</h2>
          <span>
            Hiển thị thông tin chi tiết của các nhân viên trong xưởng mộc
          </span>
        </div>
        <MenuResponsive />
        <ListUserHeader />
      </div>
      <ListSearchAndFilter
        handleChangeInnputSearch={handleChangeInnputSearch}
        filterGender={filterGender}
        handleChangeFilterGender={handleChangeFilterGender}
        filterRole={handleSelectChange}
        handleSelectChange={handleSelectChange}
        selectOptions={selectOptions}
        filterStatus={filterStatus}
        handleChangeFilterStatus={handleChangeFilterStatus}
        showModalAdd={showModalAdd}
        isModalOpenAdd={isModalOpenAdd}
        handleOkAdd={handleOkAdd}
        handleCancelAdd={handleCancelAdd}
        avt={avt}
        originalLastName={originalLastName}
        setOriginalLastName={setOriginalLastName}
        originalFirstName={originalFirstName}
        setOriginalFirstName={setOriginalFirstName}
        originalPhoneNumber={originalPhoneNumber}
        setOriginalPhoneNumber={setOriginalPhoneNumber}
        originalGender={originalGender}
        setOriginalGender={setOriginalGender}
        originalNationality={originalNationality}
        setOriginalNationality={setOriginalNationality}
        countries={countries}
        originalAddress={originalAddress}
        setOriginalAddress={setOriginalAddress}
        originalCIC={originalCIC}
        setOriginalCIC={setOriginalCIC}
        originalTaxId={originalTaxId}
        setOriginalTaxId={setOriginalTaxId}
        convertDobToISO={convertDobToISO}
        originalDOB={originalDOB}
        setOriginalDOB={setOriginalDOB}
        originalStatus={originalStatus}
        setOriginalStatus={setOriginalStatus}
        originalEmail={originalEmail}
        setOriginalEmail={setOriginalEmail}
        handleCancelAddContract={handleCancelAddContract}
        handleOkAddContract={handleOkAddContract}
        isModalOpenAddContract={isModalOpenAddContract}
        showModalAddRole={showModalAddRole}
        showModalAddContract={showModalAddContract}
        handleChange={handleChange}
        handleCancelAddRole={handleCancelAddRole}
        handleOkAddRole={handleOkAddRole}
        isModalOpenAddRole={isModalOpenAddRole}
        roleDepartmentValues={roleDepartmentValues}
        roles={roles}
        setRoleDepartmentValues={setRoleDepartmentValues}
        handleCancelEditContract={handleCancelEditContract}
        handleOkEditContract={handleOkEditContract}
        isModalOpenEditContract={isModalOpenEditContract}
        isEditingContract={isEditingContract}
        handleEditContract={handleEditContract}
        departments={departments}
        handleCancelViewContract={handleCancelViewContract}
        handleSaveContract={handleSaveContract}
        AddEmployee={AddEmployee}
        handlePhoneNumberChange={handlePhoneNumberChange}
        handleCICChange={handleCICChange}
        contract={contract}
        contractTypes={contractTypes}
        contractCode={contractCode}
        setContractCode={setContractCode}
        contractStartDate={contractStartDate}
        setContractStartDate={setContractStartDate}
        contractEndDate={contractEndDate}
        setContractEndDate={setContractEndDate}
        contractType={contractType}
        setContractType={setContractType}
        contractLink={contractLink}
        setContractLink={setContractLink}
        contractStatus={contractStatus}
        setContractStatus={setContractStatus}
      />
      <div className="list-text-header-res">
        <h2>Danh sách nhân viên</h2>
        <span>
          Hiển thị thông tin chi tiết của các nhân viên trong xưởng mộc
        </span>
      </div>

      <TableEmployee
        employees={employees}
        showModal={showModalDetail}
        setId={setId}
        handlelDetail={handlelDetail}
        setIsModalOpen={setIsModalOpen}
        featchEmployeeContract={featchEmployeeContract}
        featchAllContract={featchAllContract}
      />
      {isEditingRole ? (
        <EditRoleDepartmentModule
          isModalOpenEditRole={isModalOpenEditRole}
          handleOkEditRole={handleOkEditRole}
          handleCancelEditRole={handleCancelEditRole}
          idDetail={idDetail}
          updatedIdDetail={updatedIdDetail}
          setIdDetail={setIdDetail}
          roles={roles}
          departments={departments}
          handleCancelView1={handleCancelView1}
          handleSaveRole={handleSaveRole}
        />
      ) : (
        // view chức vụ
        <ViewRoleDepartmentModule
          isModalOpenEditRole={isModalOpenEditRole}
          handleOkEditRole={handleOkEditRole}
          handleCancelEditRole={handleCancelEditRole}
          idDetail={idDetail}
          handleEditRole={handleEditRole}
        />
      )}
      {isEditing ? (
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
                      />
                    </div>
                    <div className="box-child-employee1 div-detail">
                      <p>Email:</p>
                      <Input
                        value={originalEmail}
                        onChange={(e) => setOriginalEmail(e.target.value)}
                        placeholder="Nhập email"
                      />
                    </div>
                  </div>
                  <div className="box2-child-cn">
                    <div className="box-child-employee1 div-detail">
                      <p>Ngày sinh:</p>
                      <input
                        type="date"
                        value={convertDobToISO(originalDOB)}
                        onChange={(e) =>
                          setOriginalDOB(convertDobToISO(e.target.value))
                        }
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
                <button className="btn-edit btn-save" onClick={UpdateEditEmployee}>
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal
          className="modal"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1252}
        >
          {/* Modail view detail */}
          <div className="modal-add-employee">
            <div className="modal-head-employee">
              <h3>Thông tin nhân viên chi tiết</h3>
            </div>
            <div className="modal-add-employee-all">
              <div className="modal-employee-box1">
                <div className="modal-child-body1">
                  <div className="img-body1">
                    <img
                      src={idDetail && idDetail.image ? idDetail.image : avt}
                      alt=""
                    />
                  </div>
                </div>
                <div className="modal-child-body2">
                  <div className="div-modal-child2 div-detail">
                    <p>Họ và tên:</p>
                    <Input
                      value={
                        idDetail && idDetail.fullName
                          ? idDetail.fullName
                          : "Chưa có thông tin"
                      }
                    />
                  </div>
                  <div className="div-modal-child2 div-detail">
                    <p>Giới tính: </p>
                    <div className="radio-employee">
                      <Input
                        value={
                          idDetail && idDetail.genderstring
                            ? idDetail.genderstring
                            : "Chưa có thông tin"
                        }
                      />
                    </div>
                  </div>
                  <div className="div-modal-child2 div-detail">
                    <p>Quốc tịch:</p>
                    <Input
                      value={
                        idDetail && idDetail.country
                          ? idDetail.country
                          : "Chưa có thông tin"
                      }
                    />
                  </div>

                  <div className="div-modal-child2 div-detail">
                    <p>Địa chỉ: </p>
                    <Input
                      value={
                        idDetail && idDetail.address
                          ? idDetail.address
                          : "Chưa có thông tin"
                      }
                    />
                  </div>
                  <div className="div-modal-child2 div-detail">
                    <p>Mã định danh: </p>
                    <Input
                      value={
                        idDetail && idDetail.cic
                          ? idDetail.cic
                          : "Chưa có thông tin"
                      }
                    />
                  </div>
                  <div className="div-modal-child2 div-detail">
                    <p>Số điện thoại: </p>
                    <Input
                      value={
                        idDetail && idDetail.phoneNumber
                          ? idDetail.phoneNumber
                          : "Chưa có thông tin"
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="modal-employee-box2">
                <div className="modal-box2-child">
                  <div className="box2-child-cn">
                    <div className="box-child-employee1 div-detail">
                      <p>Mã số thuế:</p>
                      <Input
                        value={
                          idDetail && idDetail.taxId
                            ? idDetail.taxId
                            : "Chưa có thông tin"
                        }
                      />
                    </div>
                    <div className="box-child-employee1 div-detail">
                      <p>Email:</p>
                      <Input
                        value={
                          idDetail && idDetail.email
                            ? idDetail.email
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
                        value={
                          idDetail && idDetail.dobstring
                            ? convertDobToISO(idDetail.dobstring)
                            : "Chưa có thông tin"
                        }
                      />
                    </div>
                    <div className="box-child-employee1 div-detail">
                      <p>Trạng thái:</p>
                      <Switch
                        checked={
                          idDetail && idDetail.status ? idDetail.status : false
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer modal-footer-add">
              <div className="btn-left">
                <div className="modal-footer1" onClick={showModalEditContract}>
                  Xem hợp đồng
                </div>
                <div className="modal-footer1" onClick={showModalEditRole}>
                  Xem chức vụ
                </div>
              </div>

              <div className="modal-footer modal-footer2">
                <button className="btn-cancel" onClick={handleCancel}>
                  Thoát
                </button>
                <button className="btn-edit" onClick={handleEdit}>
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ListEmployeeComponent;
