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
  CreateEmployee,
} from "../../sevices/EmployeeService";
import { fetchAllRole } from "../../sevices/RoleService";
import { fetchAllDepadment } from "../../sevices/DepartmentService";
import {
  GetEmployeeContract,
  GetAllContractType,
  CreateContract,
  UpdateContract,
} from "../../sevices/contracts";
import MenuResponsive from "./componentUI/MenuResponsive";
import ListUserHeader from "./componentUI/ListUserHeader";
import { Select } from "antd";
import {
  TableEmployee,
  ListSearchAndFilter,
  EditRoleDepartmentModule,
  ViewRoleDepartmentModule,
} from "./componentEmployee";
import { EditRole, GetRolesByDepartmentId } from "../../sevices/RoleService";
import avt from "../assets/images/Frame 1649.svg";
import ViewRole1 from "./componentEmployee/ViewRole1";
function ListEmployeeComponent() {
  const [employees, setEmployees] = useState([]);
  const [employeesData, setEmployeesData] = useState([]);

  const [countries, setCountries] = useState([]);
  const [contract, setContract] = useState([]);
  const [contractTypes, setContractTypes] = useState([]);

  const [roles, setRoles] = useState([]);
  const [filterRoles, setFilterRoles] = useState([]);

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
  const [previewImage, setPreviewImage] = useState(null);
  const [originalOffice, setOriginalOffice] = useState("");

  const [contractId, setContractID] = useState("");
  const [contractCode, setContractCode] = useState("");
  const [contractStartDate, setContractStartDate] = useState(""); // Tên state đã được sửa
  const [contractEndDate, setContractEndDate] = useState(""); // Tên state đã được sửa
  const [contractType, setContractType] = useState("");
  const [contractLink, setContractLink] = useState("");
  const [contractStatus, setContractStatus] = useState(true);
  const [contractImage, setContractImage] = useState("");
  const [amount, setAmount] = useState("");

  const [filterGender, setFilterGender] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterRole, setFilterRole] = useState(null);
  const [inputSearch, setInputSearch] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [roleDepartmentValues, setRoleDepartmentValues] = useState([]);

  const handleContractAmountChange = (e) => {
    const formattedValue = e.target.value.replace(/\D/g, "");
    setAmount(formattedValue);
  };

  const handlePhoneNumberChange = (e) => {
    const formattedValue = e.target.value.replace(/\D/g, "");
    setOriginalPhoneNumber(formattedValue);
  };
  const handleCICChange = (e) => {
    const formattedValue = e.target.value.replace(/\D/g, "");
    setOriginalCIC(formattedValue);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSize = file.size; // Get file size in bytes
      if (fileSize > 100 * 1024) { // Check if size is over 100kb
        // Show toast notification
        toast.error('Kích thước hình ảnh quá lớn. Vui lòng tải lên một hình ảnh nhỏ hơn 100kb.');
        return; // Don't proceed with upload if size is over limit
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Image = event.target.result;
        setOriginalImage(base64Image); // Save base64 string to state

        const previewUrl = URL.createObjectURL(file);
        setPreviewImage(previewUrl); // Update preview image
      };
      reader.readAsDataURL(file);
    }
  };

  const updatedRoleDepartmentsAdd = roleDepartmentValues
    ? roleDepartmentValues.map((value) => {
      const updatedValue = {};
      if (value) {
        updatedValue.roleID = value.roleID;
        updatedValue.departmentID = value.departmentID;
      } else {
        updatedValue.roleID = null;
        updatedValue.departmentID = null;
      }
      return updatedValue;
    })
    : [];

  const handleEdit = () => {
    fetchAllCountry();
    setIsEditing(true);
    allRole(idDetail.roleDepartments[0]?.departmentID)

  };

  const handleBack = () => {
    setIsEditing(false);
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
        setContractTypes(data);
      })
      .catch((error) => {
      });
  };

  const featchEmployeeContract = (value) => {

    GetEmployeeContract(value)
      .then((data) => {
        setContract(data);
        setContractID(data.contractId);
        setContractCode(data.contractCode);
        setContractStatus(data.status);
        setContractType(data.contractTypeId);
        setContractStartDate(data.startDate); // Tên state đã được sửa
        setContractEndDate(data.endDate); // Tên state đã được sửa
        setContractLink(data.linkDoc);
        setContractImage(data.image);
        setAmount(data.amount);
        setOriginalOffice(data.isOffice)
      })
      .catch((error) => {
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

    if (!originalDOB) {
      errors.push("Vui lòng chọn ngày sinh của nhân viên.");
    }

    if (
      !originalCIC &&
      !(originalCIC.length === 9 || originalCIC.length === 12)
    ) {
      errors.push("Mã định danh phải có 9 hoặc 12 số.");
    }

    const taxIdRegex = /^[0-9A-Za-z]{10}$|^[0-9A-Za-z]{13}$/;
    if (originalTaxId && !taxIdRegex.test(originalTaxId)) {
      errors.push("Mã số thuế phải có 10 hoặc 13 và kí tự khác.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!originalEmail || (originalEmail && !emailRegex.test(originalEmail))) {
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
  // log();

  const validateDataDepartment = () => {
    const errors = [];
    const departmentIdCount = {};
    const roleIdCount = {};
    let isValidPairFound = false;

    if (!roleDepartmentValues || roleDepartmentValues.length === 0) {
      errors.push("Cần thêm ít nhất một cặp chức vụ phòng ban.");
    } else {
      roleDepartmentValues.forEach((value) => {
        // Kiểm tra tính hợp lệ của mỗi cặp
        if (
          (value.roleID && !value.departmentID) ||
          (!value.roleID && value.departmentID)
        ) {
          errors.push(
            "Trong mỗi cặp, cả roleID và departmentID phải cùng hợp lệ hoặc cùng null."
          );
        } else if (value.roleID && value.departmentID) {
          isValidPairFound = true;

          // Đếm số lần xuất hiện của mỗi departmentID
          departmentIdCount[value.departmentID] =
            (departmentIdCount[value.departmentID] || 0) + 1;

          // Đếm số lần xuất hiện của mỗi roleID
          roleIdCount[value.roleID] = (roleIdCount[value.roleID] || 0) + 1;
        }
      });

      // Kiểm tra nếu có ít nhất một cặp hợp lệ
      if (!isValidPairFound) {
        errors.push("Phải có ít nhất một cặp có dữ liệu hợp lệ.");
      }

      // Kiểm tra nếu có departmentID xuất hiện nhiều hơn 1 lần
      for (const count of Object.values(departmentIdCount)) {
        if (count > 1) {
          errors.push(`Phòng ban không được trùng nhau.`);
          break;
        }
      }

      // Kiểm tra nếu có roleID xuất hiện nhiều hơn 1 lần
      for (const count of Object.values(roleIdCount)) {
        if (count > 1) {
          errors.push(`Chức vụ không được trùng nhau.`);
          break;
        }
      }
    }

    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.warning(error);
      });
      return false;
    }
    return true;
  };

  const validateDataDepartmentEdit = () => {
    const errors = [];
    const departmentIdCount = {};
    const roleIdCount = {};
    let isValidPairFound = false;

    updatedRoleDepartments.forEach((roleDept) => {
      // Kiểm tra tính hợp lệ của mỗi cặp
      if (
        (roleDept.roleID && !roleDept.departmentID) ||
        (!roleDept.roleID && roleDept.departmentID)
      ) {
        errors.push(
          "Trong mỗi cặp, cả roleID và departmentID phải cùng hợp lệ hoặc cùng null."
        );
      }

      // Kiểm tra có ít nhất một cặp hợp lệ
      if (roleDept.roleID && roleDept.departmentID) {
        isValidPairFound = true;

        // Đếm số lần xuất hiện của mỗi departmentID
        departmentIdCount[roleDept.departmentID] =
          (departmentIdCount[roleDept.departmentID] || 0) + 1;

        // Đếm số lần xuất hiện của mỗi roleID
        roleIdCount[roleDept.roleID] = (roleIdCount[roleDept.roleID] || 0) + 1;
      }
    });

    // Nếu không tìm thấy cặp hợp lệ nào
    if (!isValidPairFound) {
      errors.push("Phải có ít nhất một cặp có dữ liệu hợp lệ.");
    }

    // Kiểm tra nếu có departmentID xuất hiện nhiều hơn 1 lần
    for (const count of Object.values(departmentIdCount)) {
      if (count > 1) {
        errors.push(`Phòng ban không được trùng nhau.`);
        break;
      }
    }

    // Kiểm tra nếu có roleID xuất hiện nhiều hơn 1 lần
    for (const count of Object.values(roleIdCount)) {
      if (count > 1) {
        errors.push(`Chức vụ không được trùng nhau.`);
        break;
      }
    }

    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.warning(error);
      });
      return false;
    }
    return true;
  };

  const validateDataContract = () => {
    const errors = [];
    if (!contractCode) {
      errors.push("Vui lòng nhập mã hợp đồng.");
    }
    if (!amount) {
      errors.push("Vui lòng nhập số tiền");
    }
    if (isNaN(amount)) {
      errors.push("Vui lòng nhập số tiền là số");
    }

    if (!contractStartDate) {
      errors.push("Vui lòng chọn thời gian bắt đầu hợp đồng không được phép.");
    }


    if (!contractType) {
      errors.push("Vui lòng chọn loại hợp đồng.");
    }
    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.warning(error);
      });
      return false;
    }
    return true;
  };

  const EditName = () => {
    const isDataContract = validateDataContract();
    if (!isDataContract) {
      return;
    }
    toast.promise(
      new Promise((resolve) => {
        UpdateContract(
          contractId,
          id,
          contractStartDate,
          contractEndDate,
          contractLink,
          contractStatus,
          contractType,
          contractCode,
          contractImage,
          amount,
          originalOffice
        )
          .then((data) => {
            resolve(data);
            handleSaveContract();
            handlelDetail(id);
          })
          .catch((error) => {
            resolve(Promise.reject(error));
          });
      }),
      {
        pending: "Đang xử lý",
        success: "Cập nhật hợp đồng thành công",
        error: "Lỗi cập nhật hợp đồng",
      }
    );
  };

  const HandelEditRole = () => {
    const isDataDepartment = validateDataDepartmentEdit();

    if (!isDataDepartment) {
      return;
    }
    toast.promise(
      EditRole(id, updatedRoleDepartments)
        .then((data) => {
          handleSaveRole();
          fetchData();
          handlelDetail(id)
          return data;
        })
        .catch((error) => {
          throw toast.error(error.response.data);
        }),
      {
        success: "Thêm nhân viên thành công",
      }
    );
  };

  const UpdateEditEmployee = () => {
    const isDataValid = validateData();
    if (!isDataValid) {
      return;
    }
    toast.promise(
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
        originalEmail,
        originalImage
      )
        .then((data) => {
          setIsEditing(false);
          handlelDetail(id);
          handleSave();
          fetchData();
          return toast.success(data);
        })
        .catch((error) => {
          throw toast.error(error.response.data);
        }),
      {
        pending: "Đang xử lý",
      }
    );
  };

  const AddEmployee = () => {
    const isDataValid = validateData();
    const isDataDepartment = validateDataDepartment();
    const isDataContract = validateDataContract();

    if (!isDataValid || !isDataDepartment || !isDataContract) {
      return;
    }

    toast.promise(
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
        updatedRoleDepartmentsAdd,
        originalEmail,
        originalImage
      )
        .then((data) => {
          handleCancelAdd();
          AddContract(data);
        })
        .catch((error) => {
          throw toast.error(error.response.data);
        }),
      {
        pending: "Đang xử lý",
      }
    );
  };

  const AddContract = (eid) => {
    toast.promise(
      CreateContract(
        eid,
        contractStartDate,
        contractEndDate,
        contractLink,
        contractStatus,
        contractType,
        contractCode,
        amount,
        originalOffice
      )
        .then((data) => {
          fetchData();
          throw toast.success(data);
          resetOriginalDetail();
        })
        .catch((error) => {
          throw toast.error(error.response.data);
        }),
      {
        pending: "Đang xử lý",
        success: "Thêm mới nhân viên thành công",
        error: "Lỗi thêm nhân viên",
      }
    );
  };

  const fetchAllCountry = () => {
    GetAllCountry()
      .then((data) => {
        setCountries(data);
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
    setIsModalOpenEditRole(true);
  };


  const handleSaveRole = () => {
    setIsEditingRole(false);
    setIsModalOpenEditRole(false);
  };

  const [isEditingContract, setIsEditingContract] = useState(false);
  const handleEditContract = () => {
    setIsEditingContract(true);
    setIsModalOpenEditContract(true);
  };
  const handleSaveContract = () => {
    setIsEditingContract(false);
    setIsModalOpenEditContract(false);
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
    setRoleDepartmentValues([]);
    setContractCode("");
    setContractStartDate("");
    setContractEndDate("");
    setContractType("");
    setContractLink("");
    setContractStatus(true);
    setContractImage("");
    setAmount("");
    setPreviewImage("")
    setOriginalOffice("")
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


  const allRole = (departmentID) => {
    GetRolesByDepartmentId(departmentID)
      .then((data) => {
        setRoles(data);
      })
      .catch((error) => { });
  };

  const fetchFilterAllRole = () => {
    fetchAllRole()
      .then((data) => {
        setFilterRoles(data)
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  console.log('roles', filterRole);


  const searchandfilter = (ipSearch, ftGender, ftStatus, ftRole) => {
    SearchEmployees(ipSearch, ftGender, ftStatus, ftRole)
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => {
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
  const convertTimeToInputFormat = (timeString) => {
    if (timeString) {
      const parts = timeString.split(":");

      if (parts.length === 3) {
        const hours = parts[0];
        const minutes = parts[1];

        // Extract seconds and remove fractional seconds
        const secondsWithFraction = parts[2];
        const seconds = secondsWithFraction.split(".")[0];

        return `${hours}:${minutes}:${seconds}`;
      }
      return timeString;
    }
    return timeString;
  };
  const fetDataDepartment = () => {
    fetchAllDepadment()
      .then((data) => {
        setDepartments(data);
      })
      .catch((error) => { });
  };

  const fetchData = () => {
    let isDataLoaded = false;
    let toastId = null;

    fetchAllEmplyee()
      .then((data) => {
        isDataLoaded = true;
        setEmployees(data);
        setEmployeesData(data)
        if (toastId) {
          toast.dismiss(toastId); // Hủy thông báo nếu nó đã được hiển thị
        }
      })
      .catch((error) => {
        isDataLoaded = true;
        if (toastId) {
          toast.dismiss(toastId); // Hủy thông báo nếu nó đã được hiển thị
        }
        toast.error("Lỗi không có nhân viên"); // Hiển thị thông báo lỗi ngay lập tức
      });
    setTimeout(() => {
      if (!isDataLoaded) {
        toastId = toast("Đang xử lý...", { autoClose: false }); // Hiển thị thông báo pending sau 1.5s nếu dữ liệu chưa được tải
      }
    }, 1500);
  };

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    setInputSearch(searchText);
    const filteredData = employeesData.filter((detail) =>
      detail.fullName.toLowerCase().includes(searchText.toLowerCase())
    );
    setEmployees(filteredData);
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
            setOriginalEmail(data.email);
            setPreviewImage(data.image)
            setOriginalImage(data.image)
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
    fetDataDepartment();
    featchAllContract();
    fetchFilterAllRole();
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
          label: "Tất cả chức vụ",
        },
      ]
      : []),
    ...filterRoles.map((role) => ({
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

  const handleChange = (value) => {
  };
  const { Option } = Select;
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
    resetOriginalDetail();
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

  const [isModalOpenViewContract1, setIsModalOpenViewContract1] = useState(
    false
  );
  const showModalViewContract1 = () => {
    setIsModalOpenViewContract1(true);
  };
  const handleOkViewContract1 = () => {
    setIsModalOpenViewContract1(false);
  };
  const handleCancelViewContract1 = () => {
    setIsModalOpenViewContract1(false);
  };

  const [isModalOpenViewRole1, setIsModalOpenViewRole1] = useState(false);
  const showModalViewRole1 = () => {
    setIsModalOpenViewRole1(true);
  };
  const handleOkViewRole1 = () => {
    setIsModalOpenViewContract1(false);
  };
  const handleCancelViewRole1 = () => {
    setIsModalOpenViewRole1(false);
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

  // upload file img
  const [image, setImage] = useState("");
  function handleImage(e) {
    setImage(e.target.files[0]);
  }

  return (
    <div className="col-right-container employee-controller">
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
        EditName={EditName}
        handleImageUpload={handleImageUpload}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        amount={amount}
        handleContractAmountChange={handleContractAmountChange}
        setAmount={setAmount}
        setOriginalOffice={setOriginalOffice}
        originalOffice={originalOffice}
        allRole={allRole}
        handleSearchChange={handleSearchChange}
        employees={employees}
        inputSearch={inputSearch}
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
          HandelEditRole={HandelEditRole}
          allRole={allRole}
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
      <div className="modal-employees">
        {/* upload file img */}
        {isEditing ? (
          <div className="modal-res">
            {" "}
            <Modal
              className="modal-employee"
              visible={isModalOpen}
              onOk={UpdateEditEmployee}
              onCancel={handleBack}
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
                          />
                        </div>
                        <div className="div1-modal-cn div2-fix name_reponsive">
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
                        <p>Ngày sinh:</p>
                        <Input
                          type="date"
                          value={convertDobToISO(originalDOB)}
                          onChange={(e) =>
                            setOriginalDOB(convertDobToISO(e.target.value))
                          }
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
                          <p>Địa chỉ: </p>
                          <textarea
                            value={originalAddress}
                            onChange={(e) => setOriginalAddress(e.target.value)}
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
                      className="modal-footer1 add-origin"
                      onClick={handleEditContract}
                    >
                      Sửa hợp đồng
                    </div>
                    <div
                      className="modal-footer1 add-origin"
                      onClick={handleEditRole}
                    >
                      Sửa chức vụ
                    </div>
                  </div>

                  <div className="modal-footer modal-footer2">
                    <button className="btn-cancel" onClick={handleBack}>
                      Hủy bỏ
                    </button>
                    <button
                      className="btn-edit btn-save"
                      onClick={UpdateEditEmployee}
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        ) : (
          <div className="modal-res">
            {" "}
            <Modal
              className="modal-employee"
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
                          alt="avt"
                          loading="lazy"
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
                        <p>Ngày sinh:</p>
                        <Input
                          type="date"
                          value={
                            idDetail && idDetail.dobstring
                              ? convertDobToISO(idDetail.dobstring)
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
                          <p>Địa chỉ: </p>
                          <textarea
                            disabled
                            value={
                              idDetail && idDetail.address
                                ? idDetail.address
                                : "Chưa có thông tin"
                            }
                          />
                        </div>
                      </div>
                      <div className="box2-child-cn">
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
                        <div className="box-child-employee1 div-detail">
                          <p>Trạng thái:</p>
                          <Switch
                            checked={
                              idDetail && idDetail.status
                                ? idDetail.status
                                : false
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer modal-footer-add">
                  <div className="btn-left">
                    <div
                      className="modal-footer1"
                      onClick={showModalViewContract1}
                    >
                      Xem hợp đồng
                    </div>
                    <div className="modal-footer1" onClick={showModalViewRole1}>
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
          </div>
        )}
        <Modal
          className="modal"
          open={isModalOpenViewContract1}
          onOk={handleOkViewContract1}
          onCancel={handleCancelViewContract1}
        >
          <div className="modal-add-roleyee-employee modal-contract fix-close">
            <div className="modal-head">
              <h3>Hợp đồng</h3>
              <div className="close" onClick={handleCancelViewContract1}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M35 7.30769L22.3077 20L35 32.6923L32.6923 35L20 22.3077L7.30769 35L5 32.6923L17.6923 20L5 7.30769L7.30769 5L20 17.6923L32.6923 5L35 7.30769Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div className="body-add-role-employee">
              <table>
                <thead className="thead-first"></thead>
                <div className="body-table body-table-contract">
                  <tr>
                    <Input
                      className="select-input"
                      placeholder="Mã hợp đồng"
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                      value={contractCode}
                    />
                    <div className="input-date">
                      <Input
                        className="select-input"
                        value={contract.contractTypeName}
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </tr>
                  <tr>
                    <p className="salary-contract">Lương hợp đồng:</p>
                    <Input
                      type="text"
                      placeholder="Lương hợp đồng"
                      value={contract.amount}
                    ></Input>
                  </tr>
                  <tr>
                    <div className="input-date">
                      <Input
                        className="select-input"
                        placeholder="Thời gian bắt đầu"
                        type="date"
                        style={{
                          width: "100%",
                        }}
                        value={convertDobToISO(contractStartDate)}
                      />
                    </div>
                    <div className="input-date">
                      <Input
                        className="select-input"
                        placeholder="Thời gian kết thúc"
                        type="date"
                        style={{
                          width: "100%",
                        }}
                        value={convertDobToISO(contractEndDate)}
                      />
                    </div>
                  </tr>
                  <tr>
                    <div className="input-date">
                      <Input
                        className="select-input"
                        placeholder="Đường dẫn hợp đồng"
                        style={{
                          width: "100%",
                        }}
                        value={contractLink}
                      />
                      <div className="input-date-cn">
                        <p>Trạng thái: </p>
                        <Form.Item valuePropName="checked" className="action">
                          <Switch checked={contractStatus} />
                        </Form.Item>
                      </div>
                    </div>
                  </tr>
                </div>
                <thead className="thead-last"></thead>
              </table>
            </div>
          </div>
        </Modal>
      </div>


      <ViewRole1
        isModalOpenViewRole1={isModalOpenViewRole1}
        handleOkViewRole1={handleOkViewRole1}
        handleCancelViewRole1={handleCancelViewRole1}
        idDetail={idDetail}
      />
    </div>
  );
}

export default ListEmployeeComponent;
