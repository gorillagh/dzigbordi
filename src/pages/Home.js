import React, { useEffect, useState, useRef } from "react";

import Box from "@mui/material/Box";

import LoadingBackdrop from "../components/Feedbacks/LoadingBackdrop";
import { Container, Typography } from "@mui/material";
import { getCurrentDayMenu } from "../serverFunctions/menu";
import Subtitle from "../components/Typography/Subtitle";
import DishCard from "../components/Cards/DishCard";

const Home = (props) => {
  const [loading, setLoading] = useState(false);
  const [currentDayMenu, setCurrentDayMenu] = useState({});
  const [cart, setCart] = useState({});

  const loadDayMenu = async () => {
    try {
      const res = await getCurrentDayMenu(props.user.token);
      if (res) setCurrentDayMenu(res.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadDayMenu();
  }, []);
  const currentHour = new Date().getHours();
  let timeOfDay;

  if (currentHour >= 0 && currentHour < 12) {
    timeOfDay = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    timeOfDay = "Good Afternoon";
  } else {
    timeOfDay = "Good Evening";
  }

  const handleDishSelect = () => {};

  return (
    <Box>
      <Container>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          columnGap={2}
          my={2}
        >
          <Typography>{timeOfDay}</Typography>
          <Typography fontStyle="italic" fontWeight="bold">
            {props.user.name},
          </Typography>
        </Box>
        <Box mb={3}>
          <Subtitle
            textAlign="center"
            title={`${currentDayMenu && currentDayMenu.day} Menu`}
          />
        </Box>
        <Box width={{ xs: "100%", md: "70%" }} mx="auto">
          {currentDayMenu.dishes ? (
            <DishCard
              dishes={currentDayMenu.dishes}
              handleDishSelect={handleDishSelect}
              cart={cart}
            />
          ) : (
            ""
          )}
        </Box>
      </Container>
      <LoadingBackdrop open={loading} />
    </Box>
  );
};

export default Home;
