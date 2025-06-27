// controllers/adminController.js
import Transaction from '../model/addadminTransaction.js';
import Balance from '../model/addadminBalance.js';

export const addadmintransaction = async (req, res) => {
  try {
    const { description, amount, balanceAfter } = req.body;
    const transaction = await Transaction.create({
      description,
      amount,
      balanceAfter,
    });

    // Schedule updates
    setTimeout(async () => {
      transaction.status = 'Completed';
      await transaction.save();

      setTimeout(async () => {
        transaction.status = 'Applied';
        await transaction.save();

        const balance = await Balance.findOne();
        balance.amount = balanceAfter;
        await balance.save();
      }, 60 * 60 * 1000); // 1 hour after 'Completed'
    }, 2 * 60 * 60 * 1000); // 2 hours for 'Pending' to 'Completed'

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addadmindeleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addadminupdateBalance = async (req, res) => {
  try {
    const { amount } = req.body;
    let balance = await Balance.findOne();
    if (!balance) {
      balance = await Balance.create({ amount });
    } else {
      balance.amount = amount;
      await balance.save();
    }
    res.status(200).json({ amount: balance.amount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addadmingetBalance = async (req, res) => {
  try {
    const balance = await Balance.findOne();
    res.status(200).json(balance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addadmingetAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

