import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from '@auth0/auth0-react'
import { MantineProvider } from '@mantine/core';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider 
    domain="dev-gz54j2my6q3a12zm.us.auth0.com"
    clientId="mXMRS4EsvqhQzMfdZqPjPJ9wmMkkLu2o"
    authorizationParams={{
      redirect_uri: "http://localhost:5173"
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
