import { processPayment } from "../lib/payment/index.js";
import Order from "../models/order.model.js";
import { getCardType } from "../lib/cardType.js";

export const processPaymentController = async (req, res) => {
  try {
    const paymentData = {
      amount: req.body.amount,
      currency: req.body.currency,
      creditCard: {
        type: getCardType(req.body.cardNumber),
        number: req.body.cardNumber,
        expirationMonth: req.body.cardExpMonth,
        expirationYear: req.body.cardExpYear,
        cvv: req.body.cardCVV,
        firstName: req.body.cardName.split(" ")[0],
        lastName: req.body.cardName.split(" ")[1] || "",
      },
    };

    const result = await processPayment(paymentData);

    const order = new Order({
      fullName: req.body.fullName,
      amount: paymentData.amount,
      currency: paymentData.currency,
      paymentMethod: result.paymentMethod,
      paymentResponse: result.response,
    });

    await order.save();
    res.status(200).json({
      success: true,
      message: "Payment processed successfully",
      data: result,
    });
  } catch (error) {
    console.error("Payment processing error:", JSON.stringify(error, null, 2));
    res.status(500).json({
      success: false,
      message: "Payment processing failed",
      error: error.toString(),
    });
  }
};
