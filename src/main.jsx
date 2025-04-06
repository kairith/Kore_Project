import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";  // ✅ Your main app file
import { AuthProvider } from "./AuthContext"; // ✅ Auth context wrapper
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>  {/* ✅ Only one BrowserRouter */}
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
);
