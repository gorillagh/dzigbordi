import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = (props) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <div>
      <Typography>Menu {props.user.name}</Typography>
    </div>
  );
};

export default Menu;
