# Payment Gateway Integration Project

This project demonstrates a simple payment processing system using Node.js, integrating with PayPal and Braintree for handling payments. It's designed to showcase backend capabilities in handling third-party libraries, writing clean and testable code, and following best practices within a Node.js environment.

## Features

- Payment processing with PayPal and Braintree.
- Simple HTML form for making payments.
- Server-side form validation and processing.
- Dynamic payment gateway selection based on business logic.
- Storage of order data and payment responses in a MongoDB database.
- Basic unit tests for the payment processing logic.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- MongoDB setup for storing order data.
- PayPal and Braintree sandbox accounts for testing payments.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shahfaisallive/backend-developer-assignment

2. Navigate to the project directory:
   ```bash
    cd backend-developer-assignment

3. Install dependencies:
   ```bash
    npm install

4. Configure environment variables:
   ```bash
    PORT=4000
    MONGODB_URI=your_mongodb_uri
    PAYPAL_CLIENT_ID=your_paypal_client_id
    PAYPAL_CLIENT_SECRET=your_paypal_client_secret
    BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
    BRAINTREE_PUBLIC_KEY=your_braintree_public_key
    BRAINTREE_PRIVATE_KEY=your_braintree_private_key

## Usage
To start the server, run:
npm start

To open the payment form.

Visit http://localhost:4000/payment-form