// routes/adminRoutes.js
import express from 'express';
import {
  addadmintransaction,
  addadmindeleteTransaction,
  addadminupdateBalance,
  addadmingetBalance,
  addadmingetAllTransactions
} from '../Controller/addadmintransactionController.js';

const router = express.Router();

router.post('/addadmintransaction', addadmintransaction);
router.delete('/addadmindeleteTransaction/:id', addadmindeleteTransaction);
router.put('/addadminupdateBalance', addadminupdateBalance);
router.get('/addadmingetBalance', addadmingetBalance);
router.get('/addadmingetAllTransactions', addadmingetAllTransactions);

export default router;