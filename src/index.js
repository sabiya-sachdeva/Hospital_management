import React from "react";

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { DoctorProvider } from "./DoctorContext";
import { CartProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <DoctorProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </DoctorProvider>
  </BrowserRouter>
);
