import dotenv from "dotenv";
dotenv.config();
import braintree from "braintree";

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const processPaymentBraintree = async ({ amount, creditCard }) => {
  try {
    const saleResult = await gateway.transaction.sale({
      amount: amount,
      creditCard: {
        number: creditCard.number,
        expirationMonth: creditCard.expirationMonth,
        expirationYear: creditCard.expirationYear,
        cvv: creditCard.cvv,
      },
      options: {
        submitForSettlement: true,
      },
    });

    return saleResult;
  } catch (error) {
    console.error("Braintree payment error:", error);
    throw error;
  }
};
