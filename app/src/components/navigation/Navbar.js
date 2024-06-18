import React, { useState, useEffect } from "react";
import { styled, alpha } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Badge,
  ListItemIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../cart/CartContext';
import ComputerIcon from '@mui/icons-material/Computer';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import WatchIcon from '@mui/icons-material/Watch';
import TvIcon from '@mui/icons-material/Tv';
import MonitorIcon from '@mui/icons-material/Monitor';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  [theme.breakpoints.up('md')]: {
    width: '40ch',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const StyledInputBase = styled('input')(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create('width'),
  [theme.breakpoints.up('sm')]: {
    width: '20ch',
    '&:focus': {
      width: '30ch',
    },
  },
  border: 'none',
  outline: 'none',
  background: 'transparent',
}));

const AppNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    function handleScroll() {
      if (!mobileOpen && window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/categories');
        const sortedCategories = response.data.sort((a, b) => a.id - b.id);
        setCategories(sortedCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleLoginStatusChange = () => {
      const user = sessionStorage.getItem('user');
      setIsLoggedIn(!!user);
    };

    window.addEventListener('loginStatusChanged', handleLoginStatusChange);

    // Initial check
    handleLoginStatusChange();

    return () => {
      window.removeEventListener('loginStatusChanged', handleLoginStatusChange);
    };
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
    handleClose();
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('loginStatusChanged'));
    navigate('/');
  };

  const handleUserButtonClick = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Kategorie
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem
            button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              {category.categoryName === "Laptopy i Komputery" && <ComputerIcon />}
              {category.categoryName === "Smartfony" && <SmartphoneIcon />}
              {category.categoryName === "Tablety" && <TabletAndroidIcon />}
              {category.categoryName === "Smartwatche" && <WatchIcon />}
              {category.categoryName === "Telewizory" && <TvIcon />}
              {category.categoryName === "Monitory" && <MonitorIcon />}
            </ListItemIcon>
            <ListItemText primary={category.categoryName} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#2c3e50" }}>
        <Container>
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                mr: 2,
                display: showButton ? 'block' : 'none'
              }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <ListItemIcon sx={{ color: 'black' }}>
                    {category.categoryName === "Laptopy i Komputery" && <ComputerIcon />}
                    {category.categoryName === "Smartfony" && <SmartphoneIcon />}
                    {category.categoryName === "Tablety" && <TabletAndroidIcon />}
                    {category.categoryName === "Smartwatche" && <WatchIcon />}
                    {category.categoryName === "Telewizory" && <TvIcon />}
                    {category.categoryName === "Monitory" && <MonitorIcon />}
                  </ListItemIcon>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Menu>
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <LocalMallIcon sx={{ color: 'white', fontSize: 40, mr: 0.5 }} />
              <Typography variant="h5" sx={{ ml: 0.5 }}>
                E-Amator
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Czego szukasz?"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
              </Search>
            </Box>
            <IconButton sx={{ color: "white" }} component={RouterLink} to="/cart">
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon sx={{ fontSize: 30 }} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={handleUserButtonClick}
            >
              <AccountBoxIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <Menu
              anchorEl={profileMenuAnchorEl}
              open={Boolean(profileMenuAnchorEl)}
              onClose={handleProfileMenuClose}
            >
              {isLoggedIn ? (
                [
                  <MenuItem key="profile" onClick={() => navigate('/profile')}>Moje konto</MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>Wyloguj się</MenuItem>
                ]
              ) : (
                [
                  <MenuItem key="login" onClick={() => navigate('/login')}>Zaloguj się</MenuItem>,
                  <MenuItem key="register" onClick={() => navigate('/register')}>Zarejestruj się</MenuItem>
                ]
              )}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#2c3e50", display: { xs: "none", sm: "block" } }}
      >
        <Toolbar variant="dense">
          <Container>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-evenly",
                py: 1,
              }}
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  component={RouterLink}
                  to={`/category/${category.id}`}
                  sx={{ color: "white", textTransform: "none" }}
                >
                  <ListItemIcon sx={{ color: 'white' }}>
                    {category.categoryName === "Laptopy i Komputery" && <ComputerIcon />}
                    {category.categoryName === "Smartfony" && <SmartphoneIcon />}
                    {category.categoryName === "Tablety" && <TabletAndroidIcon />}
                    {category.categoryName === "Smartwatche" && <WatchIcon />}
                    {category.categoryName === "Telewizory" && <TvIcon />}
                    {category.categoryName === "Monitory" && <MonitorIcon />}
                  </ListItemIcon>
                  {category.categoryName}
                </Button>
              ))}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default AppNavbar;
