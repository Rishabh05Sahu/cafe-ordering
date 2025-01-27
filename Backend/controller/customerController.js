const Customer = require('../models/Customer');
const crypto = require('crypto'); // For OTP generation
const nodemailer = require('nodemailer');
require('dotenv').config();

let otpStore = {};


exports.addCustomer = async (req, res) => {
    const { name, phone } = req.body;

    if (!name || !phone) {
        return res.status(400).json({
            success: false,
            message: "name and phone are required"
        })
    }

    try {
        const newcustomer = new Customer({ name, phone });
        await newcustomer.save();

        return res.status(201).json({
            success: true,
            message: "new customer added"
        });

    } catch (error) {
        console.error("Error adding customer:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}



