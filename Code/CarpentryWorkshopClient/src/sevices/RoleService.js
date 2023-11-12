import axios from "./customize-axios";

const fetchAllRole = () => {
  return axios.get("/CCMSapi/Role/GetAllRoles");
};
const SearchRoles = (inputName, filterStatus) => {
  const requestBody = {
    inputText: inputName,
    status: filterStatus,
  };
  console.log(`/CCMSapi/Role/SearchRole`, requestBody);

  return axios.post(
    `/CCMSapi/Role/SearchRole`, requestBody
  );
};
const GetRoleById = (ID) => {
  const rid = ID;
  console.log('rid', rid);

  return axios.get(
    `/CCMSapi/Role/GetRoleById?rid=${rid}`
  );
};
const UpdateRole = (id, name, status) => {
  const requestBody = {
    roleId: id,
    roleName: name,
    status: status
  };
  console.log(`/CCMSapi/Role/UpdateRole`, requestBody);
  return axios.put(
    `CCMSapi/Role/EditRole`, requestBody
  );
};

const EditRole = (eId, updatedRoleDepartments) => {
  const requestBody = {
    employeeId: eId,
    rds: updatedRoleDepartments
  };
  console.log(`/CCMSapi/Role/EditRole`, requestBody);
  
  return axios.post(`/CCMSapi/Role/EditRole`, requestBody);

};
export { fetchAllRole, SearchRoles, GetRoleById, UpdateRole , EditRole};
