import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import App from "./App";
import ForgetComponent from "./view/component/ForgetComponent";
import LoginComponent from "./view/component/LoginComponent";
import NotFoundComponent from "./view/component/NotFoundComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function showLoginRequiredToast() {
  toast.error("Bạn chưa đăng nhập. Vui lòng đăng nhập trước.");
}

function requireLogin() {
  if (
    !sessionStorage.getItem("userToken") &&
    !localStorage.getItem("userToken")
  ) {
    showLoginRequiredToast();
    return <Navigate to="/login" />;
  }
  return null;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/forget" element={<ForgetComponent />} />
        <Route
          path="/*"
          element={
            <div>
              <App />
              {requireLogin()}
            </div>
          }
        />
        <Route path="*" element={<NotFoundComponent />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
);
