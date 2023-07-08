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
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../serverFunctions/user";
import AddUser from "../../components/Forms/AddUser";
import { getDepartments } from "../../serverFunctions/department";
import { getBranches } from "../../serverFunctions/branch";
import _ from "lodash";
import UserEdit from "../../components/PopUps/Admin/UserEdit";
import PageTitle from "../../components/Typography/PageTitle";

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

  const [openUserEdit, setOpenUserEdit] = useState(false);

  const loadBankInfo = async () => {
    const res1 = await getDepartments(props.user.token);
    const res2 = await getBranches(props.user.token);
    setDepartments(res1.data);
    setBranches(res2.data);
  };

  const loadUsers = async (selectedRole) => {
    setLoading(true);
    setSelectedUserGroup(selectedRole);
    try {
      const res = await getUsers(props.user.token);
      setUsers(res.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsers("subscriber");
    loadBankInfo();
  }, []);

  const handleAddUser = async (userDetails, handleAddUserSuccess) => {
    try {
      setAddUserLoading(true);
      const res = await createUser(props.user.token, userDetails);

      if (res.data.status === "false") {
        props.setAlertSnackbar({
          open: true,
          text: res.data.message,
          severity: "error",
        });
        userDetails.phoneNumber = `0${userDetails.phoneNumber.slice(-9)}`;
        setAddUserLoading(false);
        return;
      }

      setUsers((prevState) => {
        const newUser = res.data;
        const updatedUsers = { ...prevState };

        if (updatedUsers.hasOwnProperty(newUser.role)) {
          updatedUsers[newUser.role].push(newUser);
        } else {
          updatedUsers[newUser.role] = [newUser];
        }

        return { ...updatedUsers };
      });

      setAddUserLoading(false);
      props.setAlertSnackbar({
        open: true,
        text: `${res.data.name} added`,
        severity: "success",
      });
      handleAddUserSuccess();
    } catch (error) {
      setAddUserLoading(false);
      console.log(error);
      // Handle the error
    }
  };

  const handleOpenEditUser = (user) => {
    setSelectedUser(user);
    setOpenUserEdit(true);
  };

  const handleEditUser = async (selectedUser, handleEditUserSuccess) => {
    try {
      setAddUserLoading(true);

      // Make the API call to update the user
      const res = await updateUser(
        props.user.token,
        selectedUser._id,
        selectedUser
      );

      if (res.data.status === "false") {
        props.setAlertSnackbar({
          open: true,
          text: res.data.message,
          severity: "error",
        });
        selectedUser.phoneNumber = `0${selectedUser.phoneNumber.slice(-9)}`;
        setAddUserLoading(false);
        return;
      }
      props.setAlertSnackbar({
        open: true,
        text: `${res.data.name} updated`,
        severity: "success",
      });
      setAddUserLoading(false);
      loadUsers(res.data.role);
      handleEditUserSuccess();
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
        setUsers((prevState) => {
          // Create a copy of the users object
          const updatedUsers = { ...prevState };

          // Find the array corresponding to the user's role in the copied object
          const roleArray = updatedUsers[user.role];

          // Find the index of the user in the role array based on their _id
          const userIndex = roleArray.findIndex((u) => u._id === user._id);

          if (userIndex !== -1) {
            // Create a copy of the role array
            const updatedRoleArray = [...roleArray];

            // Remove the user from the role array using the index
            updatedRoleArray.splice(userIndex, 1);

            // Replace the old role array with the updated role array in the copied object
            updatedUsers[user.role] = updatedRoleArray;

            // Set the updated object as the new state
            return updatedUsers;
          }

          return prevState; // If the user is not found, return the previous state unchanged
        });

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
            <PageTitle my={1} title="Users" />
            <IconButton size="small" onClick={loadUsers}>
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
                {users &&
                  Object.entries(users).map(([key, value]) => (
                    <Box key={key}>
                      <ActionButton
                        text={`${key} (${value.length})`}
                        variant=""
                        sx={{
                          textTransform: "capitalize",
                          py: 0,
                          fontSize: "0.85rem",
                          boxShadow:
                            "inset 0 0 0 1px rgba(16,22,26,.05), inset 0 -1px 0 rgba(16,22,26,.2)",
                          bgcolor:
                            selectedUserGroup === key ? "#fee5b9" : "#fff",
                          fontWeight: selectedUserGroup === key ? 700 : "400",
                          color:
                            selectedUserGroup === key ? "primary.main" : "",
                          my: 1,
                          "&:hover": {
                            bgcolor: "#fee5b9",
                          },
                        }}
                        fullWidth={false}
                        size="small"
                        onClick={() => setSelectedUserGroup(key)}
                      />
                    </Box>
                  ))}
              </Box>

              <Typography fontWeight="bold">
                {/* {_.startCase(selectedUserGroup)} */}
              </Typography>
              {users && users[selectedUserGroup]
                ? users[selectedUserGroup]
                    .sort((a, b) => a.name.localeCompare(b.name)) // Sort the users alphabetically by name
                    .map((user, index) => (
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
                          <Box
                            display={{ xs: "block", md: "flex" }}
                            columnGap={5}
                          >
                            <Typography fontWeight={500}>
                              {_.startCase(user.name)} ({user.phoneNumber})
                            </Typography>

                            <Typography variant="body2">
                              Branch:{" "}
                              {_.startCase(user.branch && user.branch.name)}
                            </Typography>
                            <Typography variant="body2">
                              Department:{" "}
                              {_.startCase(
                                user.department && user.department.name
                              )}
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
                            display={
                              user.phoneNumber === "+233240298910"
                                ? "none"
                                : "flex"
                            }
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

                            <IconButton
                              size="small"
                              color="info"
                              onClick={() => handleOpenEditUser(user)}
                            >
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
                    setAlertSnackbar={props.setAlertSnackbar}
                    open={displayAddUser}
                  />
                </Box>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
      {selectedUser &&
      departments &&
      departments.length &&
      branches &&
      branches.length ? (
        <UserEdit
          open={openUserEdit}
          onClose={() => {
            setSelectedUser(null);
            setOpenUserEdit(false);
          }}
          user={selectedUser}
          departments={departments}
          branches={branches}
          handleEditUser={handleEditUser}
          addUserLoading={addUserLoading}
          setAlertSnackbar={props.setAlertSnackbar}
        />
      ) : (
        ""
      )}
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
