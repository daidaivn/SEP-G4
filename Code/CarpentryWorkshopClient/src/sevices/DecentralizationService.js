import axios from "./customize-axios";

const fetchAllDecentralization = () => {
  return axios.get("/CWMSapi/AccessCotroller/GetRolesWithPages");
};

// Hàm gọi API để thêm quyền truy cập cho một trang và một chức vụ
const addRolePage = (pageId, roleId) => {
  const requestBody = {
    pageId: pageId,
    roleId: roleId,
  };

  return axios.post("/CWMSapi/AccessCotroller/AddRolePage", requestBody);
};

const deleteRolePage = (pageId, roleId) => {
  return axios.delete(`/CWMSapi/AccessCotroller/DeleteRolePage/${roleId}/${pageId}`);
};
const formatDateTimeForInput = (dateTime) => {
  if (!dateTime) return '';

  // Cắt chuỗi để loại bỏ phần giây và 'Z' nếu có
  return dateTime.length > 16 ? dateTime.substring(0, 16) : dateTime;
};
export { fetchAllDecentralization, addRolePage, deleteRolePage, formatDateTimeForInput };
