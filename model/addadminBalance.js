import mongoose from 'mongoose';

const balanceSchema = new mongoose.Schema({
  available: { type: Number, default: 0 }
});

const Balance = mongoose.models.Balance || mongoose.model('Balance', balanceSchema);
export default Balance;