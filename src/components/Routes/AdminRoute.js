import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";

import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../serverFunctions/auth";
import { Box } from "@mui/material";
import restaurantDetails from "../../restaurantDetails";
import Navbar from "../Navbars/Navbar";

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

  // useEffect(() => {
  //   const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
  //     cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  //     encrypted: true,
  //   });
  //   const channel = pusher.subscribe("newOrder");

  //   channel.bind("order-placed", (data) => {
  //     console.log("New message received:", data);
  //     // Do something with the new message here
  //   });

  //   return () => {
  //     pusher.unsubscribe("newOrder");
  //     pusher.disconnect();
  //   };
  // }, []);

  return ok ? (
    <Box>
      <Navbar user={props.user} />

      {/* <AdminNavBar /> */}
      {props.children}
    </Box>
  ) : (
    <LoadingToRedirect
      setOpenPhoneNumber={props.setOpenPhoneNumber}
      message="Please make sure you are a verified member"
    />
  );
};

export default AdminRoute;
