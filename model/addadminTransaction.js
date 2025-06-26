import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  status: { type: mongoose.Schema.Types.Mixed, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  balanceUpdate: Number
});

// ✅ Prevent model overwrite issue
const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
export default Transaction;