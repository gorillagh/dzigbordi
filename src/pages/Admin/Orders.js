import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const Orders = (props) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <div>
      <Typography>Orders {props.user.name}</Typography>
    </div>
  );
};

export default Orders;
