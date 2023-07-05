import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
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

const UserEdit = (props) => {
  const [selectedUser, setSelectedUser] = useState({
    ...props.user,
    phoneNumber: `0${props.user.phoneNumber.slice(-9)}`,
  });
  //     name: props.user.name,
  //     phoneNumber: `0${props.user.phoneNumber.slice(-9)}`,
  //     branch: props.user.branch,
  //     department: props.user.department,
  //     role: props.user.role,
  //   });

  const containerRef = React.useRef(null);

  const handleDepartmentChange = (e) => {
    setSelectedUser((prevState) => ({
      ...prevState,
      department: e.target.value,
    }));
  };

  const handleBranchChange = (e) => {
    setSelectedUser((prevState) => ({
      ...prevState,
      branch: e.target.value,
    }));
  };

  const handleRoleChange = (e) => {
    setSelectedUser((prevState) => ({
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

  const handleEditUser = (e) => {
    e.preventDefault();
    console.log(selectedUser);
    // Validate Name
    if (selectedUser.name.trim() === "") {
      showValidationError("Name is Required");
      return;
    }
    // Validate Phone Number
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(selectedUser.phoneNumber)) {
      showValidationError("Invalid Phone Number");
      return;
    }
    selectedUser.phoneNumber = `+233${selectedUser.phoneNumber.slice(-9)}`;
    // Validate Branch
    if (selectedUser.branch.name.trim() === "") {
      // Display an error message or handle the validation error
      showValidationError("Branch is required");
      return;
    }
    // Validate Department
    if (selectedUser.department.name.trim() === "") {
      showValidationError("Department is required");
      return;
    }
    // Validate Role
    if (selectedUser.role.trim() === "") {
      showValidationError("Role is required");
      return;
    }
    // You can handle the addUser functionality here or pass it to the parent component as a prop
    props.handleEditUser(selectedUser, handleEditUserSuccess);
  };
  const handleEditUserSuccess = () => {
    // Reset the form fields
    setSelectedUser({
      name: "",
      phoneNumber: "",
      branch: "",
      department: "",
      role: "subscriber",
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
                <Subtitle title="Edit User" my={0} />
                <IconButton color="error" onClick={props.onClose}>
                  <Icon>close</Icon>
                </IconButton>
              </Box>

              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditUser();
                }}
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
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser((prevState) => ({
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
                  value={selectedUser.phoneNumber}
                  onChange={(e) =>
                    setSelectedUser((prevState) => ({
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
                    value={selectedUser.branch && selectedUser.branch._id}
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
                    value={
                      selectedUser.department && selectedUser.department._id
                    }
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
                    value={selectedUser.role}
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
                      onClick={handleEditUser}
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

export default UserEdit;
