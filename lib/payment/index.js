import { processPaymentBraintree } from "./braintree.js";
import { processPaymentPayPal } from "./paypal.js";

export const processPayment = async (paymentData) => {
  const { creditCard, currency } = paymentData;
  console.log("data", paymentData);
  // Rule-based logic for gateway selection
  if (creditCard.type === "amex" && currency !== "USD") {
    throw new Error("AMEX is only available for USD transactions.");
  } else if (
    creditCard.type === "amex" ||
    ["USD", "EUR", "AUD"].includes(currency)
  ) {
    return await processPaymentPayPal(paymentData);
  } else {
    return await processPaymentBraintree(paymentData);
  }
};
