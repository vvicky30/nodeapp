import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styled from "@emotion/styled";
import logoIcon from "../../assets/logoIcon.png";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/auth/authSlice";
import { loginUser } from "../../api/authApi";
export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "#316ded",
  justifyContent: "center",
  display: "flex",
  gap: 10,
  alignItems: "center",
  background: "#fafafd",
  marginBottom: "20px",
  "&.MuiTypography-root ": {
    padding: "2rem 0",
    fontWeight: 700,
  },
}));
const LoginFormData = [
  {
    type: "text",
    name: "email",
    placeholder: "user@example.com",
  },
  {
    type: "password",
    name: "password",
    placeholder: "*******",
  },
];
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userdata = {
      email: inputs.email,
      password: inputs.password,
    };
    const res = await loginUser(userdata);
    if (res) {
      if (res.status === 400) {
        setData(res?.data);
        setOpen(true);
      }
      if (res.status === 200) {
        setData(res?.data);
        setOpen(true);
        dispatch(login(res?.data));
        if (res?.data?.role === 1) {
          navigate("/admin/send-invite");
        } else navigate("/lists/companies");
      } else navigate("/");
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
        <form onSubmit={handleSubmit} style={{ marginTop: "100px" }}>
          {LoginFormData?.map((item, i) => {
            const { name, type, placeholder } = item;
            const value = inputs?.[name];
            return (
              <TextField
                sx={{
                  mb: 2,
                  fontSize: "16px",
                }}
                variant="standard"
                key={i}
                required
                fullWidth
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleChange}
              />
            );
          })}
          <Button
            sx={{
              margin: "16px 0px",
              background: "#f0f0fa",
              color: "#909497",
            }}
            type="submit"
            fullWidth
          >
            <ArrowForwardIcon />
          </Button>
          <div>
            <Link href="/password/forgot" underline="none" sx={{ fontSize: "14px" }}>
              Forgot Password?
            </Link>
          </div>
        </form>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          {data?.message === "user logged in succesfully" ? (
            <Alert severity="success">Login successful</Alert>
          ) : data?.message === "user does not exists" ? (
            <Alert severity="error">{data?.message}</Alert>
          ) : (
            <Alert severity="error">Incorrect email/password!</Alert>
          )}
        </Snackbar>
      </Container>
    </>
  );
};

export default Login;
