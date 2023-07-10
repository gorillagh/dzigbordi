import React from "react";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Badge } from "@mui/material";

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
const DishCard = (props) => {
  return (
    <Box style={{ ...cardStyle }}>
      {props.dishes &&
        props.dishes.map((d, i) => {
          return (
            <Box key={i}>
              <Grid
                sx={{ cursor: "pointer" }}
                container
                spacing={2}
                onClick={() => props.handleDishSelect(d)}
                alignItems="center"
              >
                <Grid item xs={5}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="right"
                    width="100%"
                  >
                    <Badge
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      sx={{
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                      // badgeContent={dishNumber}
                      color="primary"
                    >
                      <Box
                        height={{
                          xs: "100px",
                          md: "120px",
                        }}
                      >
                        <img
                          style={{
                            borderRadius: "12px",
                            height: "100%",
                            width: "100%",
                          }}
                          alt="dish"
                          src={d.image}
                        />
                      </Box>
                    </Badge>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={7}
                  // md={4}
                  sx={{
                    // borderLeft: selected ? 4 : 0,
                    // borderLeftColor: selected ? "primary.main" : "",
                    boxSizing: "border-box",
                    pr: 1,
                  }}
                >
                  <Typography fontWeight={600}>{d.name}</Typography>
                  <Typography variant="body2" fontWeight={400}>
                    {d.daysServed.map((day, index) => day)}
                  </Typography>

                  <Typography
                    maxHeight="36.60px"
                    my={0.5}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    variant="body2"
                    color="text.secondary"
                  >
                    {d.description}
                  </Typography>
                </Grid>
              </Grid>
              {i === props.dishes.length - 1 ? "" : <Divider sx={{ my: 2 }} />}
            </Box>
          );
        })}
    </Box>
  );
};

export default DishCard;
