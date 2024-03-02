import { processPaymentBraintree } from "../lib/payment/braintree.js";
import { processPaymentPayPal } from "../lib/payment/paypal.js";
import paypal from "paypal-rest-sdk";
import braintree from "braintree";

jest.mock("braintree");
jest.mock("paypal-rest-sdk");

describe("Payment Library", () => {
  // Braintree test
  it("should process a payment with Braintree", async () => {
    const fakeBraintreeResponse = {
      success: true,
      transaction: {
        id: "fake_transaction_id",
        status: "submitted_for_settlement",
      },
    };
    braintree.BraintreeGateway.prototype.transaction.sale = jest
      .fn()
      .mockResolvedValue(fakeBraintreeResponse);

    const paymentData = {
      amount: "10.00",
      creditCard: {
        number: "4111111111111111",
        expirationMonth: "12",
        expirationYear: "2023",
        cvv: "123",
      },
    };

    const result = await processPaymentBraintree(paymentData);

    expect(result).toEqual(fakeBraintreeResponse);
    expect(
      braintree.BraintreeGateway.prototype.transaction.sale
    ).toHaveBeenCalledWith({
      amount: "10.00",
      creditCard: {
        number: "4111111111111111",
        expirationMonth: "12",
        expirationYear: "2023",
        cvv: "123",
      },
      options: {
        submitForSettlement: true,
      },
    });
  });

  //   Paypal test
  it("should process a payment with PayPal", async () => {
    const fakePayPalResponse = {
      id: "PAYID-LR7XQQA",
      intent: "sale",
      state: "approved",
      cart: "cart_id",
      payer: {
        payment_method: "paypal",
      },
      transactions: [
        {
          amount: {
            total: "10.00",
            currency: "USD",
          },
          related_resources: [
            {
              sale: {
                id: "SALE_ID",
                state: "completed",
              },
            },
          ],
        },
      ],
    };

    paypal.payment.create = jest.fn().mockResolvedValue(fakePayPalResponse);

    const paymentData = {
      amount: "10.00",
      currency: "USD",
      creditCard: {
        type: "visa",
        number: "4111111111111111",
        expire_month: "12",
        expire_year: "2023",
        cvv2: "123",
        first_name: "John",
        last_name: "Doe",
      },
    };

    const result = await processPaymentPayPal(paymentData);

    expect(result).toEqual(fakePayPalResponse);
    expect(paypal.payment.create).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Function)
    );
  });
});
