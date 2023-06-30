import React from "react";
import Typography from "@mui/material/Typography";
import Link from "../Links/Link";
import { Box } from "@mui/material";

const Footer = (props) => {
  return (
    <Box>
      <Typography
        variant="body2"
        color="#000"
        fontWeight={500}
        my={2}
        align="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        columnGap={1}
      >
        Copyright
        {" © "}
        <Link color="#f6a60b" text="Dzigbordi Home Cooking" to="/" />{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Footer;
