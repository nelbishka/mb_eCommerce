import React from 'react';
import { Typography, Button, Divider } from '@mui/material';
import Review from './Review';

const PaymentForm = ({ checkoutToken, shippingData, backStep, onCaptureCheckout, nextStep }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const orderData = {
      line_items: checkoutToken.line_items,
      customer: { firstname: shippingData.firstname, lastname: shippingData.lastname, email: shippingData.email, phoneNumber: shippingData.phoneNumber },
      // shipping: {
      //   name: 'Primary',
      //   street: shippingData.address1,
      //   town_city: shippingData.city,
      //   postal_zip_code: shippingData.zip,
      // },
      // fulfillment: { shipping_method: shippingData.shippingOption },
    };
    console.log(shippingData)
    try {
      await onCaptureCheckout(checkoutToken.id, orderData);
      await sendConfirmationEmail(shippingData.email, orderData);
      nextStep();
    } catch (error) {
      console.error('Error capturing checkout:', error);
    }
  };

  const sendConfirmationEmail = async (email, orderData) => {
    try {
      const response = await fetch('http://localhost:5000/send-confirmation-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, orderData }),
      });
  
      if (!response.ok) {
        throw new Error(`Unsuccessful response (${response.status}): ${response.statusText}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      throw error;
    } 
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{ margin: '20px 0' }}>Shipping Information</Typography>
      <Typography>
        {shippingData.firstName} {shippingData.lastName}
        <br/>
        {shippingData.address1}, {shippingData.ZIP}
        <br/>
        {shippingData.email}
        <br/>
        {shippingData.phoneNumber}
        
      </Typography>
      <form onSubmit={handleSubmit}>
        <br /><br />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant='outlined' onClick={backStep}>Back</Button>
          <Button type='submit' variant='contained' color='primary'>
            Confirm Order
          </Button>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;
