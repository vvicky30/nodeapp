import styled from "@emotion/styled";
import { Box, Grid, Link, Typography } from "@mui/material";
import React from "react";
import StyledButton from "../StyledButton";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';

export const BoxWraper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "0.5px solid #D7DBDD",
}));
const keywordLabel = [
  "commercial snow",
  "seasonal color",
  "weed control",
  "fertilization",
  "tree care",
  "pest control",
  "irrigation",
  "lawn care",
  "shrubs",
  "hardscape",
];
const ModalSideBar = ({companyDetail}) => {
  return (
    <Grid sx={{ padding: "10px", width: "100%" }}>
      <BoxWraper>
        <p>Industry</p>
        <StyledButton
          label={companyDetail.Industry}
          textColor="#909497"
        />
      </BoxWraper>
      <BoxWraper>
        <p>Ownership Status</p>
        <StyledButton label={"Investor Backed"} textColor="#909497" />
      </BoxWraper>
      <BoxWraper>
        <p>Email</p>
        <p>xyz@email.com</p>
      </BoxWraper>
      <BoxWraper>
        <p>Social</p>
        <Box display={'flex'} gap={3} color="#00a3d0">
          <LinkedInIcon />
          <TwitterIcon/>
          <FacebookIcon />
          <PinterestIcon/>
        </Box>
      </BoxWraper>
      <BoxWraper>
        <p>Phone</p>
        <p>{companyDetail.Phone}</p>
      </BoxWraper>
      <BoxWraper>
        <p>Headquarters</p>
        <p>
         {companyDetail.Headquarters}
        </p>
      </BoxWraper>
      <BoxWraper>
        <p>Executives</p>
        <Link href="#" underline="hover" color="#00a3d0">
          John Caules
        </Link>
      </BoxWraper>
      <Box>
        <Typography variant="h5" fontWeight={600} sx={{ mt: 4, mb: 3 }}>
          Keywords
        </Typography>
        <Grid sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {keywordLabel?.map((item, key) => {
            return <StyledButton key={key} label={item} textColor="#909497"/>;
          })}
        </Grid>
      </Box>
    </Grid>
  );
};

export default ModalSideBar;
