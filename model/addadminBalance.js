import mongoose from 'mongoose';

const balanceSchema = new mongoose.Schema({
  available: { type: Number, default: 0 }
});

export default mongoose.model('Balance', balanceSchema);
