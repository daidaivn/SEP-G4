import axios from "axios";

const sessionToken = sessionStorage.getItem('userToken');
const localToken = localStorage.getItem('userToken');
const userToken = sessionToken || localToken;

const instance = axios.create({
  baseURL: "https://sep-g4-api.azurewebsites.net",
});

instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('userToken') || localStorage.getItem('userToken');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 404) {
        // Xử lý lỗi 404
        console.error("Lỗi 404: Không tìm thấy trang hoặc tài nguyên.");
      } else if (error.response.status === 500) {
        // Xử lý lỗi 500
        console.error("Lỗi 500: Lỗi máy chủ nội bộ.");
      }
    } else if (error.request) {
      console.error("Lỗi yêu cầu không có phản hồi.");
    } else {
      console.error("Lỗi không xác định.");
    }
    return Promise.reject(error);
  }
);

export default instance;

