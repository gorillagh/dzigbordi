import React, { useEffect, useState } from "react";
import { Box, Icon, IconButton, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  createBranch,
  deleteBranch,
  getBranches,
  updateBranch,
} from "../../serverFunctions/branch";
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
} from "../../serverFunctions/department";
import Subtitle from "../../components/Typography/Subtitle";
import ActionButton from "../../components/Buttons/ActionButton";
import BankAdd from "../../components/Buttons/BankAdd";
import BranchEdit from "../../components/PopUps/Admin/BranchEdit";
import LoadingBackdrop from "../../components/Feedbacks/LoadingBackdrop";
import DepartmentEdit from "../../components/PopUps/Admin/DepartmentEdit";

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

const Bank = (props) => {
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [branches, setBranches] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("branches");
  const [displayGroup, setDisplayGroup] = useState([]);
  const [branch, setBranch] = useState({});
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [department, setDepartment] = useState({});
  const [openBranchEdit, setOpenBranchEdit] = useState(false);
  const [openDepartmentEdit, setOpenDepartmentEdit] = useState(false);
  const [openDepartmentAdd, setOpenDepartmentAdd] = useState(false);
  const navigate = useNavigate();
  const loadBankSubs = async () => {
    setLoading(true);
    try {
      const res1 = await getBranches(props.user.token);
      const res2 = await getDepartments(props.user.token);
      setBranches(res1.data);
      setDepartments(res2.data);
      setDisplayGroup(res1.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadBankSubs();
  }, []);
  //////////////////Branch//////////////////////////////
  const handleAddBranch = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const res = await createBranch(props.user.token, branch);
      console.log(res.data);
      setBranches((prevState) => {
        prevState = [...prevState, res.data];
        return prevState;
      });
      setDisplayGroup((prevState) => {
        prevState = [...prevState, res.data];
        return prevState;
      });
      setBranch({ name: "" });
      setLoading(false);
      props.setAlertSnackbar({
        open: true,
        text: `${res.data.name} branch added`,
        severity: "success",
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleBranchDelete = async (branch) => {
    try {
      if (
        !window.confirm(
          `Are you sure you want to delete "${branch.name}" branch`
        )
      )
        return;

      setLoading(true);
      const res = await deleteBranch(props.user.token, branch._id);
      if (res.data.status === "ok") {
        setBranches((prevState) =>
          prevState.filter((b) => b._id !== branch._id)
        );
        setDisplayGroup((prevState) =>
          prevState.filter((b) => b._id !== branch._id)
        );
        setLoading(false);
        props.setAlertSnackbar({
          open: true,
          text: `${res.data.name} branch deleted`,
          severity: "success",
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleBranchEdit = (branch) => {
    setSelectedBranch(branch);
    setOpenBranchEdit(true);
  };

  const handleBranchUpdate = async (branch) => {
    try {
      setUpdateLoading(true);
      const res = await updateBranch(props.user.token, branch._id, branch);
      console.log(res.data);
      const updatedBranchIndex = branches.findIndex(
        (b) => b._id === branch._id
      );

      if (updatedBranchIndex !== -1) {
        const updatedBranches = [...branches];
        updatedBranches[updatedBranchIndex] = res.data;
        setBranches(updatedBranches);
        setDisplayGroup(updatedBranches);
      }
      setUpdateLoading(false);
      setOpenBranchEdit(false);
      setSelectedBranch(null);
      props.setAlertSnackbar({
        open: true,
        text: `${res.data.name} branch updated`,
        severity: "success",
      });
    } catch (error) {
      setUpdateLoading(false);
      console.log(error);
    }
  };

  ////////////////////////Department///////////////////////
  const handleAddDepartment = async (e) => {
    try {
      setUpdateLoading(true);
      e.preventDefault();
      const res = await createDepartment(props.user.token, department);
      console.log(res.data);
      setDepartments((prevState) => {
        prevState = [...prevState, res.data];
        return prevState;
      });
      setDisplayGroup((prevState) => {
        prevState = [...prevState, res.data];
        return prevState;
      });
      setDepartment({ name: "" });
      setUpdateLoading(false);
      props.setAlertSnackbar({
        open: true,
        text: `${res.data.name} department added`,
        severity: "success",
      });
    } catch (error) {
      setUpdateLoading(false);
      console.log(error);
    }
  };

  const handleDepartmentDelete = async (department) => {
    try {
      if (
        !window.confirm(
          `Are you sure you want to delete "${department.name}" department`
        )
      )
        return;
      setLoading(true);
      const res = await deleteDepartment(props.user.token, department._id);
      if (res.data.status === "ok") {
        setDepartments((prevState) =>
          prevState.filter((d) => d._id !== department._id)
        );
        setDisplayGroup((prevState) =>
          prevState.filter((d) => d._id !== department._id)
        );
        setLoading(false);
        props.setAlertSnackbar({
          open: true,
          text: `${res.data.name} department deleted`,
          severity: "success",
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleDepartmentEdit = (department) => {
    setSelectedDepartment(department);
    setOpenDepartmentEdit(true);
  };

  const handleDepartmentUpdate = async (branch) => {
    try {
      setUpdateLoading(true);
      const res = await updateDepartment(props.user.token, branch._id, branch);
      console.log(res.data);
      const updatedDepartmentIndex = departments.findIndex(
        (b) => b._id === branch._id
      );

      if (updatedDepartmentIndex !== -1) {
        const updatedDepartments = [...departments];
        updatedDepartments[updatedDepartmentIndex] = res.data;
        setDepartments(updatedDepartments);
        setDisplayGroup(updatedDepartments);
      }
      setUpdateLoading(false);
      setOpenDepartmentEdit(false);
      setSelectedDepartment(null);
      props.setAlertSnackbar({
        open: true,
        text: `${res.data.name} department updated`,
        severity: "success",
      });
    } catch (error) {
      setUpdateLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <Box
        my={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Subtitle my={1} title="Bank Info" />
        </Box>
        <IconButton size="small" onClick={loadBankSubs}>
          <Icon color="primary" fontSize="small">
            refresh
          </Icon>
        </IconButton>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        gap={1}
      >
        <Box>
          <ActionButton
            text={`branches (${
              branches && branches.length ? branches.length : 0
            })`}
            variant=""
            sx={{
              textTransform: "capitalize",
              py: 0,
              fontSize: "0.85rem",
              boxShadow:
                "inset 0 0 0 1px rgba(16,22,26,.05), inset 0 -1px 0 rgba(16,22,26,.2)",
              bgcolor: selectedGroup === "branches" ? "#fee5b9" : "#fff",
              fontWeight: selectedGroup === "branches" ? 700 : "400",
              color: selectedGroup === "branches" ? "primary.main" : "",
              my: 1,
              "&:hover": {
                bgcolor: "#fee5b9",
              },
            }}
            fullWidth={false}
            size="small"
            onClick={() => {
              setSelectedGroup("branches");
              setDisplayGroup(branches);
            }}
          />
        </Box>
        <Box>
          <ActionButton
            text={`departments (${
              departments && departments.length ? departments.length : 0
            })`}
            variant=""
            sx={{
              textTransform: "capitalize",
              py: 0,
              fontSize: "0.85rem",
              boxShadow:
                "inset 0 0 0 1px rgba(16,22,26,.05), inset 0 -1px 0 rgba(16,22,26,.2)",
              bgcolor: selectedGroup === "departments" ? "#fee5b9" : "#fff",
              fontWeight: selectedGroup === "departments" ? 700 : "400",
              color: selectedGroup === "departments" ? "primary.main" : "",
              my: 1,
              "&:hover": {
                bgcolor: "#fee5b9",
              },
            }}
            fullWidth={false}
            size="small"
            onClick={() => {
              setSelectedGroup("departments");
              console.log(departments);
              setDisplayGroup(departments);
            }}
          />
        </Box>
      </Box>
      <Box
        component="form"
        display={selectedGroup === "branches" ? "flex" : "none"}
        alignItems="center"
        onSubmit={handleAddBranch}
        columnGap={2}
        noValidate
        width={{ xs: "100%", md: "70%" }}
        mx="auto"
      >
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          id="item-name"
          label="Add a branch"
          name="name"
          autoComplete="name"
          value={branch.name}
          onChange={(e) =>
            setBranch((prevState) => ({
              ...prevState,
              name: e.target.value.toLowerCase(),
              location: e.target.value.toLocaleLowerCase(),
            }))
          }
        />

        <ActionButton
          text="add"
          type="submit"
          fullWidth={false}
          disabled={!branch.name}
          onClick={handleAddBranch}
          // size="small"
        />
      </Box>
      <Box
        component="form"
        display={selectedGroup === "departments" ? "flex" : "none"}
        alignItems="center"
        onSubmit={handleAddDepartment}
        columnGap={2}
        noValidate
        width={{ xs: "100%", md: "70%" }}
        mx="auto"
      >
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          id="item-name"
          label="Add a department"
          name="name"
          autoComplete="name"
          value={department.name}
          onChange={(e) =>
            setDepartment((prevState) => ({
              ...prevState,
              name: e.target.value.toLowerCase(),
            }))
          }
        />

        <ActionButton
          text="add"
          type="submit"
          fullWidth={false}
          disabled={!department.name}
          onClick={handleAddDepartment}
        />
      </Box>
      <Box>
        {displayGroup && displayGroup.length
          ? displayGroup.map((item, index) => (
              <Box
                id={index}
                sx={{
                  ...cardStyle,
                }}
                width={{ xs: "100%", md: "70%" }}
                mx="auto"
              >
                <Box
                  display="flex"
                  columnGap={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display={{ xs: "block", md: "flex" }} columnGap={5}>
                    <Typography variant="body2" fontWeight={500}>
                      {item.name}
                    </Typography>

                    {item.location ? (
                      <Typography variant="body2">
                        Location: {item.location}
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
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() =>
                        selectedGroup === "branches"
                          ? handleBranchDelete(item)
                          : handleDepartmentDelete(item)
                      }
                    >
                      <Icon fontSize="small">delete</Icon>
                    </IconButton>
                    <IconButton
                      size="small"
                      color="info"
                      onClick={() =>
                        selectedGroup === "branches"
                          ? handleBranchEdit(item)
                          : handleDepartmentEdit(item)
                      }
                    >
                      <Icon fontSize="small">edit</Icon>
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))
          : ""}
      </Box>
      {selectedBranch ? (
        <BranchEdit
          selectedBranch={selectedBranch}
          open={openBranchEdit}
          onClose={() => {
            setOpenBranchEdit(false);
            setSelectedBranch(null);
          }}
          handleBranchUpdate={handleBranchUpdate}
          loading={updateLoading}
        />
      ) : (
        ""
      )}
      {selectedDepartment ? (
        <DepartmentEdit
          selectedDepartment={selectedDepartment}
          open={openDepartmentEdit}
          onClose={() => {
            setOpenDepartmentEdit(false);
            setSelectedDepartment(null);
          }}
          handleDepartmentUpdate={handleDepartmentUpdate}
          loading={updateLoading}
        />
      ) : (
        ""
      )}
      <LoadingBackdrop open={loading} />
    </div>
  );
};

export default Bank;
