import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import ListItem from "../ListItem";
import logoIcon from "../../assets/logoIcon.png";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth/authSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "0.5px solid #D7DBDD",
  backgroundColor: "#F2F3F4",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    maxWidth: "100%",
    width: "450px",
    [theme.breakpoints.down('lg')]: {
      width: '26ch',
    },
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "#316ded",
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  gap: "6px",
  marginRight: '20px',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

export default function Header({ search, setSearch,setPage }) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = async () => {
    const res = await logoutUser();
    if (res) {
      if (res.status === 200) {
        dispatch(logout());
        navigate("/");
      }
    }
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleAccount = () => {
    setAnchorEl(null);
    navigate("/account");
  };
  const handleChangePassword = () => {
    setAnchorEl(null);
    navigate("/change-password");
  };

  const handleSearch = (event) => {
    setInputValue(event.target.value);
    setPage(0);
  };
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      setSearch(inputValue);
      setInputValue("");
    }
  }
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleAccount}>Account</MenuItem>
      <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ background: "#fff" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between"
          }}>
          <Box sx={{ display: "flex" }}>
            <StyledTypography variant="h5">
              <img src={logoIcon}
                alt="icon"
                width="30px"
                height="30px"
              />
              Alpha Search
            </StyledTypography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "#00a3d0" }} />
              </SearchIconWrapper>
              <StyledInputBase
                value={inputValue}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                placeholder="Search a term, industry, or a specific company"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Box sx={{
            display: "flex",
            alignItems: 'center'
          }}
          >
            <ListItem />
            <IconButton size="large" onClick={handleProfileMenuOpen}>
              <PersonPinIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
