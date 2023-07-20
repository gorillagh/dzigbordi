import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ShowNavbar from "../Navbars/ShowNavbar";

import LoadingToRedirect from "./LoadingToRedirect";
import Navbar from "../Navbars/Navbar";

const UserRoute = (props) => {
  return props.user && props.user.token ? (
    <Box>
      <ShowNavbar user={props.user} />
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
