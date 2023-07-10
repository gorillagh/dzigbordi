import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  Radio,
  RadioGroup,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import ActionButton from "../../components/Buttons/ActionButton";
import _ from "lodash";
import Subtitle from "../../components/Typography/Subtitle";
import AddDish from "../../components/Forms/AddDish";
import { getMenus } from "../../serverFunctions/menu";
import {
  createDish,
  deleteDish,
  getDishes,
  updateDish,
} from "../../serverFunctions/dish";
import { getCategories } from "../../serverFunctions/category";
import Categories from "../../components/Forms/Categories";
import LoadingBackdrop from "../../components/Feedbacks/LoadingBackdrop";
import DishEdit from "../../components/PopUps/Admin/DishEdit";

const Orders = (props) => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState({});
  const [orderAdd, setOpenOrderAdd] = useState(false);

  const navigate = useNavigate();

  const loadOrders = async () => {};

  useEffect(() => {}, []);

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
            <PageTitle my={1} title="Orders" />
            <IconButton size="small" onClick={loadOrders}>
              <Icon color="primary" fontSize="small">
                refresh
              </Icon>
            </IconButton>
          </Box>{" "}
          <ActionButton
            fullWidth={false}
            variant="outlined"
            size="small"
            text="Add Order"
            onClick={() => setOpenOrderAdd(true)}
          />
        </Box>

        <LoadingBackdrop open={loading} />
      </Box>
    </div>
  );
};

export default Orders;
