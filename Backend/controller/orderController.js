const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const Customer = require('../models/Customer');
const twilio = require("twilio");
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = twilio(accountSid, authToken);

exports.sendOtp = async(req, res) => {
  const { phone } = req.body;

  try {
    const response = await client.verify.v2.services(serviceSid).verifications.create({
      to: `+91${phone}`,
      channel: "sms",
    });
    res.json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    console.error("Error in sendOtp:", error); // Add this for detailed error logs
    res.status(500).json({ success: false, message: "Failed to send OTP", error });
  }
};


exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const response = await client.verify.v2.services(serviceSid)
      .verificationChecks.create({
        to: `+91${phone}`,
        code: otp,
      });

    if (response.status === "approved") {
      return res.json({ success: true, message: "OTP verified successfully!" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to verify OTP", error });
  }
};



exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        // Update the order status
        order.ordrStatus = 'served';
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order status updated to served",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};



exports.updateBillStatus = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        order.billStatus = 'Paid'
        await order.save();

        return res.status(200).josn({
            success: true,
            message: 'Bill status updated to Paid'
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Iternal server errror'
        })
    }
}


exports.allOrder = async (req, res) => {

    const orders = await Order.find({});
    console.log(orders);
    return res.status(200).json({
        success: true,
        data:orders
    })

}

exports.placeOrder = async (req, res) => {
  try {
    const { customerName, customerNo, seatNumber, items } = req.body;

    console.log("Request body:", req.body);

    // Find or create customer
    let customer = await Customer.findOne({ phone: customerNo });
    if (!customer) {
      const newCustomer = new Customer({
        name: customerName,
        phone: customerNo,
      });
      customer = await newCustomer.save(); // Save and assign to customer
    }

    // Calculate total price and prepare order items
    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);

      if (!menuItem) {
        return res
          .status(400)
          .json({ success: false, message: `Menu item with id ${item.menuItemId} not found` });
      }

      orderItems.push({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
      });
      totalPrice += menuItem.price * item.quantity;
    }

    // Create new order
    const newOrder = new Order({
      customer: customer._id,
      seatNumber: seatNumber.seatId, // Use seatId
      items: orderItems,
      totalPrice,
    });

    await newOrder.save();

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
