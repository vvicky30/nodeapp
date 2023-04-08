import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
  Box,
  Grid,
  InputBase,
  Slider,
  Popover,
  Checkbox,
  Autocomplete,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneIcon from "@mui/icons-material/Done";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {
  getLocationApi,
  getOperationModel,
  operatingModelApi,
} from "../../api/searchApi";
import MultiTermSearch from "../../components/MultiTermSearch";

const PaperWraper = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 320,
  height: "100vh",
  maxHeight: 500,
  bgcolor: "background.paper",
  position: "fixed",
  overflowY: "scroll",
}));
const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  alignItems: "center",
  display: "flex",
  gap: "8px",
}));
const GridWraper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  borderBottom: "1px solid #d7dbdd",
  position: "sticky",
  top: 0,
  zIndex: "1",
  background: "#fff",
}));
const Search = styled("div")(({ theme }) => ({
  borderRadius: "4px",
  border: "0.5px solid #D7DBDD",
  backgroundColor: "#F2F3F4",
  display: "flex",
  alignItems: "center",
  width: "278px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: "3px 3px 3px 6px",
  height: "100%",
  pointerEvents: "none",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: "3px 3px 3px 6px",
    paddingLeft: `8px`,
    maxWidth: "100%",
  },
}));
const popupStyle = {
  display: "flex",
  gap: 4,
  alignItems: "center",
  height: "20px",
  marginTop: "10px",
  cursor: "pointer",
};
const InputBox = styled(InputBase)(({ theme }) => ({
  border: "0.5px solid #D7DBDD",
  backgroundColor: "#F2F3F4",
  borderRadius: "5px",
  "& .css-yz9k0d-MuiInputBase-input": {
    textAlign: "center !mportant",
  },
}));
const SizeFilterBox = styled(Grid)(({ theme }) => ({
  display: "flex",
  gap: "5px",
  alignItems: "center",
}));
const ListItem = styled("span")(({ theme }) => ({
  fontWeight: "600",
  color: "#909497",
  fontFamily: "Ubuntu,sans-serif",
  fontSize: "12px",
}));

export default function FilterSection({
  handleFilterChange,
  page,
  setPage,
  rowsPerPage,
  query,
  setLoading,
}) {
  const token = localStorage.getItem("authToken");
  const [revenue, setRevenue] = useState([0, 5000000]);
  const [employee, setEmployee] = useState([0, 100000]);
  const [location, setLocation] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [operationModel, setOperationModel] = useState();
  const [excludeOperationModel, setexcludeOperationModel] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElxclude, setAnchorExclude] = useState(null);
  const [includeIndustry, setIncludeIndustry] = useState("");
  const [excludeIndustry, setExcludeIndustry] = useState("");
  const [selectedIncludeIndustry, setSelectedIncludeIndustry] = useState([]);
  const [selectedExcludeIndustry, setSelectedExcludeIndustry] = useState([]);
  const [includeTerm, setIncludeTerm] = useState([]);
  const [excludeTerm, setExcludeTerm] = useState([]);
  const [clear, setClear] = useState(false);
  const [revenueRange, setRevenueRange] = useState([0, 5000000]);
  const [employeeRange, setEmployeeRange] = useState([0, 100000]);

  const locationData =
    locationList && locationList?.map((location) => location?.key);

  const operationModelData =
    operationModel &&
    operationModel?.map((data) => {
      if (data?.key) {
        return data?.key;
      } else {
        return data?._source?.Industry;
      }
    });

  const handleOperationModel = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOperationModelExclude = (event) => {
    setAnchorExclude(event.currentTarget);
  };
  const handleIncludeIndustry = async (event) => {
    setIncludeIndustry(event.target.value);
    const res = await operatingModelApi(token, event.target.value);
    if (res) {
      if (res.status === 200) {
        setOperationModel(res?.data);
      }
    }
    setClear(false);
  };
  const handleIncludeCkecked = async (ckeckedItem) => {
    const index = selectedIncludeIndustry.indexOf(ckeckedItem);
    if (index === -1) {
      setSelectedIncludeIndustry([...selectedIncludeIndustry, ckeckedItem]);
    } else {
      setSelectedIncludeIndustry(
        selectedIncludeIndustry.filter(
          (selectedItem) => selectedItem !== ckeckedItem
        )
      );
    }
    setPage(0);
  };

  const handleExcludeCkecked = async (item) => {
    const index = selectedExcludeIndustry.indexOf(item);
    if (index === -1) {
      setSelectedExcludeIndustry([...selectedExcludeIndustry, item]);
    } else {
      setSelectedExcludeIndustry(
        selectedExcludeIndustry.filter((selectedItem) => selectedItem !== item)
      );
    }
    setPage(0);
  };

  const handleExcludeIndustry = async (event) => {
    setExcludeIndustry(event.target.value);
    const res = await operatingModelApi(token, event.target.value);
    if (res) {
      if (res.status === 200) {
        setexcludeOperationModel(res?.data);
      }
    }
    setClear(false);
  };

  useEffect(() => {
    try {
      getLocationApi(token).then((res) => {
        setLocationList(res?.data);
      });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSelectLocation = (event, newValue) => {
    setLocation(newValue);
    setPage(0);
  };
  const handleRevenue = (event, newValue) => {
    setRevenue(newValue);
  };
  const handleEmployee = (event, newValue) => {
    setEmployee(newValue);
  };
  const handleSearchClose = () => {
    setAnchorEl(null);
  };
  const handleExcludeClose = () => {
    setAnchorExclude(null);
  };
  function valuetext(value) {
    return `$${value.toLocaleString()}`;
  }
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const openExclude = Boolean(anchorElxclude);
  const idExclude = openExclude ? "simple-popover" : undefined;

  function valueLableFormat(value) {
    return `${value.toLocaleString()}`;
  }

  useEffect(() => {
    try {
      getOperationModel(token).then((res) => {
        setOperationModel(res?.data);
        setexcludeOperationModel(res?.data);
      });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clear]);

  const excludeOperationModelData =
    excludeOperationModel &&
    excludeOperationModel?.map((data) => {
      if (data?.key) {
        return data?.key;
      } else {
        return data?._source?.Industry;
      }
    });

  useEffect(() => {
    setLoading(true);
    handleFilterChange(
      location,
      includeTerm,
      excludeTerm,
      revenueRange,
      employeeRange,
      selectedIncludeIndustry,
      selectedExcludeIndustry
      // query
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    location,
    includeTerm,
    excludeTerm,
    revenueRange,
    employeeRange,
    selectedIncludeIndustry,
    selectedExcludeIndustry,
    // query,
    page,
    rowsPerPage,
  ]);

  function handleRevenueRange() {
    setRevenueRange(revenue);
  }
  function handleEmployeeRange() {
    setEmployeeRange(employee);
  }
  return (
    <PaperWraper elevation={3}>
      <List
        component="nav"
        subheader={
          <GridWraper>
            <Typography variant="h6">Filters</Typography>
            <MoreVertIcon />
          </GridWraper>
        }
      >
        <Box>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <StyledTypography>
                TERMS{" "}
                {includeTerm?.length || excludeTerm?.length ? (
                  <DoneIcon sx={{color:'#2196f3'}}/>
                ) : null}
              </StyledTypography>
            </AccordionSummary>
            <AccordionDetails>
              <p>Include these terms</p>
              <MultiTermSearch
                value={includeTerm}
                setValue={setIncludeTerm}
                setPage={setPage}
                query={query}
              />
              <p>Exclude these terms</p>
              <MultiTermSearch
                value={excludeTerm}
                setValue={setExcludeTerm}
                setPage={setPage}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <StyledTypography>
                OPERATING MODEL{" "}
                {selectedIncludeIndustry?.length ||
                selectedExcludeIndustry?.length ? (
                    <DoneIcon sx={{color:'#2196f3'}}/>
                ) : null}
              </StyledTypography>
            </AccordionSummary>
            <AccordionDetails>
              <span>Industry</span>
              <p>Include</p>
              <Search onClick={handleOperationModel}>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "#00a3d0" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                  disabled
                />
              </Search>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleSearchClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box sx={{ p: 3, width: 500, height: 300 }}>
                  <span>Industry include</span>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon sx={{ color: "#00a3d0" }} />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search classification"
                      inputProps={{ "aria-label": "search" }}
                      value={includeIndustry}
                      onChange={handleIncludeIndustry}
                    />
                    <ClearIcon
                      fontSize="2px"
                      onClick={() => {
                        setIncludeIndustry("");
                        setClear(true);
                      }}
                    />
                  </Search>
                  {operationModelData?.map((item, key) => {
                    return (
                      <div style={popupStyle}>
                        <Checkbox
                          key={item}
                          checked={
                            selectedIncludeIndustry.includes(item)
                              ? true
                              : false
                          }
                          value={selectedIncludeIndustry}
                          onClick={() => handleIncludeCkecked(item)}
                        />
                        <ListItem key={key}>{item}</ListItem>
                      </div>
                    );
                  })}
                </Box>
              </Popover>
              <p>Exclude</p>
              <Search onClick={handleOperationModelExclude}>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "#00a3d0" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                  disabled
                />
              </Search>
              <Popover
                id={idExclude}
                open={openExclude}
                anchorEl={anchorElxclude}
                onClose={handleExcludeClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box sx={{ p: 3, width: 500, height: 300 }}>
                  <span>Industry exclude</span>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon sx={{ color: "#00a3d0" }} />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search classification"
                      inputProps={{ "aria-label": "search" }}
                      value={excludeIndustry}
                      onChange={handleExcludeIndustry}
                    />
                    <ClearIcon
                      fontSize="2px"
                      onClick={() => {
                        setExcludeIndustry("");
                        setClear(true);
                      }}
                    />
                  </Search>
                  {excludeOperationModelData?.map((item, key) => {
                    return (
                      <div style={popupStyle}>
                        <Checkbox
                          key={item}
                          checked={
                            selectedExcludeIndustry.includes(item)
                              ? true
                              : false
                          }
                          value={selectedExcludeIndustry}
                          onClick={() => handleExcludeCkecked(item)}
                        />
                        <ListItem key={key}>{item}</ListItem>
                      </div>
                    );
                  })}
                </Box>
              </Popover>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>LOCATION</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Autocomplete
                multiple
                id="tags-outlined"
                value={location}
                onChange={handleSelectLocation}
                options={locationData}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select" />
                )}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>SIZE</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>Revenue</p>
              <SizeFilterBox>
                <span>Min</span>
                <InputBox defaultValue={"$0"} />-<span>Max</span>
                <InputBox defaultValue={"$ 5 Million"} />
              </SizeFilterBox>
              <Box>
                <Slider
                  min={0}
                  max={5000000}
                  step={1000}
                  value={revenue}
                  onChange={handleRevenue}
                  valueLabelDisplay="auto"
                  valueLabelFormat={valuetext}
                  onMouseLeave={handleRevenueRange}
                />
              </Box>
              <p>Employee</p>
              <SizeFilterBox>
                <span>Min</span>
                <InputBox defaultValue={"0"} />-<span>Max</span>
                <InputBox defaultValue={"100,000+"} />
              </SizeFilterBox>
              <Box>
                <Slider
                  min={0}
                  step={100}
                  max={100000}
                  value={employee}
                  onChange={handleEmployee}
                  valueLabelDisplay="auto"
                  valueLabelFormat={valueLableFormat}
                  onMouseLeave={handleEmployeeRange}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </List>
    </PaperWraper>
  );
}
