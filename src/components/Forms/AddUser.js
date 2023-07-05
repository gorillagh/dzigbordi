import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  Icon,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
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

const AddUser = (props) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    phoneNumber: "",
    branch: "",
    department: "",
    role: "subscriber",
  });

  const handleDepartmentChange = (e) => {
    setUserDetails((prevState) => ({
      ...prevState,
      department: e.target.value,
    }));
  };

  const handleBranchChange = (e) => {
    setUserDetails((prevState) => ({
      ...prevState,
      branch: e.target.value,
    }));
  };

  const handleRoleChange = (e) => {
    setUserDetails((prevState) => ({
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
    if (userDetails.name.trim() === "") {
      showValidationError("Name is Required");
      return;
    }
    // Validate Phone Number
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(userDetails.phoneNumber)) {
      showValidationError("Invalid Phone Number");
      return;
    }
    userDetails.phoneNumber = `+233${userDetails.phoneNumber.slice(-9)}`;
    // Validate Branch
    if (userDetails.branch.trim() === "") {
      // Display an error message or handle the validation error
      showValidationError("Branch is required");
      return;
    }
    // Validate Department
    if (userDetails.department.trim() === "") {
      showValidationError("Department is required");
      return;
    }
    // Validate Role
    if (userDetails.role.trim() === "") {
      showValidationError("Role is required");
      return;
    }
    // You can handle the addUser functionality here or pass it to the parent component as a prop
    props.handleAddUser(userDetails, handleAddUserSuccess);
  };
  const handleAddUserSuccess = () => {
    // Reset the form fields
    setUserDetails({
      name: "",
      phoneNumber: "",
      branch: "",
      department: "",
      role: "subscriber",
    });
  };
  return (
    <div>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddUser();
        }}
        sx={{ ...cardStyle }}
      >
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
                <Icon fontSize="small">badge</Icon>
              </InputAdornment>
            ),
          }}
          value={userDetails.name}
          onChange={(e) =>
            setUserDetails((prevState) => ({
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
          id="phone-number"
          placeholder="Phone Number"
          name="phoneNumber"
          type="tel"
          disabled={props.addUserLoading}
          value={userDetails.phoneNumber}
          onChange={(e) =>
            setUserDetails((prevState) => ({
              ...prevState,
              phoneNumber: e.target.value,
            }))
          }
          autoComplete="tel"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon fontSize="small">phone</Icon>
              </InputAdornment>
            ),
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
        />
        <FormControl
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mb: 3, mt: 2 }}
          disabled={props.addUserLoading}
        >
          <InputLabel id="branch-label">Branch</InputLabel>
          <Select
            labelId="branch-label"
            value={userDetails.branch}
            onChange={handleBranchChange}
            label="Branch"
          >
            {props.branches.map((branch) => (
              <MenuItem key={branch._id} value={branch._id}>
                {branch.name}
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
          <InputLabel id="department-label">Department</InputLabel>
          <Select
            labelId="department-label"
            value={userDetails.department}
            onChange={handleDepartmentChange}
            label="Department"
          >
            {props.departments.map((department) => (
              <MenuItem key={department._id} value={department._id}>
                {department.name}
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
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            value={userDetails.role}
            onChange={handleRoleChange}
            label="Role"
          >
            <MenuItem value="subscriber">Subscriber</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
        <Box my={2} display="flex" justifyContent="center" alignItems="center">
          {props.addUserLoading ? (
            <Typography variant="body2" fontWeight={600}>
              <CircularLoading size={20} thickness={6} />
            </Typography>
          ) : (
            <ActionButton
              text="Add User"
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
    </div>
  );
};

export default AddUser;
