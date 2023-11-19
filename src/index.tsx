import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./components/App";
import "./index.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { GlobalContextProvider } from "utils/globalContext";

const container = document.getElementById("app") as HTMLElement;
createRoot(container).render(
  <GlobalContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </GlobalContextProvider>,
);
