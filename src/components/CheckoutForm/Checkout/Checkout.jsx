import React, { useState } from 'react';
import { Paper, Typography, Divider, Button, TextField, CircularProgress, CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { useCart } from '../../Cart/CartContext'; 


const Checkout = () => {
    const classes = useStyles();
    const { cartItems } = useCart();  
    const [shippingData, setShippingData] = useState({
      firstname: '',
      lastname: '',
      email: '',
      phoneNumber: '',
      address: '',
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState(null);
  
    const handleChange = (e) => {
      setShippingData({
        ...shippingData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const orderData = {
          customer: shippingData,
          line_items: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: {
              formatted_with_code: item.price.formatted_with_code,
              raw: item.price.raw,
            },
          })),
        };
  
        const response = await fetch('https://ecommerceserver-gbsh.onrender.com/send-confirmation-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: shippingData.email,
            orderData,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to send email');
        }
  
        setLoading(false);
        setConfirmationMessage('Order placed successfully! Confirmation email has been sent.');
      } catch (error) {
        setLoading(false);
        setErrorMessage(error.message);
      }
    };
  

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                label="First Name"
                name="firstname"
                value={shippingData.firstname}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Last Name"
                name="lastname"
                value={shippingData.lastname}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={shippingData.email}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={shippingData.phoneNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                name="address"
                value={shippingData.address}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              <Button variant="contained" color="primary" type="submit">
                Submit Order
              </Button>
            </form>
          )}

          {confirmationMessage && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Typography variant="h6" color="primary">
                {confirmationMessage}
              </Typography>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Typography variant="body2" component={Link} to="/" style={{ textDecoration: 'none', color: '#3f51b5' }}>
                  Back to Shopping
                </Typography>
              </div>
            </div>
          )}

          {errorMessage && (
            <Typography variant="body1" color="error" style={{ marginTop: '20px', textAlign: 'center' }}>
              Error: {errorMessage}
            </Typography>
            
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
