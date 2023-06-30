import { Box, Typography } from "@mui/material";
import React from "react";
import { Link as RLink } from "react-router-dom";

const Link = (props) => {
  return (
    <>
      <RLink
        to={props.to}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          // props.onClick();
        }}
        style={{
          textDecoration: props.textDecoration,

          cursor: "pointer",
          textTransform: props.textTransform,
        }}
        {...props}
      >
        <Box display="flex" columnGap={1}>
          <Typography
            color={props.color}
            fontWeight={props.fontWeight}
            variant={props.variant}
          >
            {props.text}
          </Typography>
          {props.children}
        </Box>
      </RLink>
    </>
  );
};

Link.defaultProps = {
  textTransform: "capitalize",
  color: "#da6c57",
  text: "Link text",
  textDecoration: "none",
  variant: "body2",
  fontWeight: 500,
};
export default Link;
