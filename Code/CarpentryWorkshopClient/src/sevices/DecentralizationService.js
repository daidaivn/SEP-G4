import axios from "./customize-axios";

const fetchAllDecentralization = () => {
  return axios.get("/CCMSapi/AccessCotroller/GetRolesWithPages");
};

// Hàm gọi API để thêm quyền truy cập cho một trang và một chức vụ
const addRolePage = (pageId, roleId) => {
  const requestBody = {
    pageId: pageId,
    roleId: roleId,
  };

  return axios.post("/CCMSapi/AccessCotroller/AddRolePage", requestBody);
};

const deleteRolePage = (pageId, roleId) => {
  console.log(pageId);
  console.log(roleId);
  return axios.delete(`/CCMSapi/AccessCotroller/DeleteRolePage/${roleId}/${pageId}`);
};

export { fetchAllDecentralization, addRolePage, deleteRolePage };
