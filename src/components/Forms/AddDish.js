import React, { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  FormControl,
  Icon,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import ActionButton from "../Buttons/ActionButton";
import CircularLoading from "../Feedbacks/CircularLoading";
import DaysSelect from "../Inputs/DaysSelect";
import { uploadDishImage } from "../../serverFunctions/dish";

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
};

const AddDish = (props) => {
  const [dish, setDish] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const containerRef = React.useRef(null);

  useEffect(() => {
    props.loadCategories();
  }, [props.open === true]);

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
              setDish((prevState) => ({ ...prevState, image: res.data.url }));
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
    setDish((prevState) => ({
      ...prevState,
      category: e.target.value,
    }));
  };

  const showValidationError = (text) => {
    props.setAlertSnackbar({
      open: true,
      text,
      severity: "error",
    });
  };

  const handleAddDish = (e) => {
    e.preventDefault();

    // // Validate image
    // if (!dish.image) {
    //   showValidationError("Please upload an image");
    //   return;
    // }

    // Validate Name
    if (!dish.name) {
      showValidationError("Please enter a name for the dish");
      return;
    }

    // Validate code
    if (!dish.code) {
      showValidationError("Please enter a code for the dish");
      return;
    }

    // Validate Days served
    if (!dish.daysServed || dish.daysServed.length === 0) {
      showValidationError("Please select at least one day for the dish");
      return;
    }

    // Validate Categories
    if (!dish.category) {
      showValidationError("Please select a category for the dish");
      return;
    }
    // All validations passed, invoke the addDish functionality
    props.handleAddDish(dish, handleAddDishSuccess);
  };

  const handleAddDishSuccess = () => {
    // Reset the form fields
    setDish({
      image: "",
      name: "",
      code: "",
      description: "",
      daysServed: [],
      category: "",
    });
  };

  return (
    <div>
      <Zoom
        container={containerRef.current}
        appear={true}
        in={props.open}
        mountOnEnter
        unmountOnExit
        //   timeout={300}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddDish();
          }}
          sx={{ ...cardStyle }}
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
                    dish.image ? (
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
                    // alt={props.dish.name && props.dish.name}
                    src={dish.image}
                    sx={{ width: 150, height: 100 }}
                  >
                    {!dish.image && (
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
            value={dish.name}
            onChange={(e) =>
              setDish((prevState) => ({
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
            value={dish.code}
            onChange={(e) =>
              setDish((prevState) => ({
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
            value={dish.description}
            onChange={(e) =>
              setDish((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          />
          <DaysSelect
            setDish={setDish}
            dish={dish}
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
            <InputLabel id="role-label">Category</InputLabel>
            <Select
              labelId="role-label"
              value={dish.category || ""}
              onChange={handleCategoryChange}
              label="Role"
            >
              {props.categories.map((category, index) => (
                <MenuItem key={category._id} value={category._id}>
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
                text="Add Dish"
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
                onClick={handleAddDish}
              />
            )}
          </Box>
        </Box>
      </Zoom>
    </div>
  );
};

export default AddDish;
