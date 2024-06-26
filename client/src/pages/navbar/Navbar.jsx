import React, { useState } from 'react'
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  Home,
} from '@mui/icons-material';
import FlexBetween from 'components/FlexBetween';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from 'states/state';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const theme = useTheme();
  const neutrallight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  const fullName = user ? `${user.firstName} ${user.lastName}` : "Account";

  const handleClick = () => {
    navigate("/home");
  };


  return <FlexBetween padding="1rem 6%" background={alt}>
    <FlexBetween gap="1.75rem">
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem,2rem,2.25rem)"
        color="primary"
        onClick={() => navigate("/home")}
        sx={{
          "&:hover": {
            color: "violet",
            cursor: "pointer"
          }
        }}
      >
        ShareBurst
      </Typography>
      {isNonMobileScreens && (
        <FlexBetween backgroundColor={neutrallight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
          <InputBase placeholder='search...' />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween>
      )}
    </FlexBetween>



    {/* DESKTOP NAV */}
    {isNonMobileScreens ? (
      <FlexBetween gap="2rem">
        <IconButton>
        <Home sx={{ fontSize: "25px" }} onClick={handleClick} />
        </IconButton>
        <IconButton onClick={() => dispatch(setMode())}>
          {
            theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px",color:"white" }}/>
            ) : (
              <LightMode sx={{ color: "dark", fontSize: "25px" }} />
            )
          }
        </IconButton>
        <Message sx={{ fontSize: "25px" }} />
        <Notifications sx={{ fontSize: "25px" }} />
        <Help sx={{ fontSize: "25px" }} />
        <FormControl variant='standard' value="fullName" >

          <Select
            value={fullName}
            sx={{
              backgroundColor: neutrallight,
              width: "150px",
              borderRadius: "0.25rem",
              p: "0.25rem 1rem",
              "& .MuiSvgIcon-root": {
                pr: "0.25rem",
                width: "3rem",
              },
              "& .MuiSelect-select:focus": {
                backgroundColor: neutrallight,
              },
            }}
            input={<InputBase />}
          >
            <MenuItem value={fullName}>
              <Typography>{fullName}</Typography>
            </MenuItem>
            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
          </Select>
        </FormControl>
      </FlexBetween>
    ) : (
      <IconButton
        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
      >
        <Menu />
      </IconButton>
    )}



    {/* MOBILE NAV */}
    {!isNonMobileScreens && isMobileMenuToggled && (
      <Box
        position="fixed"
        right="0"
        bottom="0"
        height="100%"
        zIndex="10"
        maxWidth="500px"
        minWidth="300px"
        backgroundColor={background}
      >
        {/* CLOSE ICON */}
        <Box display="flex" justifyContent="flex-end" p="1rem">
          <Home sx={{ fontSize: "25px" }} onClick={handleClick} />
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Close />
          </IconButton>
        </Box>



        {/* MENU ITEMS */}
        <FlexBetween
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="3rem"
        >
         <Home sx={{ fontSize: "25px" }} onClick={handleClick} />
          <IconButton
            onClick={() => dispatch(setMode())}
            sx={{ fontSize: "25px" }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutrallight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutrallight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      </Box>
    )}

  </FlexBetween>
}

export default Navbar;