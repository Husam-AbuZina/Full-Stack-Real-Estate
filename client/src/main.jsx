import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
<<<<<<< HEAD
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
=======
import { Auth0Provider } from '@auth0/auth0-react'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'
>>>>>>> 1e45fb9b9b7844029fdf8bae690cf4c9dc1ac7ae

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
<<<<<<< HEAD
    domain="dev-gz54j2my6q3a12zm.us.auth0.com"
    clientId="mXMRS4EsvqhQzMfdZqPjPJ9wmMkkLu2o"
      authorizationParams={{
        redirect_uri: "http://localhost:5173",
=======
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: "http://localhost:5173"
>>>>>>> 1e45fb9b9b7844029fdf8bae690cf4c9dc1ac7ae
      }}
      audience="http://localhost:8000"
      scope="openid profile email"
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
);
