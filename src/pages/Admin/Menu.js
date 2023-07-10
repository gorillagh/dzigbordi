import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  Radio,
  RadioGroup,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import ActionButton from "../../components/Buttons/ActionButton";
import _ from "lodash";
import Subtitle from "../../components/Typography/Subtitle";
import AddDish from "../../components/Forms/AddDish";
import { getMenus } from "../../serverFunctions/menu";
import {
  createDish,
  deleteDish,
  getDishes,
  updateDish,
} from "../../serverFunctions/dish";
import { getCategories } from "../../serverFunctions/category";
import Categories from "../../components/Forms/Categories";
import LoadingBackdrop from "../../components/Feedbacks/LoadingBackdrop";
import DishEdit from "../../components/PopUps/Admin/DishEdit";

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
  "&:hover": {
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
  },
};
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Menu = (props) => {
  const [loading, setLoading] = useState(false);
  const [addDishLoading, setAddDishLoading] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [menus, setMenus] = useState({});
  const [days, setDays] = useState(["all", ...daysOfWeek]);
  const [categories, setCategories] = useState(null);
  const [selectedDay, setSelectedDay] = useState("all");
  const [addType, setAddType] = useState("dish");
  const [displayAdd, setDisplayAdd] = useState(true);
  const [selectedDish, setSelectedDish] = useState(null);
  const [openDishEdit, setOpenDishEdit] = useState(false);

  const navigate = useNavigate();
  const loadCategories = async () => {
    const res = await getCategories(props.user.token);
    if (res) setCategories(res.data);
  };

  const loadDishes = async () => {
    try {
      setLoading(true);
      const res = await getDishes(props.user.token);
      if (res.data) {
        const separatedDishes = {
          all: res.data,
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
        };
        // Separate dishes by day of the week
        res.data.forEach((dish) => {
          dish.daysServed.forEach((day) => {
            if (separatedDishes[day]) {
              separatedDishes[day].push(dish);
            }
          });
        });

        setMenus(separatedDishes);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadDishes();
    loadCategories();
  }, []);

  const handleAddDish = async (dish, handleAddDishSuccess) => {
    try {
      setAddDishLoading(true);
      const res = await createDish(props.user.token, dish);

      if (res.data.status === "false") {
        props.setAlertSnackbar({
          open: true,
          text: res.data.message,
          severity: "error",
        });
        setAddDishLoading(false);
        return;
      }

      loadDishes();

      setAddDishLoading(false);
      props.setAlertSnackbar({
        open: true,
        text: `${res.data.name} added`,
        severity: "success",
      });
      handleAddDishSuccess();
    } catch (error) {
      setAddDishLoading(false);
      console.log(error);
      // Handle the error
    }
  };

  const handleOpenEditDish = (dish) => {
    console.log(dish);
    setSelectedDish(dish);
    setOpenDishEdit(true);
  };

  const handleEditDish = async (selectedDish, handleEditDishSuccess) => {
    try {
      setAddDishLoading(true);
      const res = await updateDish(
        props.user.token,
        selectedDish._id,
        selectedDish
      );

      if (res.data.status === "false") {
        props.setAlertSnackbar({
          open: true,
          text: res.data.message,
          severity: "error",
        });
        setAddDishLoading(false);
        return;
      }
      props.setAlertSnackbar({
        open: true,
        text: `${res.data.name} updated`,
        severity: "success",
      });
      setAddDishLoading(false);
      loadDishes();
      handleEditDishSuccess();
    } catch (error) {
      setAddDishLoading(false);
      console.log(error);
      // Handle the error
    }
  };

  const handleDeleteDish = async (dish) => {
    try {
      if (!window.confirm(`Are you sure you want to delete "${dish.name}"`))
        return;

      setLoading(true);
      const res = await deleteDish(props.user.token, dish._id);
      if (res.data.status === "ok") {
        loadDishes();
        setLoading(false);
        props.setAlertSnackbar({
          open: true,
          text: res.data.message,
          severity: "success",
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
            <IconButton size="small" onClick={loadDishes}>
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
            <Grid item xs={12} md={7} px={{ md: 5 }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
                gap={1}
              >
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
                          bgcolor: selectedDay === key ? "#fee5b9" : "#fff",
                          fontWeight: selectedDay === key ? 700 : "400",
                          color: selectedDay === key ? "primary.main" : "",
                          my: 1,
                          "&:hover": {
                            bgcolor: "#fee5b9",
                          },
                        }}
                        fullWidth={false}
                        size="small"
                        onClick={() => setSelectedDay(key)}
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
                <Subtitle my={0} title={`${_.startCase(selectedDay)} Dishes`} />
              </Box>
              <Box>
                {menus && menus[selectedDay]
                  ? menus[selectedDay]
                      .sort((a, b) => a.code.localeCompare(b.code)) // Sort the dishes alphabetically by name
                      .map((dish, index) => (
                        <Box
                          key={index}
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
                                  DZ{dish.code}
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
                                <Typography variant="body1" fontWeight={500}>
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
                              rowGap={3}
                              flexDirection={{
                                xs: "column-reverse",
                                md: "initial",
                              }}
                              ml={{ xs: 2, md: 0 }}
                            >
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteDish(dish)}
                              >
                                <Icon fontSize="small">delete</Icon>
                              </IconButton>

                              <IconButton
                                size="small"
                                color="info"
                                onClick={() => handleOpenEditDish(dish)}
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
            <Grid item xs={12} md={5} px={{ md: 5 }}>
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    defaultChecked
                    onChange={(e) => setDisplayAdd(e.target.checked)}
                  />
                }
                label="ADD"
              />
              <Box display={displayAdd ? "block" : "none"}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexWrap="wrap"
                  gap={1}
                >
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      onChange={(e) => setAddType(e.target.value)}
                      defaultValue="dish"
                    >
                      <FormControlLabel
                        value="categories"
                        control={<Radio size="small" />}
                        label="Categories"
                      />
                      <FormControlLabel
                        value="dish"
                        control={<Radio size="small" />}
                        label="Add Dish"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
                {categories && categories.length ? (
                  <Box>
                    <Box display={addType === "dish" ? "block" : "none"}>
                      <AddDish
                        categories={categories}
                        loadCategories={loadCategories}
                        handleAddDish={handleAddDish}
                        addDishLoading={addDishLoading}
                        setAlertSnackbar={props.setAlertSnackbar}
                        open={addType === "dish"}
                        user={props.user}
                        daysOfWeek={daysOfWeek}
                      />
                    </Box>
                    <Box display={addType === "categories" ? "block" : "none"}>
                      <Categories
                        categories={categories}
                        open={addType === "categories"}
                        user={props.user}
                        setAlertSnackbar={props.setAlertSnackbar}
                      />
                    </Box>
                  </Box>
                ) : (
                  ""
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
        {selectedDish ? (
          <DishEdit
            categories={categories}
            loadCategories={loadCategories}
            dish={selectedDish}
            open={openDishEdit}
            onClose={() => {
              setSelectedDish(null);
              setOpenDishEdit(false);
            }}
            handleEditDish={handleEditDish}
            addDishLoading={addDishLoading}
            setAlertSnackbar={props.setAlertSnackbar}
            daysOfWeek={daysOfWeek}
            user={props.user}
          />
        ) : (
          ""
        )}
        <LoadingBackdrop open={loading} />
      </Box>
    </div>
  );
};

export default Menu;
