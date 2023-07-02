import React, { useState } from "react";
import {
  Box,
  FormControl,
  Icon,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ActionButton from "../Buttons/ActionButton";

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

  const handleAddUser = () => {
    // You can handle the addUser functionality here or pass it to the parent component as a prop
    props.handleAddUser(userDetails);
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
        <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 3 }}>
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
        <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 3 }}>
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
      </Box>
    </div>
  );
};

export default AddUser;
