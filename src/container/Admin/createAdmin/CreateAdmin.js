import React, { useState } from "react";
import StyledButton from "../../../components/StyledButton";
import {
  TextField,
  Typography,
  Container,
  Grid,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import {
  validateCompany,
  validateConfirmPassword,
  validateEmail,
  validatefirst,
  validatelast,
  validatePassword,
} from "../../../helper/validation";
import { adminSignup } from "../../../api/adminApi";
import { ErrorMessage } from "../../SignupPage";
import MainLayout from "../../../components/layouts/MainLayout";
import styled from "@emotion/styled";
import { DashboardPaper } from "../invite/SendInvite";

const StyledGrid = styled(Grid)(({ theme }) => ({
  marginBottom: "30px",
}));

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyname: "",
  });
  const [data, setData] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [open, setOpen] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const errors = {
      firstname: name === "first_name" && validatefirst(value),
      lastname: name === "last_name" && validatelast(value),
      email: name === "email" && validateEmail(value),
      password: name === "password" && validatePassword(value),
      confirmPassword:
        name === "confirmPassword" &&
        validateConfirmPassword(formData.password, value),
      company: name === "company" && validateCompany(value),
    };
    setFormErrors({ ...formErrors, ...errors });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      email,
      password,
      confirmPassword,
      companyname,
    } = formData;
    const errors = {
      firstname: validatefirst(first_name),
      lastname: validatelast(last_name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
      company: validateCompany(companyname),
    };
    setFormErrors(errors);
    const admindata = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
      company: formData.companyname,
    };
    //  API Call or dispatch action
    const res = await adminSignup(admindata);
    if (res) {
      if (res.status === 400) {
        setData(res?.data);
        setOpen(true);
      }
      if (res.status === 200) {
        setData(res?.data);
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirmPassword: "",
          companyname: "",
        });
        setOpen(true);      
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
    <MainLayout>
      <Box sx={{ ml: 11, mr: 4, mt: 14, mb: 2 }}>
        <DashboardPaper>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Create Admin
          </Typography>
          <Container maxWidth="sm">
            <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
              <Grid
                sx={{
                  display: "flex",
                  gap: 3,
                  marginBottom: "30px",
                }}
              >
                <Grid sx={{ width: "100%" }}>
                  <TextField
                    variant="standard"
                    fullWidth
                    required
                    type="text"
                    placeholder="first name*"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                  {formData.first_name?.length <= 3 ? (
                    <ErrorMessage>{formErrors.firstname}</ErrorMessage>
                  ) : null}
                </Grid>
                <Grid sx={{ width: "100%" }}>
                  <TextField
                    variant="standard"
                    fullWidth
                    required
                    type="text"
                    placeholder="last name*"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                  {formData.last_name?.length <= 3 ? (
                    <ErrorMessage>{formErrors.lastname}</ErrorMessage>
                  ) : null}
                </Grid>
              </Grid>
              <StyledGrid>
                <TextField
                  variant="standard"
                  fullWidth
                  required
                  type="text"
                  placeholder="email address*"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <ErrorMessage>{formErrors.email}</ErrorMessage>
              </StyledGrid>
              <StyledGrid>
                <TextField
                  variant="standard"
                  fullWidth
                  required
                  type="password"
                  placeholder="password*"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <ErrorMessage>{formErrors.password}</ErrorMessage>
              </StyledGrid>
              <StyledGrid>
                <TextField
                  variant="standard"
                  fullWidth
                  required
                  type="password"
                  placeholder="confirm password *"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <ErrorMessage>{formErrors.confirmPassword}</ErrorMessage>
              </StyledGrid>
              <StyledGrid>
                <TextField
                  variant="standard"
                  sx={{ mt: 1, mb: 2 }}
                  fullWidth
                  required
                  type="text"
                  placeholder="company name*"
                  name="companyname"
                  value={formData.companyname}
                  onChange={handleChange}
                />
                <ErrorMessage>{formErrors.company}</ErrorMessage>
              </StyledGrid>
              <StyledButton
                fWidth={true}
                textColor="#fff"
                backgroundColor="#000"
                label="Create"
                type="submit"
              />
            </form>
          </Container>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            {data?.message === "user created succesfully and mail send successfully" ? (
              <Alert severity="success">Admin account created successfully</Alert>
            ) : (
              <Alert severity="error">
                This email already registered! please login
              </Alert>
            )}
          </Snackbar>
        </DashboardPaper>
      </Box>
    </MainLayout>
  );
};

export default CreateAdmin;
