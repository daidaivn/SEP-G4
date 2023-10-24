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
    console.log(pageId);
    console.log(roleId);
    return axios.post("/CCMSapi/AccessController/AddRolePage", requestBody);
  };
  
  // Hàm gọi API để xóa quyền truy cập cho một trang và một chức vụ
  const deleteRolePage = (pageId, roleId) => {
    return axios.delete(`/CCMSapi/AccessController/DeleteRolePage/${pageId}/${roleId}`);
  };

export { fetchAllDecentralization, addRolePage, deleteRolePage };
