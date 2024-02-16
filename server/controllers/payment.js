const { uuid } = require("uuidv4");
const midtransClient = require("midtrans-client");
const { User, Profile, Order } = require("../models/index");

module.exports = class PaymentController {
  static async initiate(req, res, next) {
    try {
      const order_id = uuid();
      const amount = 20000;

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY
      });

      let parameter = {
        transaction_details: {
          order_id: order_id,
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user.email,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      const transactionToken = transaction.token;

      await Order.create({
        orderId: order_id,
        userId: req.user.id,
        amount,
        transactionToken,
      });

      res.json({ message: "Order created", transactionToken, orderId: order_id });
    } catch (error) {
      next(error);
    }
  }
};
