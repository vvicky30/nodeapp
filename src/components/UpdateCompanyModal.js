import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container } from "@mui/system";
import { updateCompanyDetail } from "../api/companyApi";
import { Grid, TextField } from "@mui/material";
import StyledButton from "./StyledButton";
import styled from "@emotion/styled";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 'auto',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  gap: '20px',
  marginBottom: "40px"
}));

export default function CompanyModal({ open, setOpen, companyId, companyData, setCompanyData,setLoading }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      "Company_ID": companyData?.Company_ID,
      "Company_Name": companyData?.Company_Name,
      "Headquarters": companyData?.Headquarters,
      "Phone": companyData?.Phone,
      "Website": companyData?.Website,
      "Employees": companyData?.Employees,
      "Stock_Symbol": companyData?.Stock_Symbol,
      "Ticker": companyData?.Ticker,
      "Revenue": companyData?.Revenue,
      "Siccode": companyData?.Siccode,
      "Naicscode": companyData?.Naicscode,
      "Description": companyData?.Description,
      "Industry": companyData?.Industry,
      "Company_url": companyData?.Company_url,
      "Company_Logo_URL": companyData?.Company_Logo_URL
    };
    const token = localStorage.getItem("authToken");
    const res = await updateCompanyDetail(token, companyId, data);
    if (res) {
      if (res.status === 400) {
        alert("Something went wrong!")
      }
      if (res.status === 200) {
        setOpen(false);
        setLoading(true);
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
    setCompanyData("");
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ textAlign: 'center', mb: 4 }} variant="h6" component="h2">
            Update Company Details
          </Typography>
          <Container>
            <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
              <StyledGrid>
                <TextField
                  variant="standard"
                  fullWidth
                  disabled
                  type="text"
                  placeholder="Company ID"
                  name="Company_ID"
                  value={companyData.Company_ID}
                  onChange={handleChange}
                />
                <TextField
                  variant="standard"
                  fullWidth
                  type="text"
                  placeholder="Company Name"
                  name="Company_Name"
                  value={companyData.Company_Name}
                  onChange={handleChange}
                />
                <TextField
                  variant="standard"
                  fullWidth
                  type="text"
                  placeholder="Phone"
                  name="Phone"
                  value={companyData.Phone}
                  onChange={handleChange}
                />
              </StyledGrid>
              <StyledGrid>
                <TextField
                  variant="standard"
                  fullWidth
                  type="text"
                  placeholder="Industry"
                  name="Industry"
                  value={companyData.Industry}
                  onChange={handleChange}
                />
                <TextField
                  variant="standard"
                  fullWidth
                  type="text"
                  placeholder="Employees"
                  name="Employees"
                  value={companyData.Employees}
                  onChange={handleChange}
                />
                <TextField
                  variant="standard"
                  fullWidth
                  type="text"
                  placeholder="Revenue"
                  name="Revenue"
                  value={companyData.Revenue}
                  onChange={handleChange}
                />
              </StyledGrid>
              <StyledGrid>
                <TextField
                  variant="standard"
                  fullWidth
                  type="text"
                  placeholder="Stock Symbol"
                  name="Stock_Symbol"
                  value={companyData.Stock_Symbol}
                  onChange={handleChange}
                />
                <TextField
                  variant="standard"
                  fullWidth
                  type="text"
                  placeholder="Ticker"
                  name="Ticker"
                  value={companyData.Ticker}
                  onChange={handleChange}
                />
                <TextField
                  variant="standard"
                  fullWidth
                  type="text"
                  placeholder="Siccode"
                  name="Siccode"
                  value={companyData.Siccode}
                  onChange={handleChange}
                />
              </StyledGrid>
              <StyledGrid>
                <TextField
                  variant="standard"
                  fullWidth
                  type="text"
                  placeholder="Naicscode"
                  name="Naicscode"
                  value={companyData.Naicscode}
                  onChange={handleChange}
                />
                <TextField
                  variant="standard"
                  fullWidth
                  type="text"
                  placeholder="Website"
                  name="Website"
                  value={companyData.Website}
                  onChange={handleChange}
                />
                <TextField
                  variant="standard"
                  fullWidth
                  type="text"
                  placeholder="Headquarters"
                  name="Headquarters"
                  value={companyData.Headquarters}
                  onChange={handleChange}
                />
              </StyledGrid>
              <StyledGrid>
                <TextField

                  variant="standard"
                  fullWidth
                  type="text"
                  placeholder="Company url"
                  name="Company_url"
                  value={companyData.Company_url}
                  onChange={handleChange}
                />
                <TextField
                  variant="standard"
                  fullWidth
                  type="text"
                  placeholder="Company Logo URL"
                  name="Company_Logo_URL"
                  value={companyData.Company_Logo_URL}
                  onChange={handleChange}
                />
              </StyledGrid>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                maxRows={3}
                type="text"
                placeholder="About Company"
                name="Description"
                value={companyData.Description}
                onChange={handleChange}
              />
              <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 5 }}>
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
                  type="submit"
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
