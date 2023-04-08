import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container, Grid, MenuItem, Select, TextField } from "@mui/material";
import StyledButton from "./StyledButton";
import { updateUserDetail } from "../api/userApi";
import { getRoles } from "../api/roleApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UserModal({
  open,
  setOpen,
  userId,
  formData,
  setFormData,
}) {
  const [roles, setRoles] = React.useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userdata = {
      first_name: formData?.first_name,
      last_name: formData?.last_name,
      company: formData?.company,
    };
    const roleId = formData?.role;
    const token = localStorage.getItem("authToken");
    const res = await updateUserDetail(token, userId, roleId, userdata);
    if (res) {
      if (res.status === 400) {
        alert("Something went wrong!");
      }
      if (res.status === 200) {
        setOpen(false);
      }
    }
  };
  React.useEffect(() => {
    const handleApi = async () => {
      const token = localStorage.getItem("authToken");
      const res = await getRoles(token);
      if (res) {
        if (res?.status === 200) {
          setRoles(res?.data);
        } else {
          alert("Something went wrong!");
        }
      }
    };
    handleApi();
  }, []);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ textAlign: "center", mb: 4 }}
            variant="h6"
            component="h2"
          >
            Update User Detail
          </Typography>
          <Container>
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
                onChange={handleChange}
              />
              <TextField
                variant="standard"
                sx={{ mt: 1, mb: 2 }}
                fullWidth
                required
                type="text"
                placeholder="company name*"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
              <Grid>
                <div>Change Role :</div>
                <Select
                  value={formData?.role}
                  defaultValue={formData?.role?.role_name}
                  name="role"
                  onChange={handleChange}
                >
                  {roles.map((role) => (
                    <MenuItem value={role?.role_id}>{role?.role_name}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
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
                  handleClick={() => setOpen(false)}
                />
              </Grid>
            </form>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
