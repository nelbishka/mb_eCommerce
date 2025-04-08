import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const Cart = () => {
  const classes = useStyles();
  const { cartItems, updateCartQty, removeFromCart, emptyCart } = useCart();

  const isEmpty = cartItems.length === 0;

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3">Your Shopping Cart</Typography>
      {isEmpty ? (
        <Typography variant="subtitle1">
          You have no items in your shopping cart.
          <Link to="/" className={classes.link}> Start adding some!</Link>
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cartItems.map((item) => (
              <Grid item xs={12} sm={4} key={item.id}>
                <CartItem item={item} onUpdateCartQty={updateCartQty} onRemoveFromCart={removeFromCart} />
              </Grid>
            ))}
          </Grid>
          <div className={classes.cardDetails}>
            <Typography variant="h4">
              Subtotal: ${cartItems.reduce((total, item) => total + item.price.raw * item.quantity, 0).toFixed(2)}
            </Typography>
            <div className={classes.buttons}>
              <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="error" onClick={emptyCart}>Empty Cart</Button>
              <Button component={Link} to='/checkout' className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
