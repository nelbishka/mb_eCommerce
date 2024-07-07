import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for requests from the frontend
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to your frontend's URL
}));

// Verify environment variables
console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS);

// Nodemailer transport setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route to send a confirmation email
app.post('/send-confirmation-email', (req, res) => {
  const { email, orderData } = req.body;

  if (!email || !orderData) {
    console.error('Missing email or order data');
    return res.status(400).send('Email and order data are required');
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Order Confirmation',
    text: `Thank you for your order! Here are the details: ${JSON.stringify(orderData, null, 2)}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email: ' + error.message);
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).send('Email sent');
    }
  });
});

// Route to capture checkout details
app.post('/capture-checkout', (req, res) => {
  const { checkoutToken, orderData } = req.body;

  if (!checkoutToken || !orderData) {
    console.error('Missing checkout token or order data');
    return res.status(400).send('Checkout token and order data are required');
  }

  console.log('Checkout token:', checkoutToken);
  console.log('Order data:', orderData);

  // Mock response for successful capture
  res.status(200).json({ success: true, orderData });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
