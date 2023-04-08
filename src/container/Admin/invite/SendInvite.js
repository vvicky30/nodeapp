import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Paper,
  TextField,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import StyledButton from "../../../components/StyledButton";
import { sendMail } from "../../../api/adminApi";
import MainLayout from "../../../components/layouts/MainLayout";

export const DashboardPaper = styled(Paper)`
  width: 70%;
  height: auto;
  min-height: 400px;
  padding: 20px;
  margin: 100px auto;
  margin-top: 120px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const FormContainer = styled(Container)`
  margin-top: "6px";
`;

const SendInvite = () => {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShow(false);
  };

  const handleSendInvite = async (e) => {
    e.preventDefault();
    // Send API request to send email invite
    console.log("Sending invite to: ", email);
    try {
      const res = await sendMail(email);
      if (res.status === 200) {
        setShow(true);
        setEmail("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <DashboardPaper>
        <FormContainer maxWidth="xs">
          <Typography variant="h4" fontWeight={500}>Send Invite to User</Typography>
          <form onSubmit={handleSendInvite}>
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
              label="Send invite  "
              backgroundColor="#00a3d0"
              textColor="#fff"
              type="submit"
            />
          </form>
        </FormContainer>
      </DashboardPaper>
      {show && (
        <Snackbar open={show} autoHideDuration={4000} onClose={handleClose}>
          <Alert severity="success">Invite sent.</Alert>
        </Snackbar>
      )}
    </MainLayout>
  );
};

export default SendInvite;
