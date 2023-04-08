import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import StyledButton from "./StyledButton";
import { Grid } from "@mui/material";

export default function DeletePopover({ anchorEl, setAnchorEl, handleDelete }) {
  const handleClose = () => {
    setAnchorEl(false);
  };

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Popover
        // id={id}
        open={anchorEl}
        // anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography sx={{ p: 2 }}>
          Are you sure !.You want to delete.
        </Typography>
        <Grid sx={{ display: "flex", justifyContent: "space-evenly", mb: 2 }}>
          <StyledButton
            label="Yes"
            backgroundColor="red"
            textColor="#fff"
            handleClick={handleDelete}
          />
          <StyledButton label="No" textColor="#000" handleClick={handleClose} />
        </Grid>
      </Popover>
    </div>
  );
}
