import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

const formatCurrency = (amount) => {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for requests from the frontend
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to your frontend's URL
}));

// Nodemailer transport setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "bishkaneli@gmail.com",
    pass: "bjcc usrb lncf tesp",
  },
});

// Route to send a confirmation email
app.post('/send-confirmation-email', (req, res) => {
  const { email, orderData } = req.body;

  const totalPrice = orderData.line_items.reduce((acc, item) => {
    return acc + item.price.raw * item.quantity;
  }, 0);

  const formattedTotalPrice = formatCurrency(totalPrice);

  if (!email || !orderData) {
    console.error('Missing email or order data');
    return res.status(400).send('Email and order data are required');
  }

  const mailOptions = {
    from: '"mb E-commerce" <bishkaneli@gmail.com>',
    to: email,
    subject: 'Order Confirmation',
    text: `Thank you for your order!\n\n` +
    `Order Details:\n` +
    `Customer Name: ${orderData.customer.firstname} ${orderData.customer.lastname}\n` +
    `Email: ${orderData.customer.email}\n` +
    `Phone Number: ${orderData.customer.phoneNumber}\n` +
    `Products:\n` +
    orderData.line_items.map(item => 
      `- ${item.name} - Price: ${item.price.formatted_with_code}, Quantity: ${item.quantity}`
    ).join('\n') + '\n\n' +
    `Total Price: ${formattedTotalPrice} ALL\n\n` +
    `Thank you for shopping with us!`,
    };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email: ' + error.message);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Email sent successfully', info });
    }
  });
});

// Route to capture checkout details
app.post('/capture-checkout', (req, res) => {
  const { checkoutToken, orderData } = req.body;

  console.log('Checkout token:', checkoutToken);
  console.log('Order data:', orderData);
  console.log('Request Body:', req.body);





  // Mock response for successful capture
  res.status(200).json({ success: true, orderData });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
