import React, { useEffect, useState, useRef } from "react";

import Box from "@mui/material/Box";

import LoadingBackdrop from "../components/Feedbacks/LoadingBackdrop";
import {
  Alert,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { getCurrentDayMenu } from "../serverFunctions/menu";
import Subtitle from "../components/Typography/Subtitle";
import DishCard from "../components/Cards/DishCard";
import OrderConfirmation from "../components/PopUps/OrderComfirmation";

const Home = (props) => {
  const [loading, setLoading] = useState(false);
  const [currentDayMenu, setCurrentDayMenu] = useState({});
  const [cart, setCart] = useState({});
  const [openOrderConfirmation, setOpenOrderConfirmation] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [searchText, setSearchText] = useState("");

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
        {(currentDayMenu && currentDayMenu.day === "Saturday") ||
        currentDayMenu.day === "Sunday" ? (
          <Box my={5}>
            <Typography fontWeight="bold" textAlign="center">
              Menu Not Available For {currentDayMenu.day}!
            </Typography>
          </Box>
        ) : (
          <>
            <Box mb={3}>
              <Subtitle
                textAlign="center"
                title={`${currentDayMenu && currentDayMenu.day} Menu`}
              />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                my={2}
              >
                <Alert
                  severity="success"
                  sx={{ width: { xs: "70%", md: "40%" } }}
                  variant="filled"
                >
                  You have placed an order for {currentDayMenu.day}
                </Alert>
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width={{ xs: "80%", md: "50%" }}
              mx="auto"
            >
              <TextField
                label="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                variant="outlined"
                fullWidth
                // margin="normal"
                size="small"
              />
            </Box>
            {currentDayMenu.dishes ? (
              <DishCard
                searchText={searchText}
                setSearchText={setSearchText}
                setSelectedDish={setSelectedDish}
                setOpenOrderConfirmation={setOpenOrderConfirmation}
                dishes={currentDayMenu.dishes}
                handleDishSelect={handleDishSelect}
                cart={cart}
              />
            ) : (
              ""
            )}
          </>
        )}
      </Container>
      {selectedDish ? (
        <OrderConfirmation
          currentDayMenu={currentDayMenu}
          open={openOrderConfirmation}
          onClose={() => {
            setOpenOrderConfirmation(false);
            setSelectedDish(null);
          }}
          user={props.user}
          dish={selectedDish}
          setAlertSnackbar={props.setAlertSnackbar}
        />
      ) : (
        ""
      )}
      <LoadingBackdrop open={loading} />
    </Box>
  );
};

export default Home;
