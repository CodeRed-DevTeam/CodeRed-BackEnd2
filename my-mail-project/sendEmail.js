const nodemailer = require('nodemailer');

// Set up the transporter with your SMTP settings
const transporter = nodemailer.createTransport({
  service: 'smtp',
  host: 'codered.smtp.host.com',
  port: 587,  // Use 465 for SSL
  secure: false,  // Use true for SSL
  auth: {
    user: 'codered@gmail.com',
    pass: 'your-password-or-app-password' // Replace with your actual password or app password
  }
});

// Email options
const mailOptions = {
  from: 'codered@gmail.com',
  to: 'recipient@example.com', // Replace with the recipient's email
  subject: 'Test Email',
  text: 'This is a test email from CodeRed.'
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
