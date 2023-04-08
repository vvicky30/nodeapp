import React from "react";
import { useState } from "react";
import {
  TextField,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import styled from "@emotion/styled";
import StyledButton from "../../components/StyledButton";
import { forgotPasswordApi } from "../../api/authApi";

export const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginTop: "5rem",
}));

export const ForgotPassword = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await forgotPasswordApi(email);
    if (res) {
      if (res.status === 400) {
        setData(res?.data);
        setOpen(true);
      }
      if (res.status === 200) {
        setData(res?.data);
        setOpen(true);
        setEmail("");
      }
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <StyledTypography variant="h4">Forgot Password</StyledTypography>
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ mb: 8, mt: 8 }}
            fullWidth
            required
            type="email"
            variant="outlined"
            placeholder="Email address"
            label="user@example.com"
            value={email}
            onChange={handleEmailChange}
          />
          <StyledButton
            fWidth={true}
            label="Send"
            backgroundColor="#00a3d0"
            textColor="#fff"
            type="submit"
          />
        </form>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          {data?.msg === "Email is not register Please register" ? (
            <Alert severity="error">Unregistered email!</Alert>
          ) : (
            <Alert severity="success">Request sent.</Alert>
          )}
        </Snackbar>
      </Container>
    </>
  );
};
