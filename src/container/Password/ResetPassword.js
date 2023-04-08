import React, { useEffect } from "react";
import { useState } from "react";
import {
  TextField,
  Typography,
  Container,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import StyledButton from "../../components/StyledButton";
import { changePasswordApi } from "../../api/authApi";
import { validateToken } from "../../api/adminApi";
import ErrorIcon from "@mui/icons-material/Error";
import LoadingBackdrop from "../../components/Loader/LoadingBackDrop";
import {
  validateConfirmPassword,
  validatePassword,
} from "../../helper/validation";
import { ErrorMessage } from "../SignupPage";

export const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginTop: "5rem",
}));

const ResetPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState();
  const [errorMessage, setErrorMessage] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "",
  });
  const LoginFormData = [
    {
      type: "password",
      name: "password",
      placeholder: "New Password*",
      error: `${formErrors.password?.length ? formErrors.password : ""}`,
    },
    {
      type: "password",
      name: "confirmPassword",
      placeholder: "Confirm Password*",
      error: `${
        formErrors.confirmPassword?.length ? formErrors.confirmPassword : ""
      }`,
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    const errors = {
      password: name === "password" && validatePassword(value),
      confirmPassword:
        name === "confirmPassword" &&
        validateConfirmPassword(inputs.password, value),
    };
    setFormErrors({ ...formErrors, ...errors });
    setInputs({ ...inputs, [name]: value });
  };
  useEffect(() => {
    setLoading(true);
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    validateToken(params.token)
      .then((res) => {
        if (res.status === 200) {
          setIsValidToken(true);
          setUserId(res?.data?.user);
          setLoading(false);
        } else if (res.status === 400) {
          setLoading(false);
          setErrorMessage(true);
        } else {
          setLoading(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: userId,
      password: inputs.password,
    };
    const { password, confirmPassword } = inputs;
    const errors = {
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
    };
    setFormErrors(errors);
    const res = await changePasswordApi(data);
    if (res) {
      if (res.status === 400) {
        setData(res?.data);
        setOpen(true);
      }
      if (res.status === 200) {
        setData(res?.data);
        setOpen(true);
        setInputs({
          password: "",
          confirmPassword: "",
        });
        navigate("/");
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
    <div>
      <LoadingBackdrop open={loading} />
      {isValidToken ? (
        <div>
          <StyledTypography variant="h4">Reset Password</StyledTypography>
          <Container maxWidth="xs">
            <form onSubmit={handleSubmit} style={{ marginTop: "80px" }}>
              {LoginFormData?.map((item, i) => {
                const { name, type, placeholder } = item;
                const value = inputs?.[name];
                return (
                  <>
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
                    <ErrorMessage>{item?.error}</ErrorMessage>
                  </>
                );
              })}
              <StyledButton
                fWidth={true}
                label="Reset"
                backgroundColor="#00a3d0"
                textColor="#fff"
                type="submit"
              />
            </form>
            <StyledButton
              mt={"5px"}
              fWidth={true}
              label="Cancel"
              backgroundColor="#000"
              textColor="#fff"
              type="submit"
            />
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
              {data?.msg === "Password updated Please login" ? (
                <Alert severity="success">Password reset successful.</Alert>
              ) : (
                <Alert severity="error">Fail to reset</Alert>
              )}
            </Snackbar>
          </Container>
        </div>
      ) : errorMessage ? (
        <div className="PageNotFound">
          <ErrorIcon />
          <Typography>Invalid token, please contact to admin! </Typography>
          <Link to="/password/forget">Back</Link>
        </div>
      ) : null}
    </div>
  );
};
export default ResetPassword;
