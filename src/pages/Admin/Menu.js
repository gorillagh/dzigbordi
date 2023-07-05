import { Box, Grid, Icon, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import ActionButton from "../../components/Buttons/ActionButton";
import _ from "lodash";
import Subtitle from "../../components/Typography/Subtitle";

const cardStyle = {
  p: 2,
  my: 3,
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(8.8px)",
  WebkitBackdropFilter: "blur(8.8px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
  webkitBackdropFilter: "blur(5px)",
  boxSizing: "border-box",
  // cursor: "pointer",
};

const test = {
  Monday: [
    {
      image:
        "https://images.bolt.eu/store/2021/2021-03-18/a4bf0ca0-b9bb-4693-9c30-099aa251451a.jpeg",
      name: "Yam Chips With Grilled Turkey",
      code: "dz007",
      daysServed: ["Monday", "Friday"],
      category: "",
    },
    {
      image:
        "https://images.bolt.eu/store/2021/2021-03-18/a4bf0ca0-b9bb-4693-9c30-099aa251451a.jpeg",
      name: "Yam Chips With Grilled Pork",
      code: "dz008",
      daysServed: ["Monday", "Friday"],
      category: "",
    },
  ],
  Tuesday: [
    {
      image:
        "https://simshomekitchen.com/wp-content/uploads/2018/07/IMG_0336-500x375.jpg",
      name: "Plantain Rice & Palava Sauce",
      code: "dz0014",
      daysServed: ["Tuesday", "Thursday"],
      category: "",
    },
    {
      image: "",
      name: "French Fries With Grilled Chicken",
      code: "dz005",
      daysServed: ["Tuesday", "Thurday"],
      category: "",
    },
  ],
  Wednesday: [
    {
      image:
        "https://simshomekitchen.com/wp-content/uploads/2018/07/IMG_0336-500x375.jpg",
      name: "Jollof Rice & Grilled Chicken",
      code: "dz007",
      daysServed: ["Monday", "Wednesday"],
      category: "",
    },
    {
      image:
        "https://simshomekitchen.com/wp-content/uploads/2018/07/IMG_0336-500x375.jpg",
      name: "Waakye & Wele & Egg",
      code: "dz022",
      daysServed: ["Wednesday"],
      category: "",
    },
  ],
  Thursday: [
    {
      image:
        "https://simshomekitchen.com/wp-content/uploads/2018/07/IMG_0336-500x375.jpg",
      name: "Anwa Mo & Beef & Egg & Sausage",
      code: "dz021",
      daysServed: ["Thursday"],
      category: "",
    },
    {
      image:
        "https://simshomekitchen.com/wp-content/uploads/2018/07/IMG_0336-500x375.jpg",
      name: "Red Red",
      code: "dz024",
      daysServed: ["Tuesday", "Thursday"],
      category: "",
    },
  ],
  Friday: [
    {
      image:
        "https://simshomekitchen.com/wp-content/uploads/2018/07/IMG_0336-500x375.jpg",
      name: "Yam Chips With Grilled Turkey",
      code: "dz007",
      daysServed: ["Monday", "Friday"],
      category: "",
    },
    {
      image:
        "https://images.bolt.eu/store/2021/2021-03-18/a4bf0ca0-b9bb-4693-9c30-099aa251451a.jpeg",
      name: "Yam Chips With Grilled Pork",
      code: "dz008",
      daysServed: ["Monday", "Friday"],
      category: "",
    },
  ],
};

const Menu = (props) => {
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState(test);
  const [selectedMenuGroup, setSelectedMenuGroup] = useState("all");

  const navigate = useNavigate();

  const loadMenu = async () => {};

  return (
    <div>
      <Box>
        <Box
          my={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <PageTitle my={1} title="Menu" />
            <IconButton size="small" onClick={loadMenu}>
              <Icon color="primary" fontSize="small">
                refresh
              </Icon>
            </IconButton>
          </Box>
        </Box>
        <Box>
          <Grid
            container
            spacing={{ xs: 2, md: 5 }}
            flexDirection={{ xs: "column-reverse", md: "initial" }}
          >
            <Grid item xs={12} md={8} px={{ md: 5 }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
                gap={1}
              >
                <ActionButton
                  text={`All (${5})`}
                  variant=""
                  sx={{
                    textTransform: "capitalize",
                    py: 0,
                    fontSize: "0.85rem",
                    boxShadow:
                      "inset 0 0 0 1px rgba(16,22,26,.05), inset 0 -1px 0 rgba(16,22,26,.2)",
                    bgcolor: selectedMenuGroup === "all" ? "#fee5b9" : "#fff",
                    fontWeight: selectedMenuGroup === "all" ? 700 : "400",
                    color: selectedMenuGroup === "all" ? "primary.main" : "",
                    my: 1,
                    "&:hover": {
                      bgcolor: "#fee5b9",
                    },
                  }}
                  fullWidth={false}
                  size="small"
                  onClick={() => setSelectedMenuGroup("all")}
                />
                {menus &&
                  Object.entries(menus).map(([key, value]) => (
                    <Box key={key}>
                      <ActionButton
                        text={`${key.substring(0, 3)} (${value.length})`}
                        variant=""
                        sx={{
                          textTransform: "capitalize",
                          py: 0,
                          fontSize: "0.85rem",
                          boxShadow:
                            "inset 0 0 0 1px rgba(16,22,26,.05), inset 0 -1px 0 rgba(16,22,26,.2)",
                          bgcolor:
                            selectedMenuGroup === key ? "#fee5b9" : "#fff",
                          fontWeight: selectedMenuGroup === key ? 700 : "400",
                          color:
                            selectedMenuGroup === key ? "primary.main" : "",
                          my: 1,
                          "&:hover": {
                            bgcolor: "#fee5b9",
                          },
                        }}
                        fullWidth={false}
                        size="small"
                        onClick={() => setSelectedMenuGroup(key)}
                      />
                    </Box>
                  ))}
              </Box>
              <Box
                my={1}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Subtitle
                  my={0}
                  title={`${_.startCase(selectedMenuGroup)} Dishes`}
                />
              </Box>
              <Box>
                {menus && menus[selectedMenuGroup]
                  ? menus[selectedMenuGroup]
                      .sort((a, b) => a.code.localeCompare(b.code)) // Sort the dishes alphabetically by name
                      .map((dish, index) => (
                        <Box
                          id={index}
                          sx={{
                            ...cardStyle,
                          }}
                        >
                          <Box
                            display="flex"
                            columnGap={1}
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Box display="flex" columnGap={1}>
                              <Box>
                                <Typography variant="body2" fontWeight={500}>
                                  {dish.code}
                                </Typography>
                                <Box height={50} width={70}>
                                  <img
                                    src={dish.image}
                                    alt=""
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                </Box>
                              </Box>
                              <Box
                                display="flex"
                                flexDirection="column"
                                rowGap={0.5}
                                justifyContent="center"
                              >
                                {" "}
                                <Typography variant="body2" fontWeight={500}>
                                  {_.startCase(dish.name)}
                                </Typography>
                                <Typography variant="body2">
                                  {dish.daysServed.map(
                                    (day, index) => `${day.substring(0, 3)}, `
                                  )}
                                </Typography>
                                {/* Render other properties specific to the dish */}
                              </Box>
                            </Box>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              columnGap={3}
                            >
                              <IconButton
                                size="small"
                                color="error"
                                // onClick={() => handleDeleteUser(dish)}
                              >
                                <Icon fontSize="small">delete</Icon>
                              </IconButton>

                              <IconButton
                                size="small"
                                color="info"
                                // onClick={() => handleOpenEditUser(dish)}
                              >
                                <Icon fontSize="small">edit</Icon>
                              </IconButton>
                            </Box>
                          </Box>
                        </Box>
                      ))
                  : ""}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Menu;
