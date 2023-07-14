import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  Grid,
  Icon,
  IconButton,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import Subtitle from "../Typography/Subtitle";
import _ from "lodash";

import ActionButton from "../Buttons/ActionButton";
import LoadingBackdrop from "../Feedbacks/LoadingBackdrop";

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

const OrderConfirmation = (props) => {
  const containerRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({
    orderedBy: props.user._id,
    dish: { _id: props.dish._id, quantity: 1 },
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      props.setAlertSnackbar({
        open: true,
        text: `Your ${props.currentDayMenu.day} order has been recieved!`,
        severity: "success",
      });
      console.log(order);
      props.onClose();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
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
                <Subtitle title={`${props.currentDayMenu.day} Order`} my={0} />
                <IconButton color="error" onClick={props.onClose}>
                  <Icon>close</Icon>
                </IconButton>
              </Box>

              <Box display="flex" columnGap={1} alignItems="center" my={2}>
                {/* <Box> */}{" "}
                <Box display="flex" flexDirection="column" rowGap={1}>
                  <Typography fontWeight={500}>
                    {props.dish.name
                      .toLowerCase()
                      .replace(/\b\w/g, (match) => match.toUpperCase())}
                  </Typography>
                  {props.dish.description ? (
                    <Typography variant="body2" fontWeight={400}>
                      {props.dish.description}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Box>
                <Box height={80} width={100} borderRadius="12px">
                  <img
                    src={props.dish.image}
                    alt={props.dish.name}
                    height="80px"
                    width="100px"
                    style={{ borderRadius: "12px" }}
                  />
                </Box>
              </Box>

              <Box>
                {/* /////////////////Quantity/////////// */}

                <Box
                  sx={{
                    width: "70%",
                    mx: "auto",
                    my: 2,
                    display: "flex",
                    borderRadius: "12px",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow:
                      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.3)",
                    height: "100%",
                    borderColor: "rgba(0, 0, 0, 0.4)",
                    px: 2,
                    boxSizing: "border-box",
                  }}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={2} sx={{ cursor: "pointer" }}>
                      <Box
                        display={
                          order && order.dish && order.dish.quantity > 1
                            ? "flex"
                            : "none"
                        }
                        boxSizing="border-box"
                        justifyContent="center"
                      >
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => {
                            setOrder((prevState) => ({
                              ...prevState,
                              dish: {
                                ...prevState.dish,
                                quantity: prevState.dish.quantity - 1,
                              },
                            }));
                          }}
                        >
                          <Icon color="primary">remove</Icon>
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography
                        variant="h5"
                        textAlign="center"
                        fontWeight={500}
                      >
                        {order.dish.quantity || 1}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ cursor: "pointer" }}>
                      <Box
                        display="flex"
                        boxSizing="border-box"
                        justifyContent="center"
                      >
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => {
                            setOrder((prevState) => ({
                              ...prevState,
                              dish: {
                                ...prevState.dish,
                                quantity: prevState.dish.quantity + 1,
                              },
                            }));
                          }}
                        >
                          <Icon color="primary">add</Icon>
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              <Box display="flex" flexDirection="column" gap={1} my={2}>
                {/* /////////User information/////////////// */}
                <Box display="flex" alignItems="center" columnGap={1}>
                  <Typography variant="body2" fontWeight={400}>
                    Name:
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {props.user.name}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" columnGap={1}>
                  <Typography variant="body2" fontWeight={400}>
                    Phone:
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {`0${props.user.phoneNumber.slice(-9)}`}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" columnGap={1}>
                  <Typography variant="body2" fontWeight={400}>
                    Branch:
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {props.user.branch && props.user.branch.name}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" columnGap={1}>
                  <Typography variant="body2" fontWeight={400}>
                    Department:
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {props.user.department && props.user.department.name}
                  </Typography>
                </Box>
              </Box>
              <ActionButton text="Place Order" my={0} onClick={handleSubmit} />
            </Box>
            <LoadingBackdrop open={props.loading} />
          </Box>
        </Zoom>
      </Modal>
    </div>
  );
};

export default OrderConfirmation;
