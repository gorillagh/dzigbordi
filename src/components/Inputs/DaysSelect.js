import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// function getStyles(day, daysSelected, theme) {
//   return {
//     fontWeight:
//       daysSelected.indexOf(day) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

const DaysSelect = (props) => {
  const theme = useTheme();
  const [daysSelected, setDaysSelected] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // setDaysSelected(
    //   // On autofill we get a stringified value.
    //   typeof value === "string" ? value.split(",") : value
    // );
    props.setDish((prevState) => ({
      ...prevState,
      daysServed: typeof value === "string" ? value.split(",") : value,
    }));
  };

  return (
    <div>
      <FormControl fullWidth sx={{ mt: 2, mb: 3 }} required>
        <InputLabel id="demo-multiple-chip-label">Days Served</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={props.dish.daysServed || []}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {props.daysOfWeek.map((day) => (
            <MenuItem
              key={day}
              value={day}
              // style={getStyles(day, props.dish.daysServed, theme)}
            >
              {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DaysSelect;
