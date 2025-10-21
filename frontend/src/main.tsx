import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./pages/App.tsx";
import Home from "./pages/Home.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./store/authContext.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/app", element: <App /> },
]);

const CLIENTID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

console.log("CLIENTID:", CLIENTID);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <GoogleOAuthProvider clientId={CLIENTID}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </AuthProvider>
  </StrictMode>,
);
