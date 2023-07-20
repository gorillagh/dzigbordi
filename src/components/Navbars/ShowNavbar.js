import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import ShowOnScroll from "./ShowOnScroll";
import {
  AppBar,
  Container,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ActionButton from "../Buttons/ActionButton";

import NavDrawer from "./NavDrawer";
import { getCurrentDayMenu } from "../../serverFunctions/menu";

const userPages = [
  { text: "Next Order", icon: "next_plan", to: "/languages" },
  { text: "History", icon: "history", to: "/skills" },
  { text: "Profile", icon: "person", to: "/admission" },
];

const pages = [{ text: "About Us", icon: "info", to: "/about" }];

const ShowNavbar = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentDayMenu, setCurrentDayMenu] = useState({});
  const [hasPlacedOrder, setHasPlacedOrder] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadDayMenu = async () => {
    try {
      setLoading(true);
      const res = await getCurrentDayMenu(props.user.token);

      if (res) {
        setCurrentDayMenu(res.data);
        console.log(res.data.orders);

        // Check if props.user._id can be found in res.data.orders
        const userOrder = res.data.orders.find(
          (order) => order.orderedBy === props.user._id
        );

        if (userOrder && userOrder.dishes.length > 0) {
          setHasPlacedOrder(true);
        } else {
          setHasPlacedOrder(false);
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      loadDayMenu();
    }, 1000);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch({
        type: "LOGOUT",
        payload: null,
      });

      window.localStorage.removeItem("dzUser");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
      props.setAlertSnackbar({
        open: true,
        text: `Error occured ${error}`,
        severity: "error",
      });
    }
  };

  const handleCloseNavMenu = (to) => {
    // setAnchorElNav(null);
    // window.scrollTo({ top: 0, behavior: "smooth" });
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   navigate(to);
    // }, 1000);
  };

  return (
    <ShowOnScroll {...props}>
      <Box
        sx={{
          position: "fixed",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8.8px)",
          WebkitBackdropFilter: "blur(8.8px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
          zIndex: 5,
          width: "100%",
        }}
      >
        <AppBar position="static" color="transparent" elevation={0}>
          <Container>
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: "flex",
                  flexGrow: 1,
                  fontFamily: "Ubuntu",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                  alignContent: " center",
                  justifyContent: "center",
                }}
              >
                {currentDayMenu.day} Menu
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: hasPlacedOrder ? "flex" : "none",
                  justifyContent: "left",
                  width: "40%",
                  mr: "auto",
                }}
              >
                <IconButton color="success">
                  <Icon>check_circle</Icon>
                </IconButton>
              </Box>

              <NavDrawer
                handleSignOut={handleSignOut}
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                pages={pages}
                userPages={userPages}
                handleCloseNavMenu={handleCloseNavMenu}
                user={props.user}
              />
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </ShowOnScroll>
  );
};

export default ShowNavbar;
