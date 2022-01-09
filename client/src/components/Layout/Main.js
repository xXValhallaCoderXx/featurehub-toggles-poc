import React from "react";
import Box from "@mui/material/Box";

const MainLayout = ({ children }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ backgroundColor: "#263238", height: "100vh" }}
    >
      {children}
    </Box>
  );
};

export default MainLayout;
