import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./routes";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import FeatureHubCtx from "./hooks/use-feature-ctx";

const USERS = [
  {
    name: "Odin",
    email: "odin@valhalla.com",
    userType: "dev",
  },
  {
    name: "Thor",
    email: "thor@valhalla.com",
    userType: "user",
  },
  {
    name: "Freya",
    email: "freya@valhalla.com",
    userType: "beta",
  },
];

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <FeatureHubCtx user={USERS[1]}>
        <Routes />
      </FeatureHubCtx>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
