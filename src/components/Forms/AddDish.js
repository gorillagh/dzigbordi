import React, { useState, useEffect } from "react";
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

  const handleImageUpload = async () => {};
  const handleDepartmentChange = (e) => {
    setDish((prevState) => ({
      ...prevState,
      department: e.target.value,
    }));
  };

  const handleBranchChange = (e) => {
    setDish((prevState) => ({
      ...prevState,
      branch: e.target.value,
    }));
  };

  const handleRoleChange = (e) => {
    setDish((prevState) => ({
      ...prevState,
      role: e.target.value,
    }));
  };

  const showValidationError = (text) => {
    props.setAlertSnackbar({
      open: true,
      text,
      severity: "error",
    });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    // Validate Name
    if (dish.name.trim() === "") {
      showValidationError("Name is Required");
      return;
    }
    // Validate Phone Number
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(dish.phoneNumber)) {
      showValidationError("Invalid Phone Number");
      return;
    }
    dish.phoneNumber = `+233${dish.phoneNumber.slice(-9)}`;
    // Validate Branch
    if (dish.branch.trim() === "") {
      // Display an error message or handle the validation error
      showValidationError("Branch is required");
      return;
    }
    // Validate Department
    if (dish.department.trim() === "") {
      showValidationError("Department is required");
      return;
    }
    // Validate Role
    if (dish.role.trim() === "") {
      showValidationError("Role is required");
      return;
    }
    // You can handle the addUser functionality here or pass it to the parent component as a prop
    props.handleAddDish(dish, handleAddDishSuccess);
  };
  const handleAddDishSuccess = () => {
    // Reset the form fields
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
            handleAddUser();
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
                    // alt={props.user.name && props.user.name}
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
            disabled={props.addUserLoading}
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
            disabled={props.addUserLoading}
            value={dish.phoneNumber}
            onChange={(e) =>
              setDish((prevState) => ({
                ...prevState,
                phoneNumber: e.target.value,
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
            size="small"
            margin="normal"
            required
            fullWidth
            id="dish-description"
            placeholder="description"
            name="description"
            disabled={props.addUserLoading}
            value={dish.phoneNumber}
            onChange={(e) =>
              setDish((prevState) => ({
                ...prevState,
                phoneNumber: e.target.value,
              }))
            }
          />
          <FormControl
            fullWidth
            variant="outlined"
            size="small"
            sx={{ mb: 3, mt: 2 }}
            disabled={props.addUserLoading}
          >
            <InputLabel id="branch-label">Days Served</InputLabel>
            <Select
              labelId="branch-label"
              value={dish.branch}
              onChange={handleBranchChange}
              label="Branch"
            >
              {props.categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            variant="outlined"
            size="small"
            sx={{ mb: 3 }}
            disabled={props.addUserLoading}
          >
            <InputLabel id="role-label">Category</InputLabel>
            <Select
              labelId="role-label"
              value={dish.role}
              onChange={handleRoleChange}
              label="Role"
            >
              <MenuItem value="subscriber">Subscriber</MenuItem>
              <MenuItem value="staff">Staff</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Box
            my={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {props.addUserLoading ? (
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
                onClick={handleAddUser}
              />
            )}
          </Box>
        </Box>
      </Zoom>
    </div>
  );
};

export default AddDish;
