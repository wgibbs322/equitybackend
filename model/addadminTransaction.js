// model/addadminTransaction.js

import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  balanceAfter: { type: Number, required: true },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });


// ✅ Check if already compiled
export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
