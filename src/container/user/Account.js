import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Container, Grid, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import StyledButton from "../../components/StyledButton";
import { getUserDetailApi, updateUserDetailApi } from "../../api/userApi";

export const BreadcrumbsWrapper = styled(Breadcrumbs)(({ theme }) => ({
  margin: "30px 0 30px 0",
  background: "#F2F3F4",
  padding: "20px",
}));
const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  gap: '20px',
  marginBottom: "40px"
}));
export default function AccountPage() {
  const token = localStorage.getItem("authToken");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userdata = {
      first_name: formData?.first_name,
      last_name: formData?.last_name,
      email: formData?.email,
      company: formData?.company,
    };
    const res = await updateUserDetailApi(token, userdata);
    if (res) {
      if (res.status === 400) {
        alert("Something went wrong!")
      }
      if (res.status === 200) {
        alert("successfully updated.")
      }
    }
  };
  useEffect(() => {
    // setLoading(true);
    const handleApi = async () => {
      const res = await getUserDetailApi(token);
      if (res) {
        if (res?.status === 200) {
          setFormData(res?.data);
        } else {
          // setLoading(true);
        }
      }
    };
    handleApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <BreadcrumbsWrapper>
        <Typography color="text.primary">User</Typography>
        <Typography color="text.primary">Profile</Typography>
      </BreadcrumbsWrapper>
        <Container maxWidth="xs">
          <Typography sx={{ textAlign: 'center', mb: 4 }} variant="h6" component="h2">
            Update User Profile
          </Typography>
          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <StyledGrid>
              <TextField
                required
                variant="standard"
                fullWidth
                type="text"
                placeholder="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
              <TextField
                variant="standard"
                required
                fullWidth
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </StyledGrid>
            <StyledGrid>
              <TextField
                variant="standard"
                fullWidth
                required
                disabled
                type="text"
                placeholder="Email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </StyledGrid>
            <TextField
              variant="standard"
              sx={{ mt: 1, mb: 2 }}
              fullWidth
              required
              type="text"
              placeholder="Company Name"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
            <Grid sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 5, gap: 4
            }}
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
