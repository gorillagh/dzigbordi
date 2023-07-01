import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import ActionButton from "../../Buttons/ActionButton";

import LoadingBackdrop from "../../Feedbacks/LoadingBackdrop";
import NavDrawer from "./NavDrawer";
import Link from "../../Links/Link";

const pages = [{ text: "company", icon: "info", to: "/admin/compnay" }];
const userPages = [
  // { text: "Profile", icon: "person", to: () => props.setOpenProfile(true) },
  { text: "Orders", icon: "assignment", to: "/admin/orders" },
  {
    text: "Menu",
    icon: "restaurant_menu",
    to: "/admin/menu",
  },
  {
    text: "Users",
    icon: "people",
    to: "/admin/users",
  },
  {
    text: "Reports",
    icon: "bug_report",
    to: "/admin/reports",
  },
  {
    text: "Bank",
    icon: "business",
    to: "/admin/bank",
  },

  // { text: "Logout", icon: "logout", to: "logout" },
];
function Navbar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const handleNavigation = async (to) => {
    if (to !== "" && to !== "logout") navigate(to);

    to === "logout" && handleSignOut();
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (to) => {
    setAnchorElNav(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(to);
    }, 1000);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Container>
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h4"
            noWrap
            component="a"
            onClick={() => {
              handleNavigation("/admin");
            }}
            sx={{
              cursor: "pointer",
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Ubuntu",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Dzigbordi
          </Typography>

          <Typography
            variant="h4"
            noWrap
            component="a"
            onClick={() => {
              handleNavigation("/admin");
            }}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Ubuntu",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Dzigbordi
          </Typography>
          {props.user ? (
            <Box
              sx={{
                flexGrow: 2,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
                columnGap: 5,
              }}
            >
              {userPages.map((page, index) => (
                <Link
                  to={page.to}
                  variant="body1"
                  text={page.text}
                  key={index}
                />
              ))}
            </Box>
          ) : (
            ""
          )}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              mx: "auto",
              columnGap: 4,
            }}
          >
            <Link variant="body1" to="/" text="Switch" />
            <Link
              variant="body1"
              onClick={() => handleNavigation("logout")}
              text="logout"
            />
          </Box>
          <NavDrawer
            handleSignOut={handleSignOut}
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            pages={pages}
            userPages={userPages}
            handleCloseNavMenu={handleCloseNavMenu}
            user={props.user}
            handleNavigation={handleNavigation}
          />
        </Toolbar>

        <LoadingBackdrop open={loading} />
      </Container>
    </AppBar>
  );
}
export default Navbar;
