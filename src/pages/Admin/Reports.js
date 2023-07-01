import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const Reports = (props) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <div>
      <Typography>Reports {props.user.name}</Typography>
    </div>
  );
};

export default Reports;
