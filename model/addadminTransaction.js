import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  status: { type: mongoose.Schema.Types.Mixed, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  balanceUpdate: Number
});

export default mongoose.model('Transaction', transactionSchema);
