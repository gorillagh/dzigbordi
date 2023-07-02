import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Subtitle from "../../components/Typography/Subtitle";

const cardStyle = {
  px: 2,
  py: 1,
  my: 1.5,
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(8.8px)",
  WebkitBackdropFilter: "blur(8.8px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
  webkitBackdropFilter: "blur(5px)",
  width: "100%",
  boxSizing: "border-box",
  height: "100%",
  // border: "1px solid rgba(255, 255, 255, 0.3)",
  cursor: "pointer",
};
const cardHeader = {
  fontWeight: 500,
  my: 1,
};

const loadingSkeletons = [1, 2, 3, 4];

const Dashboard = (props) => {
  const [loading, setLoading] = useState(false);
  const [summaryLoading, setsummaryLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  const navigate = useNavigate();

  return (
    <div>
      <Box
        p={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Subtitle title={`Hello ${props.user.name.split(" ")[0]},`} my={1} />
        <IconButton
          size="small"
          onClick={() => {
            // getBriefs();
            // getChartData();
          }}
        >
          <Icon color="primary" fontSize="small">
            refresh
          </Icon>
        </IconButton>
      </Box>
      {summaryLoading ? (
        <Grid container justifyContent="space-between" spacing={1} px={1}>
          {loadingSkeletons.map((skeleton, index) => (
            <Grid item xs={6} md={3}>
              <Box
                sx={{ ...cardStyle, height: 80 }}
                onClick={() => navigate("/admin/orders")}
              >
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height="100%"
                  // sx={{ ...cardStyle }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container justifyContent="space-between" spacing={1} px={1}>
          {/* ///////////////////ORDERS SECTION////////////////////////// */}
          <Grid item xs={6} md={3}>
            <Box
              sx={{ ...cardStyle }}
              onClick={() => navigate("/admin/orders")}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography sx={{ ...cardHeader }}>Orders</Typography>
                <Icon fontSize="small" color="primary">
                  assignment
                </Icon>
              </Box>
              <Box
                display="flex"
                my={1}
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Typography variant="body2" mr={1}>
                  Up Coming:{" "}
                </Typography>
                <Box display="flex">
                  <Subtitle
                    color={
                      summary && summary.ordersInfo.uncompletedNumber > 0
                        ? "secondary"
                        : ""
                    }
                    title={summary ? summary.ordersInfo.uncompletedNumber : 0}
                    my={0}
                  />
                </Box>
              </Box>

              <Box
                display="flex"
                my={1}
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Typography variant="body2" mr={1}>
                  All:{" "}
                </Typography>

                <Subtitle
                  title={summary ? summary.ordersInfo.allTimeOrdersNumber : 0}
                  my={0}
                />
              </Box>
            </Box>
          </Grid>

          {/* ////////////////////MENU SECTION//////////////////////// */}
          <Grid item xs={6} md={3}>
            <Box sx={{ ...cardStyle }} onClick={() => navigate("/admin/menu")}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography sx={{ ...cardHeader }}>Menu</Typography>
                <Icon fontSize="small" color="primary">
                  restaurant_menu
                </Icon>
              </Box>
              <Box
                display="flex"
                my={1}
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Typography variant="body2" mr={1}>
                  Dishes:
                </Typography>
                <Subtitle
                  title={summary ? summary.menuInfo.dishesTotal : 0}
                  my={0}
                />
              </Box>
              <Box
                display="flex"
                my={1}
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Typography variant="body2" mr={1}>
                  Categories:
                </Typography>
                <Subtitle
                  title={summary ? summary.menuInfo.drinksTotal : 0}
                  my={0}
                />
              </Box>
            </Box>
          </Grid>

          {/* /////////////USERS SECTION////////////////////////////////          */}
          <Grid item xs={6} md={3}>
            <Box sx={{ ...cardStyle }} onClick={() => navigate("/admin/users")}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography sx={{ ...cardHeader }}>Users</Typography>
                <Icon fontSize="small" color="primary">
                  people
                </Icon>
              </Box>
              <Box
                display="flex"
                my={1}
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Typography variant="body2" mr={1}>
                  Customers:
                </Typography>
                <Subtitle
                  title={summary ? summary.usersInfo.customersTotal : 0}
                  my={0}
                />
              </Box>
              <Box
                display="flex"
                my={1}
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Typography variant="body2" mr={1}>
                  Staff:
                </Typography>
                <Subtitle
                  title={summary ? summary.usersInfo.staffTotal : 0}
                  my={0}
                />
              </Box>
              <Box
                display="flex"
                my={1}
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Typography variant="body2" mr={1}>
                  Admins:
                </Typography>
                <Subtitle
                  title={summary ? summary.usersInfo.adminsTotal : 0}
                  my={0}
                />
              </Box>
            </Box>
          </Grid>

          {/* ////////////REPORTS SECTION///////////////////////////// */}
          <Grid item xs={6} md={3}>
            <Box sx={{ ...cardStyle }} onClick={() => navigate("/admin/bank")}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography sx={{ ...cardHeader }}>Bank</Typography>
                <Icon fontSize="small" color="primary">
                  business
                </Icon>
              </Box>

              <Box
                display="flex"
                my={1}
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography variant="body2" mr={1}>
                  Branches:{" "}
                </Typography>
                <Subtitle
                  title={
                    summary && summary.reportsInfo
                      ? summary.reportsInfo.todayReports
                      : 0
                  }
                  my={0}
                />
              </Box>
              <Box
                display="flex"
                my={1}
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Typography variant="body2" mr={1}>
                  Departments:{" "}
                </Typography>
                <Subtitle
                  title={
                    summary && summary.reportsInfo
                      ? summary.reportsInfo.todayReports
                      : 0
                  }
                  my={0}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Dashboard;
