import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";

import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../serverFunctions/auth";
import { Box, Container } from "@mui/material";
import restaurantDetails from "../../restaurantDetails";
import Navbar from "../Navbars/Admin/Navbar";

const AdminRoute = (props) => {
  const [ok, setOk] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    if (props.user && props.user.token) {
      currentAdmin(props.user.token)
        .then((res) => {
          res && setOk(true);
          console.log("Current admin -->", res);
        })
        .catch((err) => {
          setOk(false);
          console.log(err);
        });
    }
  }, [props.user]);

  return ok ? (
    <Box>
      <Navbar user={props.user} />

      {/* <AdminNavBar /> */}
      <Container>{props.children}</Container>
    </Box>
  ) : (
    <LoadingToRedirect
      setOpenPhoneNumber={props.setOpenPhoneNumber}
      message="Please make sure you are a verified member"
    />
  );
};

export default AdminRoute;
