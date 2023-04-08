import React, { useState } from "react";
import styled from "@emotion/styled";
import logoIcon from "../../assets/logoIcon.png";
import { useNavigate } from "react-router-dom";
import StyledButton from "../../components/StyledButton";
import { StyledTypography } from "../Login";
import { userSignup } from "../../api/authApi";
import { login } from "../../redux/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import {
  TextField,
  Typography,
  Link,
  Container,
  Box,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  validateCompany,
  validateConfirmPassword,
  validateEmail,
  validatefirst,
  validatelast,
  validatePassword,
} from "../../helper/validation";

export const BoxWraper = styled(Box)(({ theme }) => ({
  padding: "5px 20px",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
}));
export const ErrorMessage = styled("div")(({ theme }) => ({
  marginTop: "5px",
  marginBottom: "8px",
  color: "red",
  fontSize: "12px",
}));

const Signup = ({emailId}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: emailId,
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
    const userdata = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
      company: formData.companyname,
    };
    //  API Call or dispatch action
    const res = await userSignup(userdata);
    if (res) {
      if (res.status === 400) {
        setData(res?.data);
        setOpen(true);
      }
      if (res.status === 200) {
        setData(res?.data);
        setOpen(true);
        dispatch(login(res?.data));
        navigate("/lists/companies");
      } else navigate("/signup");
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
      <StyledTypography variant="h4">
        <img src={logoIcon} alt="logoIcon" width="40px" height="40px" />
        Alpha Search
      </StyledTypography>
      <Container maxWidth="xs">
        <BoxWraper>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              mt: 4,
              fontWeight: 500,
            }}
          >
            Create Account
          </Typography>
          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <Grid
              sx={{
                display: "flex",
                gap: 1,
                marginBottom: "10px",
              }}
            >
              <div>
                <TextField
                  required
                  variant="standard"
                  fullWidth
                  type="text"
                  placeholder="first name*"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                {formData.first_name?.length <= 3 ? (
                  <ErrorMessage>{formErrors.firstname}</ErrorMessage>
                ) : null}
              </div>
              <div>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  type="text"
                  placeholder="last name*"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
                {formData.last_name?.length <= 3 ? (
                  <ErrorMessage>{formErrors.lastname}</ErrorMessage>
                ) : null}
              </div>
            </Grid>
            <TextField
              variant="standard"
              fullWidth
              required
              disabled
              type="text"
              placeholder="email address*"
              name="email"
              value={formData.email}
              // onChange={handleChange}
            />
            <ErrorMessage>{formErrors.email}</ErrorMessage>
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
            <StyledButton
              fWidth={true}
              textColor="#fff"
              backgroundColor="#000"
              label="Submit"
              type="submit"
            />
            <p
              style={{
                color: "#00a3d0",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              Already have an account?
              <Link href="/" underline="none" sx={{ fontSize: "14px" }}>
                Login
              </Link>
            </p>
          </form>
        </BoxWraper>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          {data?.message === "user created succesfully" ? (
            <Alert severity="success">Account create successful</Alert>
          ) : (
            <Alert severity="error">User already present! please login</Alert>
          )}
        </Snackbar>
      </Container>
    </>
  );
};

export default Signup;
