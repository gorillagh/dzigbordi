import React, { useState, useEffect, useRef } from "react";
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

const DishEdit = (props) => {
  const [selectedDish, setSelectedDish] = useState(props.dish);

  const containerRef = useRef(null);

  const handleDepartmentChange = (e) => {
    const selectedDepartmentId = e.target.value;
    const selectedDepartment = props.departments.find(
      (department) => department._id === selectedDepartmentId
    );
    setSelectedDish((prevState) => ({
      ...prevState,
      department: selectedDepartment,
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
                        <Icon fontSize="small">badge</Icon>
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
