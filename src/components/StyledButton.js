import { Button } from "@mui/material";
import React from "react";

const StyledButton = ({ label,type, backgroundColor, textColor,fWidth, handleClick,mt }) => {
  return (
    <Button
      type={type}
      fullWidth={fWidth}
      variant="outlined"
      style={{
        borderColor: "#D7DBDD",
        textTransform: "none",
        background: `${backgroundColor}`,
        color: `${textColor}`,
        marginTop: `${mt}`
      }}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};

export default StyledButton;
