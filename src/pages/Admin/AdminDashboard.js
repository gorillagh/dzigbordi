import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";

const briefSkeletons = [1, 2, 3, 4];

const AdminDashboard = (props) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <div>
      <Typography>HEllo {props.user.name}</Typography>
    </div>
  );
};

export default AdminDashboard;
