import React, { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  Divider,
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

const Categories = (props) => {
  const [category, setCategory] = useState({});

  const containerRef = React.useRef(null);
  const handleAddCategory = async () => {};

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
            handleAddCategory();
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

            <ActionButton
              size="small"
              my={0}
              text="add"
              type="submit"
              fullWidth={false}
              disabled={!category.name}
              onClick={handleAddCategory}
            />
          </Box>
          <Divider sx={{ mt: 2, mb: 3 }} />
          <Box>
            {props.categories.map((category, index) => (
              <Typography>{category}</Typography>
            ))}
          </Box>
        </Box>
      </Zoom>
    </div>
  );
};

export default Categories;
