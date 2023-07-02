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
import { createUser, getUsers } from "../../serverFunctions/user";
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
  const handleAddUser = async (userDetails) => {
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
      setLoading(true);
      const res = await createUser(props.user.token, userDetails);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      // Handle the error
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
                {_.startCase(selectedUserGroup)}
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
                            {user.name} ({user.phoneNumber})
                          </Typography>

                          <Typography variant="body2">
                            Branch: {user.branch.name}
                          </Typography>
                          <Typography variant="body2">
                            Department: {user.department.name}
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
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          columnGap={3}
                        >
                          <IconButton size="small" color="error">
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
