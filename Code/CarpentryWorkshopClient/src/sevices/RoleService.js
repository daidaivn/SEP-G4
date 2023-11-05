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

export { fetchAllRole, SearchRoles, GetRoleById};
