import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store";
import { AuthProvider } from "./context/AuthContext";
import { AppDataLoader } from "./context/AppStateContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <AppDataLoader>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppDataLoader>
      </AuthProvider>
    </Provider>
  </StrictMode>,
);
