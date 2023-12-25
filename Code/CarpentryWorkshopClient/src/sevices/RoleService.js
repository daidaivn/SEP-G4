import axios from "./customize-axios";

const fetchAllRole = () => {
  return axios.get("/CWMSapi/Role/GetAllRoles");
};

const SearchRoles = (inputName, filterStatus) => {
  const requestBody = {
    inputText: inputName,
    status: filterStatus,
  };

  return axios.post(
    `/CWMSapi/Role/SearchRole`, requestBody
  );
};
const GetRoleById = (ID) => {
  const rid = ID;

  return axios.get(
    `/CWMSapi/Role/GetRoleEmployeeById?roleid=${rid}`
  );
};
const UpdateRole = (id, name, status) => {
  const requestBody = {
    roleId: id,
    roleName: name,
    status: status
  };

  return axios.put(
    `CWMSapi/Role/EditRole`, requestBody
  );
};

const EditRole = (eId, updatedRoleDepartments) => {
  const requestBody = {
    employeeId: eId,
    rds: updatedRoleDepartments
  };
  
  return axios.post(`/CWMSapi/Role/EditRole`, requestBody);

};

const GetRolesByDepartmentId = (departmentID) => {
  const departmentId = departmentID;
  return axios.get(
    `/CWMSapi/Role/GetRolesByDepartmentId?departmentId=${departmentId}`
  );
};

const GetAllRolesByDepartmentId = (departmentID) => {
  const departmentId = departmentID;
  return axios.get(
    `/CWMSapi/Role/GetAllRolesByDepartmentId?departmentId=${departmentId}`
  );
};

export { fetchAllRole, SearchRoles, GetRoleById, UpdateRole , EditRole, GetRolesByDepartmentId,GetAllRolesByDepartmentId};
