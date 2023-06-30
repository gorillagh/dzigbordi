import React, { useEffect, useState, useRef } from "react";

import Box from "@mui/material/Box";

import LoadingBackdrop from "../components/Feedbacks/LoadingBackdrop";
import { Container, Typography } from "@mui/material";

const Home = (props) => {
  useEffect(() => {}, []);
  const currentHour = new Date().getHours();
  let timeOfDay;

  if (currentHour < 12) {
    timeOfDay = "morning";
  } else if (currentHour < 18) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "evening";
  }
  return (
    <Box>
      <Container>
        <Typography fontWeight="bold">
          Good {timeOfDay} {props.user.name}
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;
