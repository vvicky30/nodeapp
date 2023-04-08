import React, { useEffect, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import "./NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { validateToken } from "../../../api/adminApi";
import Signup from "../../../container/SignupPage";
import LoadingBackdrop from "../../Loader/LoadingBackDrop";

const NotFound = () => {
  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [emailId, setEmailId] = useState("");
  useEffect(() => {
    setLoading(true);
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    validateToken(params.token)
      .then((res) => {
        if (res.status === 200) {
          setEmailId(res?.data?.email);
          setIsValidToken(true);
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

  return (
    <div>
      <LoadingBackdrop open={loading} />
      {isValidToken ? (
        <div>
          <Signup emailId={emailId}/>
        </div>
      ) : errorMessage ? (
        <div className="PageNotFound">
          <ErrorIcon />
          <Typography>Invalid token, please contact to admin! </Typography>
          <Link to="/admin/dashboard">Back</Link>
        </div>
      ) : null}
    </div>
  );
};

export default NotFound;
