import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import {
  Box,
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ActionButton from "../Buttons/ActionButton";
import Link from "../Links/Link";
import Twitter from "@mui/icons-material/Twitter";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import WhatsApp from "@mui/icons-material/WhatsApp";
import Subtitle from "../Typography/Subtitle";
import restaurantDetails from "../../restaurantDetails";

const NavDrawer = (props) => {
  const navigate = useNavigate();

  const openSocialMedia = (platform) => {
    console.log(props.restaurantDetails.socials.facebook.url);
    let url,
      webUrl = "";
    switch (platform) {
      case "facebook":
        url = props.restaurantDetails.socials.facebook.url;
        webUrl = props.restaurantDetails.socials.facebook.webUrl;
        break;
      case "instagram":
        url = props.restaurantDetails.socials.instagram.url;
        webUrl = props.restaurantDetails.socials.instagram.webUrl;
        break;
      case "twitter":
        url = props.restaurantDetails.socials.twitter.url;
        webUrl = props.restaurantDetails.socials.twitter.webUrl;
        break;
      case "snapchat":
        url = props.restaurantDetails.socials.snapchat.url;
        webUrl = props.restaurantDetails.socials.snapchat.webUrl;
        break;
      case "whatsapp":
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
          const isWhatsAppInstalled = /WhatsApp/i.test(navigator.userAgent);
          if (isWhatsAppInstalled) {
            url = `whatsapp://send?text=Hello%20Wuda%20Lounge!&phone=${props.restaurantDetails.socials.whatsapp.number}`;
          } else {
            const platform = /(android)/i.test(navigator.userAgent)
              ? "android"
              : "ios";
            url = `https://wa.me/?text=Hello%20Wuda%20Lounge!&phone=${
              props.restaurantDetails.socials.whatsapp.number
            }&app_absent=1${platform === "android" ? "&fallback_url=" : ""}${
              platform === "android"
                ? "market://details?id=com.whatsapp"
                : "https://apps.apple.com/app/id310633997"
            }`;
          }
        } else {
          url = `https://web.whatsapp.com/send?phone=+${props.restaurantDetails.socials.whatsapp.number}`;
        }
        break;
      default:
        return;
    }

    // Open the URL in the app or web app, depending on the device and app availability
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      const appUrl = url;
      // const webUrl = webUrl;
      const appWindow = window.open(appUrl, "_blank");
      setTimeout(() => {
        if (!appWindow || appWindow.closed || appWindow.closed === undefined) {
          window.location.href = webUrl;
        }
      }, 500);
    } else {
      window.open(webUrl, "_blank");
    }
  };

  const handleDrawerToggle = () => {
    props.setDrawerOpen(!props.drawerOpen);
  };

  const drawer = (
    <Box
      // onClick={handleDrawerToggle}
      sx={{
        textAlign: "left",
        pt: "4px",
      }}
    >
      <Box my={1} px={2}>
        {props.user && props.user._id ? (
          <Box
            sx={{ cursor: "pointer" }}
            display="flex"
            justifyContent="left"
            alignItems="center"
            onClick={() => props.setOpenProfile(true)}
          >
            <Avatar
              alt={props.user.name && props.user.name}
              src={props.user.image}
            />
            <Box ml={2} boxSizing="border-box" overflow="hidden">
              <Subtitle title={props.user.name.split(" ")[0]} my={0} />

              <Typography fontWeight={500}>{`0${props.user.phoneNumber.slice(
                -9
              )}`}</Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              display={restaurantDetails.nameEqualsLogo ? "none" : "flex"}
              flexDirection="column"
            >
              <Typography
                variant="h5"
                // noWrap
                sx={{
                  // fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  textDecoration: "none",
                }}
              >
                <Link
                  text={`${restaurantDetails.shortName}`}
                  to="/"
                  color="#000"
                />
              </Typography>
              <Typography
                variant="body2"
                // noWrap
                sx={{
                  // fontFamily: "monospace",
                  ml: 1,
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  textDecoration: "none",
                }}
              >
                {restaurantDetails.nameExtension}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      <List sx={{ height: "100%" }}>
        {props.user
          ? props.userPages.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => item.to()}
                  key={index}
                  sx={{ textAlign: "left" }}
                >
                  <ListItemIcon>
                    <Icon fontSize="small">{item.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText
                    key={index}
                    primary={
                      <Typography fontWeight={500} variant="body2">
                        {item.text}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))
          : ""}
        {props.user ? (
          ""
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "left" }}
                onClick={() => props.setOpenPhoneNumber(true)}
              >
                <ListItemIcon>
                  <Icon fontSize="small">person</Icon>
                </ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItemButton>
            </ListItem>
          </>
        )}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Divider sx={{ my: 3 }} />
          {props.user.role === "admin" ? (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{ textAlign: "left" }}
                  onClick={() => navigate("/admin")}
                >
                  <ListItemIcon>
                    <Icon fontSize="small">person</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography fontWeight={500} variant="body2">
                        Switch to Admin
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            ""
          )}
          {props.pages.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => item.to()}
                key={index}
                sx={{ textAlign: "left" }}
              >
                <ListItemIcon>
                  <Icon fontSize="small">{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText
                  key={index}
                  primary={
                    <Typography fontWeight={500} variant="body2">
                      {item.text}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
        {props.user ? (
          <Box mt={4}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={props.handleSignOut}
                sx={{ textAlign: "left" }}
              >
                <ListItemIcon>
                  <Icon fontSize="small" sx={{ color: "error.light" }}>
                    logout
                  </Icon>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      fontWeight={500}
                      variant="body2"
                      sx={{
                        color: "error.light",
                      }}
                    >
                      Logout
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </Box>
        ) : (
          ""
        )}
      </List>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box position="absolute" sx={{ top: "auto", bottom: 0 }}>
          <IconButton
            onClick={() => openSocialMedia("facebook")}
            size="large"
            color="#3b5998"
          >
            <Facebook sx={{ color: "#3b5998" }} />
          </IconButton>
          <IconButton
            size="large"
            color="#3b5998"
            onClick={() => openSocialMedia("instagram")}
          >
            <Instagram sx={{ color: "#c13584" }} />
          </IconButton>
          {restaurantDetails.socials.twitter.url.length ? (
            <IconButton
              size="large"
              color="#1da1f2"
              onClick={() => openSocialMedia("twitter")}
            >
              <Twitter sx={{ color: "#1da1f2" }} />
            </IconButton>
          ) : (
            ""
          )}
          {restaurantDetails.socials.whatsapp ? (
            <IconButton
              size="large"
              color="#25D366"
              onClick={() => openSocialMedia("whatsapp")}
            >
              <WhatsApp sx={{ color: "#25D366" }} />
            </IconButton>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Box>
  );
  return (
    <Box
      sx={{
        // flexGrow: 1,
        display: { xs: "flex", md: "none" },
        justifyContent: "right",
        ml: 1,
      }}
    >
      <IconButton
        size="small"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleDrawerToggle}
        color="primary"
      >
        <MenuIcon />
      </IconButton>
      <Box
      // component="nav"
      >
        <Drawer
          anchor="right"
          variant="temporary"
          open={props.drawerOpen}
          onClose={handleDrawerToggle}
          slots={{
            backdrop: () => (
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(5.8px)",
                  WebkitBackdropFilter: "blur(5.8px)",
                  width: "100%",
                  height: "100%",
                }}
                onClick={handleDrawerToggle}
              />
            ),
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            // display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(8.8px)",
              WebkitBackdropFilter: "blur(8.8px)",

              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavDrawer;
