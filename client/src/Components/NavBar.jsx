import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { getProducts } from "../Redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import LogoMachi from "../../src/logo.png";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function NavBar() {
  const preguntarSiHayAlgoEnElCarro = useSelector(
    (state) => state.cart.cartItems
  );
  const preguntarSiHayAlgoEnElCarroDb = useSelector(
    (state) => state.cart.itemsCarritoDb
  );
  const dispatch = useDispatch();
  const refreshTienda = () => {
    dispatch(getProducts({}));
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    > 
      <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
        <MenuItem onClick={handleMenuClose}>
          <Typography>Perfil</Typography>
        </MenuItem>
      </Link>
      <Link to="/facturas" style={{ textDecoration: "none", color: "black" }}>
        <MenuItem onClick={handleMenuClose}>
          <Typography>Tus Compras</Typography>
        </MenuItem>
      </Link>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Tus Compras</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Perfil</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexColumn: 5, flexGrow: 1, justifyContent: "space-between" }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <img src={LogoMachi} style={{ width: "90px" }} alt="imagen" />
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginLeft: "5vw", display: { xs: "none", sm: "block" } }}
            >
              Home
            </Typography>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/contact"
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginLeft: "5vw", display: { xs: "none", sm: "block" } }}
            >
              Contacto
            </Typography>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            onClick={refreshTienda}
            to="/Tienda"
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginLeft: "5vw", display: { xs: "none", sm: "block" } }}
            >
              Tienda
            </Typography>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/servicios"
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginLeft: "5vw", display: { xs: "none", sm: "block" } }}
            >
              Servicios
            </Typography>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/nosotros"
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginLeft: "5vw", display: { xs: "none", sm: "block" } }}
            >
              Nosotros
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <a
              href="https://wa.me/543512900724?text=Hola%20Machi,%20tengo%20una%20consulta!%20"
              target="_blanck"
              style={{ textDecoration: "none", color: "black" }}
            >
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <WhatsAppIcon fontSize="large" />
              </IconButton>
            </a>
            <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge
                  badgeContent={
                    preguntarSiHayAlgoEnElCarro.length ||
                    preguntarSiHayAlgoEnElCarroDb.length
                      ? "!"
                      : 0
                  }
                  color="success"
                >
                  <ShoppingCartIcon fontSize="large" />
                </Badge>
              </IconButton>
            </Link>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle fontSize="large" />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
