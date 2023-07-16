import React, { useEffect } from "react";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Badge } from "@mui/material";
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
  "&:hover": {
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
    cursor: "pointer",
  },
};
const DishCard = (props) => {
  const handleSelectedDish = (dish) => {
    props.setSelectedDish(dish);
    props.setOpenOrderConfirmation(true);
  };

  return (
    <Box>
      {props.dishes &&
        props.dishes
          .filter((dish) =>
            dish.name.toLowerCase().includes(props.searchText.toLowerCase())
          )
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((dish, index) => (
            <Box
              key={index}
              sx={{ ...cardStyle }}
              width={{ xs: "100%", md: "70%" }}
              mx="auto"
              onClick={() => handleSelectedDish(dish)}
            >
              <Box
                display="flex"
                columnGap={1}
                alignItems="center"
                justifyContent="space-between"
              >
                {/* <Box> */}

                <Box display="flex" flexDirection="column" rowGap={1}>
                  <Typography variant="body1" fontWeight={500}>
                    {dish.name
                      .toLowerCase()
                      .replace(/\b\w/g, (match) => match.toUpperCase())}
                  </Typography>
                  {dish.description ? (
                    <Typography variant="body2" fontWeight={400}>
                      {dish.description}
                    </Typography>
                  ) : (
                    ""
                  )}
                  <Box display="flex" alignItems="center" columnGap={0.5}>
                    {dish.daysServed.map((day, index) => (
                      <Typography variant="body2">
                        {day.substring(0, 3)}
                        {index + 1 === dish.daysServed.length ? "." : ", "}
                      </Typography>
                    ))}
                  </Box>
                </Box>
                {dish.image ? (
                  <Box height={80} width={100} borderRadius="12px">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      height="80px"
                      width="100px"
                      style={{ borderRadius: "12px" }}
                    />
                  </Box>
                ) : (
                  ""
                )}
                {/* </Box> */}
              </Box>
            </Box>
          ))}
    </Box>
  );
};

export default DishCard;
