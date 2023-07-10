import React, { useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Resizer from "react-image-file-resizer";
import {
  Avatar,
  Badge,
  CircularProgress,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import Subtitle from "../../Typography/Subtitle";

import ActionButton from "../../Buttons/ActionButton";
import LoadingBackdrop from "../../Feedbacks/LoadingBackdrop";
import CircularLoading from "../../Feedbacks/CircularLoading";
import { uploadDishImage } from "../../../serverFunctions/dish";
import DaysSelect from "../../Inputs/DaysSelect";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  minWidth: 250,
  bgcolor: "background.paper",
  borderRadius: "12px",
  p: 4,
};

const DishEdit = (props) => {
  const [selectedDish, setSelectedDish] = useState(props.dish);
  const [imageLoading, setImageLoading] = useState(false);
  const containerRef = useRef(null);

  const handleImageUpload = async (e) => {
    let files = e.target.files;
    console.log(files[0]);

    if (files) {
      setImageLoading(true);
      //Edit pics
      Resizer.imageFileResizer(
        files[0],
        900,
        900,
        "JPEG",
        100,
        0,
        (uri) => {
          uploadDishImage(props.user.token, uri)
            .then((res) => {
              // console.log('Image Upload Res Data', res)
              setSelectedDish((prevState) => ({
                ...prevState,
                image: res.data.url,
              }));
              setImageLoading(false);
            })
            .catch((error) => {
              setImageLoading(false);
              console.log("Image upload error", error);
            });
        },
        "base64"
      );
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = props.categories.find(
      (category) => category._id === selectedCategoryId
    );
    setSelectedDish((prevState) => ({
      ...prevState,
      category: selectedCategory,
    }));
  };

  const showValidationError = (text) => {
    props.setAlertSnackbar({
      open: true,
      text,
      severity: "error",
    });
  };

  const handleEditDish = (e) => {
    e.preventDefault();
    console.log(selectedDish);
    // Check if selectedDish is equal to props.dish
    if (JSON.stringify(selectedDish) === JSON.stringify(props.dish)) {
      // selectedDish is the same as props.dish, no changes made
      return;
    }

    // Validate Name
    if (selectedDish.name.trim() === "") {
      showValidationError("Name is Required");
      return;
    }

    // You can handle the addDish functionality here or pass it to the parent component as a prop
    props.handleEditDish(selectedDish, handleEditDishSuccess);
  };
  const handleEditDishSuccess = () => {
    // Reset the form fields
    setSelectedDish({
      image: "",
      name: "",
      code: "",
      description: "",
      daysServed: [],
      category: "",
    });
    props.onClose();
  };

  return (
    <div>
      <Modal
        hideBackdrop
        closeAfterTransition={true}
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Zoom
          container={containerRef.current}
          appear={true}
          in={props.open}
          direction="left"
          mountOnEnter
          unmountOnExit
          //   timeout={300}
        >
          <Box
            sx={{
              background: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(5.8px)",
              WebkitBackdropFilter: "blur(5.8px)",
              width: "100%",
              height: "100vh",
            }}
          >
            <Box sx={style}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Subtitle title="Edit Dish" my={0} />
                <IconButton color="error" onClick={props.onClose}>
                  <Icon>close</Icon>
                </IconButton>
              </Box>

              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditDish();
                }}
              >
                {/* //////////////////////////Image/////////////////////////////////////// */}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  my={2}
                >
                  {imageLoading ? (
                    <CircularProgress thickness={4} size={40} />
                  ) : (
                    <label>
                      <Badge
                        badgeContent={
                          selectedDish.image ? (
                            <Icon fontSize="small" color="primary">
                              edit
                            </Icon>
                          ) : (
                            <Icon fontSize="small" color="primary">
                              add_a_photo
                            </Icon>
                          )
                        }
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                      >
                        <Avatar
                          variant="rounded"
                          // alt={props.selectedDish.name && props.selectedDish.name}
                          src={selectedDish.image}
                          sx={{ width: 150, height: 100 }}
                        >
                          {!selectedDish.image && (
                            <Icon fontSize="large">restaurant_menu</Icon>
                          )}
                        </Avatar>

                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={imageLoading}
                        />
                      </Badge>
                    </label>
                  )}
                </Box>
                <TextField
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  id="item-name"
                  placeholder="Name"
                  name="name"
                  autoComplete="name"
                  disabled={props.addDishLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon fontSize="small">local_dining</Icon>
                      </InputAdornment>
                    ),
                  }}
                  value={selectedDish.name}
                  onChange={(e) =>
                    setSelectedDish((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }))
                  }
                />
                <TextField
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  id="dish-code"
                  placeholder="Code"
                  name="code"
                  disabled={props.addDishLoading}
                  value={selectedDish.code}
                  onChange={(e) =>
                    setSelectedDish((prevState) => ({
                      ...prevState,
                      code: `${e.target.value}`,
                    }))
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography>DZ - </Typography>
                      </InputAdornment>
                    ),
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                />
                <TextField
                  multiline
                  maxRows={4}
                  minRows={2}
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  label="Description"
                  id="dish-description"
                  name="description"
                  disabled={props.addDishLoading}
                  value={selectedDish.description}
                  onChange={(e) =>
                    setSelectedDish((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }))
                  }
                />
                <DaysSelect
                  setDish={setSelectedDish}
                  dish={selectedDish}
                  const
                  daysOfWeek={props.daysOfWeek}
                />
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ mb: 3 }}
                  disabled={props.addDishLoading}
                >
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    value={
                      (selectedDish.category && selectedDish.category._id) || ""
                    }
                    onChange={handleCategoryChange}
                    label="category"
                  >
                    {props.categories.map((category, index) => (
                      <MenuItem key={index} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box
                  my={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {props.addDishLoading ? (
                    <Typography variant="body2" fontWeight={600}>
                      <CircularLoading size={20} thickness={6} />
                    </Typography>
                  ) : (
                    <ActionButton
                      disabled={
                        JSON.stringify(selectedDish) ===
                        JSON.stringify(props.dish)
                      }
                      text="Submit"
                      sx={{
                        fontWeight: "bold",
                        borderRadius: 5,
                        textTransform: "capitalize",
                        color: props.variant !== "contained" ? "" : "#fff",
                        boxShadow: "0.5px 1px 0px rgba(0, 0, 0, 0.2)",
                        backgroundColor: "#E3581C",
                        "&:hover": {
                          backgroundColor: "#E3581C",
                        },
                      }}
                      my={2}
                      onClick={handleEditDish}
                    />
                  )}
                </Box>
              </Box>
            </Box>
            <LoadingBackdrop open={props.loading} />
          </Box>
        </Zoom>
      </Modal>
    </div>
  );
};

export default DishEdit;
