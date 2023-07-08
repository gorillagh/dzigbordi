import React, { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  Divider,
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
import ActionButton from "../Buttons/ActionButton";
import _ from "lodash";
import CircularLoading from "../Feedbacks/CircularLoading";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../serverFunctions/category";
import Category from "../PopUps/Admin/Category";

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

const Categories = (props) => {
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState(props.categories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openCategoryEdit, setOpenCategoryEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const containerRef = React.useRef(null);

  const handleCategoryAdd = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await createCategory(props.user.token, category);
      if (res.data.status === "false") {
        props.setAlertSnackbar({
          open: true,
          text: res.data.message,
          severity: "error",
        });
        setLoading(false);
        return;
      }
      setCategories((prevState) => {
        console.log(prevState);
        prevState = [...prevState, res.data];
        return prevState;
      });

      setCategory({ name: "" });
      setLoading(false);
      props.setAlertSnackbar({
        open: true,
        text: `${res.data.name} category added`,
        severity: "success",
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleCategoryDelete = async (category) => {
    console.log(category);
    try {
      if (
        !window.confirm(
          `Are you sure you want to delete "${category.name}" category`
        )
      )
        return;
      setLoading(true);
      const res = await deleteCategory(props.user.token, category._id);
      if (res.data.status === "ok") {
        setCategories((prevState) =>
          prevState.filter((d) => d._id !== category._id)
        );

        setLoading(false);
        props.setAlertSnackbar({
          open: true,
          text: `${res.data.name} category deleted`,
          severity: "success",
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleCategoryEdit = (category) => {
    setSelectedCategory(category);
    setOpenCategoryEdit(true);
  };

  const handleCategoryUpdate = async (branch) => {
    try {
      setUpdateLoading(true);
      const res = await updateCategory(props.user.token, branch._id, branch);
      if (res.data.status === "false") {
        props.setAlertSnackbar({
          open: true,
          text: res.data.message,
          severity: "error",
        });
        setUpdateLoading(false);
        return;
      }
      const updatedCategoryIndex = categories.findIndex(
        (b) => b._id === branch._id
      );

      if (updatedCategoryIndex !== -1) {
        const updatedCategorys = [...categories];
        updatedCategorys[updatedCategoryIndex] = res.data;
        setCategories(updatedCategorys);
      }
      setUpdateLoading(false);
      setOpenCategoryEdit(false);
      setSelectedCategory(null);
      props.setAlertSnackbar({
        open: true,
        text: `${res.data.name} category updated`,
        severity: "success",
      });
    } catch (error) {
      setUpdateLoading(false);
      console.log(error);
    }
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
            handleCategoryAdd();
          }}
          sx={{ ...cardStyle }}
        >
          <Box display="flex" alignItems="center" columnGap={2}>
            <TextField
              size="small"
              //   margin="normal"
              required
              fullWidth
              id="item-name"
              label="Add a Category"
              name="category"
              autoComplete="category"
              value={category.name}
              onChange={(e) =>
                setCategory((prevState) => ({
                  ...prevState,
                  name: e.target.value.toLowerCase(),
                }))
              }
            />
            {/* {loading ? (
              <Typography variant="body2" fontWeight={600}>
                <CircularProgress size={20} thickness={6} />
              </Typography>
            ) : ( */}
            <ActionButton
              size="small"
              my={0}
              text={
                loading ? <CircularProgress size={20} thickness={6} /> : "add"
              }
              type="submit"
              fullWidth={false}
              disabled={!category.name || loading}
              onClick={handleCategoryAdd}
            />
            {/* )} */}
          </Box>
          <Divider sx={{ mt: 2, mb: 3 }} />
          {categories && categories.length
            ? categories
                .sort((a, b) => a.name.localeCompare(b.name)) // Sort the items alphabetically by name
                .map((item, index) => (
                  <Box
                    key={index}
                    id={index}
                    sx={{
                      ...cardStyle,
                    }}
                    mx="auto"
                  >
                    <Box
                      display="flex"
                      columnGap={1}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box display={{ xs: "block", md: "flex" }} columnGap={5}>
                        <Typography fontWeight={500}>
                          {_.startCase(item.name)}
                        </Typography>

                        {item.location ? (
                          <Typography variant="body2">
                            Location: {_.startCase(item.location)}
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
                          onClick={() => handleCategoryDelete(item)}
                        >
                          <Icon fontSize="small">delete</Icon>
                        </IconButton>
                        <IconButton
                          size="small"
                          color="info"
                          onClick={() => handleCategoryEdit(item)}
                        >
                          <Icon fontSize="small">edit</Icon>
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                ))
            : ""}
          {selectedCategory ? (
            <Category
              selectedCategory={selectedCategory}
              open={openCategoryEdit}
              onClose={() => {
                setOpenCategoryEdit(false);
                setSelectedCategory(null);
              }}
              handleDepartmentUpdate={handleCategoryUpdate}
              loading={updateLoading}
            />
          ) : (
            ""
          )}
        </Box>
      </Zoom>
    </div>
  );
};

export default Categories;
