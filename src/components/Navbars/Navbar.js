import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import LoadingBackdrop from "../Feedbacks/LoadingBackdrop";
import NavDrawer from "./NavDrawer";
import Link from "../Links/Link";

const userPages = [
  { text: "My Next Order", icon: "next_plan", to: "/languages" },
  { text: "All Orders", icon: "assignment", to: "/skills" },
  { text: "Profile", icon: "person", to: "/admission" },
  { text: "About Us", icon: "info", to: "/about" },
];

const pages = [{ text: "About Us", icon: "info", to: "/about" }];

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
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Box display={{ xs: "none", md: "flex" }} flexDirection="column">
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/"
              sx={{
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
            <Typography fontStyle="italic" variant="body2" fontWeight={400}>
              Aduane bi y3 guy!
            </Typography>
          </Box>
          <Box
            display={{ xs: "block", md: "none" }}
            flexDirection="column"
            alignItems="center"
          >
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/"
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
            <Typography fontStyle="italic" variant="body2" fontWeight={400}>
              Aduane bi y3 guy!
            </Typography>
          </Box>
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
                <Link variant="body1" text={page.text} key={index} />
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
            {props.user.role === "admin" ? (
              <Link variant="body1" to="/admin" text="Switch" />
            ) : (
              ""
            )}
            <Link
              variant="body1"
              onClick={() => handleSignOut()}
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
          />
        </Toolbar>

        <LoadingBackdrop open={loading} />
      </Container>
    </AppBar>
  );
}
export default Navbar;
