import React, { useState } from "react";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import StyledButton from "../../components/StyledButton";
import { updatePassword } from "../../api/userApi";
import { BreadcrumbsWrapper } from "./Account";
import {
  validateConfirmPassword,
  validatePassword,
} from "../../helper/validation";
import { ErrorMessage } from "../SignupPage";

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  marginBottom: "40px",
}));
export default function UpdatePasswordPage() {
  const token = localStorage.getItem("authToken");
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const errors = {
      new_password: name === "new_password" && validatePassword(value),
      confirm_password:
        name === "confirm_password" &&
        validateConfirmPassword(formData.new_password, value),
    };
    setFormErrors({ ...formErrors, ...errors });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userdata = {
      old_password: formData?.old_password,
      new_password: formData?.new_password,
      confirm_password: formData?.confirm_password,
    };
    const { new_password, confirm_password } = formData;
    const errors = {
      new_password: validatePassword(new_password),
      confirm_password: validateConfirmPassword(new_password, confirm_password),
    };
    setFormErrors(errors);
    const res = await updatePassword(token, userdata);
    if (res) {
      if (res.status === 400) {
        alert("Something went wrong!");
      }
      if (res.status === 200) {
        alert("successfully updated.");
        setFormData("");
      }
    }
  };

  return (
    <Box>
      <BreadcrumbsWrapper>
        <Typography color="text.primary">Change</Typography>
        <Typography color="text.primary">Password</Typography>
      </BreadcrumbsWrapper>
      <Container maxWidth="xs">
        <Typography
          sx={{ textAlign: "center", mb: 4 }}
          variant="h6"
          component="h2"
        >
          Update Password
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <StyledGrid>
            <TextField
              variant="standard"
              fullWidth
              required
              type="password"
              placeholder="Current Password"
              name="old_password"
              value={formData.old_password}
              onChange={handleChange}
            />
          </StyledGrid>
          <StyledGrid>
            <div>
              <TextField
                required
                variant="standard"
                fullWidth
                type="password"
                placeholder="New Password"
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
              />
              <ErrorMessage>{formErrors.new_password}</ErrorMessage>
            </div>
            <div>
              <TextField
                variant="standard"
                required
                fullWidth
                type="password"
                placeholder="Confirm New Password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
              />
              <ErrorMessage>{formErrors.confirm_password}</ErrorMessage>
            </div>
          </StyledGrid>
          <Grid
            sx={{ display: "flex", justifyContent: "center", mt: 17, gap: 4 }}
          >
            <StyledButton
              textColor="#fff"
              backgroundColor="#00a3d0"
              label="Update"
              type="submit"
            />
            <StyledButton
              textColor="#fff"
              backgroundColor="#000"
              label="Cancel"
              type="reset"
            />
          </Grid>
        </form>
      </Container>
    </Box>
  );
}
