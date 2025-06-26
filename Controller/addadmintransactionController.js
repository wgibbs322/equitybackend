import Transaction from '../model/addadminTransaction.js';
import Balance from '../model/addadminBalance.js';

export const addadminaddTransaction = async (req, res) => {
  const { description, amount, balanceUpdate } = req.body;

  const tx = new Transaction({
    description,
    amount,
    status: 'Pending',
    balanceUpdate
  });

  await tx.save();

  // Schedule status updates
  setTimeout(async () => {
    await Transaction.findByIdAndUpdate(tx._id, { status: 'Completed' });

    // After another 1 hour, apply balance update
    setTimeout(async () => {
      const balanceDoc = await Balance.findOne();
      if (balanceDoc) {
        balanceDoc.available += balanceUpdate;
        await balanceDoc.save();
      }
      await Transaction.findByIdAndUpdate(tx._id, { status: balanceDoc.available });
    }, 60 * 60 * 1000); // 1 hour

  }, 2 * 60 * 60 * 1000); // 2 hours

  res.status(201).json(tx);
};

export const addadmingetTransactions = async (req, res) => {
  const transactions = await Transaction.find().sort({ createdAt: 1 });
  res.json(transactions);
};

export const addadmindeleteTransaction = async (req, res) => {
  const { id } = req.params;
  await Transaction.findByIdAndDelete(id);
  res.json({ message: 'Deleted' });
};

export const addadminupdateAvailableBalance = async (req, res) => {
  const { newAmount } = req.body;
  const doc = await Balance.findOneAndUpdate({}, { available: newAmount }, { upsert: true, new: true });
  res.json(doc);
};

export const addadmingetBalance = async (req, res) => {
  const doc = await Balance.findOne();
  res.json(doc || { available: 0 });
};
