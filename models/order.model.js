import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    fullName: String,
    amount: Number,
    currency: String,
    paymentMethod: String, // 'paypal' or 'braintree'
    paymentResponse: mongoose.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;