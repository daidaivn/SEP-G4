import React from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import App from "./App";
import ForgetComponent from "./view/component/ForgetComponent";
import LoginComponent from "./view/component/LoginComponent";
import NotFoundComponent from "./view/component/NotFoundComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppContainer() {
  return (
    <div>
      <App />
    </div>
  );
}

function ProtectedRoute({ children }) {
  const location = useLocation();

  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (
    !sessionStorage.getItem("userToken") &&
    !localStorage.getItem("userToken")
  ) {
    // Nếu chưa đăng nhập, chuyển hướng tới trang đăng nhập
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return children;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/forget" element={<ForgetComponent />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppContainer />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundComponent />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
);
