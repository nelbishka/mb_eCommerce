import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import logo from '../../assets/commerce.png';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './styles';
import { useCart } from '../Cart/CartContext';

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppBar position="fixed" className={classes.appBar} color="inherit">
      <Toolbar>
        <Typography component={Link} to='/' variant="h6" className={classes.title} color="inherit">
          <img src={logo} alt="mb-ecommerce" height="50px" className={classes.image} />
        </Typography>
        <div className={classes.grow} />
        {location.pathname === '/' && (
          <div className={classes.button}>
            <IconButton component={Link} to='/cart' aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
