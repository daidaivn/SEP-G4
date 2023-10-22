import axios from "axios";

const sessionToken = sessionStorage.getItem('userToken');
const localToken = localStorage.getItem('userToken');
const userToken = sessionToken || localToken;

const instance = axios.create({
  baseURL: "https://localhost:7003",
});

if (userToken) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
}

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
