import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { RecordsProvider } from "./context/RecordsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecordsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecordsProvider>
  </React.StrictMode>
);