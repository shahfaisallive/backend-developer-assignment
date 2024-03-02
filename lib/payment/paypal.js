import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

export const processPaymentPayPal = async ({
  amount,
  currency,
  creditCard,
}) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "credit_card",
      funding_instruments: [
        {
          credit_card: {
            type: creditCard.type,
            number: creditCard.number,
            expire_month: creditCard.expirationMonth,
            expire_year: creditCard.expirationYear,
            cvv2: creditCard.cvv,
            first_name: creditCard.firstName,
            last_name: creditCard.lastName,
          },
        },
      ],
    },
    transactions: [
      {
        amount: {
          total: amount,
          currency: currency,
        },
        description:
          "This is a test transaction only for an assignment project.",
      },
    ],
  };

  return new Promise((resolve, reject) => {
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        reject(error);
      } else {
        resolve(payment);
      }
    });
  });
};
