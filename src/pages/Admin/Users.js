import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Grid,
  Icon,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
  Select,
  Switch,
  FormControlLabel,
} from "@mui/material";
import ActionButton from "../../components/Buttons/ActionButton";
import Subtitle from "../../components/Typography/Subtitle";
import LoadingBackdrop from "../../components/Feedbacks/LoadingBackdrop";
import { createUser, deleteUser, getUsers } from "../../serverFunctions/user";
import AddUser from "../../components/Forms/AddUser";
import { getDepartments } from "../../serverFunctions/department";
import { getBranches } from "../../serverFunctions/branch";
import _ from "lodash";

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

const Users = (props) => {
  const [loading, setLoading] = useState(false);
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const [userGroups, setUserGroups] = useState([
    { label: "customers", value: "subscriber", count: 0 },
    { label: "staff", value: "staff", count: 0 },
    { label: "admins", value: "admin", count: 0 },
  ]);
  const [selectedUserGroup, setSelectedUserGroup] = useState("subscriber");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openUser, setOpenUser] = useState(false);
  const [departments, setDepartments] = useState(null);
  const [branches, setBranches] = useState(null);

  const [displayAddUser, setDisplayAddUser] = useState(true);

  const loadBankInfo = async () => {
    const res1 = await getDepartments(props.user.token);
    const res2 = await getBranches(props.user.token);
    setDepartments(res1.data);
    setBranches(res2.data);
  };

  const loadUsers = async () => {
    setLoading(true);
    setSelectedUserGroup("subscriber");
    try {
      const res = await getUsers(props.user.token);
      setUsers(res.data);

      /////set count/////////
      let newUserGroups = [...userGroups];
      newUserGroups.forEach((userGroup, index) => {
        let count = res.data.filter(
          (user) => user.role === userGroup.value
        ).length;
        newUserGroups[index].count = count;
      });
      let filtered = [];
      setUserGroups(newUserGroups);
      res.data.map((user) => {
        if (user.role === "subscriber") filtered.push(user);
      });
      setFilteredUsers(filtered);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsers();
    loadBankInfo();
  }, []);

  const handleUserGroupFilter = (value) => {
    let filtered = [];
    if (users && users.length) {
      setSelectedUserGroup(value);

      users.map((user) => {
        if (user.role === value) filtered.push(user);
      });
      setFilteredUsers(filtered);
    }
  };

  const handleUserSelected = (user) => {
    setSelectedUser(user);
    setOpenUser(true);
  };

  const showValidationError = (text) => {
    props.setAlertSnackbar({
      open: true,
      text,
      severity: "error",
    });
  };
  const handleAddUser = async (userDetails, handleAddUserSuccess) => {
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

    try {
      setAddUserLoading(true);
      const res = await createUser(props.user.token, userDetails);

      if (res.data.status === "false") {
        showValidationError(res.data.message);
        setAddUserLoading(false);
        return;
      }
      setUsers((prevState) => {
        let filtered = [];
        prevState = [...prevState, res.data];

        // Update the count for the corresponding user group
        const newUserGroups = userGroups.map((userGroup) => {
          if (userGroup.value === res.data.role) {
            return {
              ...userGroup,
              count: userGroup.count + 1,
            };
          }
          return userGroup;
        });

        setUserGroups(newUserGroups);

        prevState.forEach((user) => {
          if (user.role === selectedUserGroup) {
            filtered.push(user);
          }
        });
        setFilteredUsers(filtered);
        return prevState;
      });

      setAddUserLoading(false);
      handleAddUserSuccess();
    } catch (error) {
      setAddUserLoading(false);
      console.log(error);
      // Handle the error
    }
  };

  const handleDeleteUser = async (user) => {
    try {
      if (!window.confirm(`Are you sure you want to delete "${user.name}"`))
        return;

      setLoading(true);
      const res = await deleteUser(props.user.token, user._id);
      if (res.data.status === "ok") {
        loadUsers();

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
            <Subtitle my={1} title="Users" />
            <IconButton size="small" onClick={loadUsers}>
              <Icon color="primary" fontSize="small">
                refresh
              </Icon>
            </IconButton>
          </Box>
          <ActionButton
            text="Add"
            leftIcon="add"
            fullWidth={false}
            my={0}
            variant="outlined"
            size="small"
          />
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
                {userGroups.map((userGroup, index) => (
                  <Box key={index}>
                    <ActionButton
                      text={`${userGroup.label} (${userGroup.count})`}
                      variant=""
                      sx={{
                        textTransform: "capitalize",
                        py: 0,
                        fontSize: "0.85rem",
                        boxShadow:
                          "inset 0 0 0 1px rgba(16,22,26,.05), inset 0 -1px 0 rgba(16,22,26,.2)",
                        bgcolor:
                          selectedUserGroup === userGroup.value
                            ? "#fee5b9"
                            : "#fff",
                        fontWeight:
                          selectedUserGroup === userGroup.value ? 700 : "400",
                        color:
                          selectedUserGroup === userGroup.value
                            ? "primary.main"
                            : "",
                        my: 1,
                        "&:hover": {
                          bgcolor: "#fee5b9",
                        },
                      }}
                      fullWidth={false}
                      size="small"
                      onClick={() => handleUserGroupFilter(userGroup.value)}
                    />
                  </Box>
                ))}
              </Box>
              <Typography fontWeight="bold">
                {/* {_.startCase(selectedUserGroup)} */}
              </Typography>
              {filteredUsers.length
                ? filteredUsers.map((user, index) => (
                    <Box
                      id={index}
                      sx={{
                        ...cardStyle,
                      }}
                      onClick={() => handleUserSelected(user)}
                    >
                      <Box
                        display="flex"
                        columnGap={1}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box
                          display={{ xs: "block", md: "flex" }}
                          columnGap={5}
                        >
                          <Typography variant="body2" fontWeight={500}>
                            {_.startCase(user.name)} ({user.phoneNumber})
                          </Typography>

                          <Typography variant="body2">
                            Branch: {_.startCase(user.branch.name)}
                          </Typography>
                          <Typography variant="body2">
                            Department: {_.startCase(user.department.name)}
                          </Typography>
                          {user.email ? (
                            <Typography variant="body2">
                              Email: {user.email}
                            </Typography>
                          ) : (
                            ""
                          )}
                        </Box>
                        <Box
                          display={users.length > 1 ? "flex" : "none"}
                          justifyContent="space-between"
                          alignItems="center"
                          columnGap={3}
                        >
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteUser(user)}
                          >
                            <Icon fontSize="small">delete</Icon>
                          </IconButton>
                          <IconButton size="small" color="info">
                            <Icon fontSize="small">edit</Icon>
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  ))
                : ""}
            </Grid>
            <Grid item xs={12} md={4} px={{ md: 5 }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
                gap={1}
              >
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked
                      onChange={(e) => setDisplayAddUser(e.target.checked)}
                    />
                  }
                  label="Add User"
                />
              </Box>
              {departments &&
              departments.length &&
              branches &&
              branches.length ? (
                <Box display={displayAddUser ? "flex" : "none"}>
                  <AddUser
                    departments={departments}
                    branches={branches}
                    handleAddUser={handleAddUser}
                    addUserLoading={addUserLoading}
                  />
                </Box>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
      <LoadingBackdrop open={loading} />
      {/* {selectedUser ? (
        <User
          open={openUser}
          user={props.user}
          selectedUser={selectedUser}
          onClose={() => setOpenUser(false)}
          loadUsers={loadUsers}
        />
      ) : (
        ""
      )} */}
    </div>
  );
};

export default Users;
