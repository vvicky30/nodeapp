import { Checkbox, Chip, Grid, Link, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import React, { useState } from "react";
import styled from "@emotion/styled";
import CompanyModal from "../../components/companyModalFile/CompanyModal";

const Card = styled(Grid)(({ theme }) => ({
  color: "#3c3c3c",
  padding: "15px",
  margin: "6px -2px",
  display: "flex",
  gap: 5,
  border: "0.5px solid #fff",
  borderRadius: "5px",
  boxShadow: " 0 -1px 3px 1px #D7DBDD",
  background: "#fff",
  width: "100%",
  minWidth: 600,
}));
const GridWraper = styled(Grid)(({ theme }) => ({
  display: "flex",
  gap: "50px",
  alignItems: "center",
  justifyContent:'space-between',
  fontWeight: 700,
}));
const ListCard = ({ company }) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Card>
      <CompanyModal open={open} setOpen={setOpen} companyDetail={company} />
      <Checkbox
        sx={{ height: "40px" }}
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Grid sx={{width:'100%'}} onClick={() => setOpen(true)}>
        <GridWraper>
          <Typography variant="h6" sx={{ color: "#0b568f", fontWeight: 700 }}>
            {company?.Company_Name}
          </Typography>
          <Grid>
          <Chip label={`Employees ${company?.Employees}`} />
          <span>
            <span
              style={{
                fontWeight: "400",
                fontSize: "13px",
                  marginRight: "5px",
                  marginLeft:'20px'
              }}
            >
              Country
            </span>
            <Chip label={company?.Country} />
          </span>
          </Grid>
        </GridWraper>
        <Link
          href={`http://${company?.Website}`}
          target="_blank"
          underline="none"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
        >
          {company?.Website}
          <OpenInNewIcon fontSize="3px" />
        </Link>
        <p
          style={{
            fontSize: "15px",
            lineHeight: "1.2em",
            fontHeight: "500",
          }}
        >
          {company && company?.Description?.length > 50
            ? `${company?.Description?.slice(0, 240) + "..."}`
            : company?.Description}
        </p>
      </Grid>
    </Card>
  );
};

export default ListCard;
