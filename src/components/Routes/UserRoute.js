import { Box } from "@mui/material";
import React from "react";

import LoadingToRedirect from "./LoadingToRedirect";
import Navbar from "../Navbars/Navbar";

const UserRoute = (props) => {
  return props.user && props.user.token ? (
    <Box>
      <Navbar user={props.user} />
      {props.children}
    </Box>
  ) : (
    <LoadingToRedirect
      setOpenPhoneNumber={props.setOpenPhoneNumber}
      message="Please make sure you are a verified member"
    />
  );
};

export default UserRoute;
