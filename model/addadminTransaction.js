// model/addadminTransaction.js

import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  balanceAfter: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

// ✅ Check if already compiled
export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
