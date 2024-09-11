const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Query = require('../models/Query');
const nodemailer = require('nodemailer');



//get routes to get the all query
router.get('/', async (req, res) => {
    try {
      const queries = await Query.find().populate('user_id', 'name email phone_number');
      res.status(200).json(queries);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve queries' });
    }
  });


// POST route for submitting a contact form
router.post('/', async (req, res) => {
    const { name, email, phone_number, topic, message } = req.body;
  
    try {
      // Save user information
      const user = new User({ name, email, phone_number });
      const savedUser = await user.save();
  
      // Save query details
      const query = new Query({
        user_id: savedUser._id,
        topic,
        message,
      });
      await query.save();

        // Send a confirmation email to the user
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Contact Form Submission Confirmation',
        text: `Hello ${name},\n\nThank you for reaching out! We have received your query regarding "${topic}" and will get back to you soon. 
        \n\nmessage:- \n${message} \n\nBest regards,\nYour Company
        `,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Query submitted successfully!' });
    } catch (error) {
        console.error(error);

      res.status(500).json({ error: 'Failed to submit query' });
    }
  });



module.exports = router;