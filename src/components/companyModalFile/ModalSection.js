import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Card, Typography, Tabs, Tab, Chip } from "@mui/material";
import { BoxWraper } from "./ModalSideBar";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ModalSection({companyDetail}) {
  const [value, setValue] = useState(0);
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid sx={{ padding: "10px", width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Financials" {...a11yProps(1)} />
          <Tab label="Executives" {...a11yProps(2)} />
          <Tab label="Conferences" {...a11yProps(2)} />
          <Tab label="Feed" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight={600}>
              Description
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {isReadMore
                ? `${companyDetail?.Description?.slice(0, 250) + "..."}`
                : companyDetail?.Description}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#00a3d0", mt: 3 }}
              onClick={toggleReadMore}
            >
              {isReadMore
                ? companyDetail?.Description?.length > 80
                  ? "View Full Description"
                  : ""
                : " Show Less"}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight={600}>
              Sizing
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <span>Employees</span>
              <Typography variant="h5" fontWeight={600}>
                {companyDetail?.Employees}
              </Typography>
            </Box>
            <Box>
              <span>Revenue</span>
              <Typography variant="h5" fontWeight={600}>
                $ {companyDetail?.Revenue}
              </Typography>
            </Box>
            <Box>
              <span>Website Visits</span>
              <Typography variant="h5" fontWeight={600}>
                15.1K
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight={600}>
              Revenue
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 4 }}>
              <span>Revenue Estimate</span>
              <Typography variant="h5" fontWeight={600}>
                $ {companyDetail.Revenue}
                <span
                  style={{
                    color: "#909497",
                    fontSize: "20px",
                    paddingLeft: "5px",
                  }}
                >
                  / yr <span>Medium Confidence</span>
                </span>
              </Typography>
            </Box>
            <Box>
              <span>Estimated Revenue Per Employee</span>
              <Typography variant="h5" fontWeight={600}>
                $ 69K{" "}
                <span
                  style={{
                    color: "#909497",
                    fontSize: "20px",
                    paddingLeft: "5px",
                  }}
                >
                  / yr
                </span>
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Card variant="outlined">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Grid>
                <AccountCircleIcon sx={{ color: "#909497" }} />
                <Typography fontWeight={600}>Don Manhard</Typography>
                <span>President,CEO, President/CEO</span>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <BoxWraper>
                <p>Location</p>
                <p>{companyDetail.Country}</p>
              </BoxWraper>
              <BoxWraper>
                <p>Department</p>
                <p>Executive</p>
              </BoxWraper>
              <BoxWraper>
                <p>Age</p>
                <p>60</p>
              </BoxWraper>
              <BoxWraper>
                <p>Education</p>
                <p style={{width: '421px'}}>
                  University of Illinois at Urbana-Champaign 1978-1982Bachelor
                  of Applied Science (B.A.Sc.), Civil Engineering, Undergraduate
                </p>
              </BoxWraper>
            </AccordionDetails>
          </Accordion>
        </Card>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Box sx={{ textAlign: "center", color: "#909497" }}>
          <CalendarMonthIcon />
          <p>No Conferences or trade shows found for this company.</p>
          <span style={{ color: "#00a3d0" }}>View all events</span>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Typography
          variant="h2"
          fontWeight={700}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {companyDetail?.Employees}
          <Chip
            label="company size"
            sx={{ bgcolor: "#00a3d0", color: "#fff" }}
          />
        </Typography>
        <Typography fontWeight={600}>Total Employee</Typography>
      </TabPanel>
    </Grid>
  );
}
