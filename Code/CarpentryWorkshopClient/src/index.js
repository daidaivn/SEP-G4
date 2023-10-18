import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// import React from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import App from "./App";
// import ForgetComponent from "./view/component/ForgetComponent";
// import LoginComponent from "./view/component/LoginComponent";

// createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<LoginComponent />} />
//         <Route path="/forget" element={<ForgetComponent />} />
//         <Route path="/" element={<App />} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );
