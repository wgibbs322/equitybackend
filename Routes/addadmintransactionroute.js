import express from 'express';
import {
    addadmingetTransactions,
    addadminaddTransaction,
    addadmindeleteTransaction,
    addadmingetBalance,
    addadminupdateAvailableBalance
} from '../Controller/addadmintransactionController.js';

const router = express.Router();

router.get('/addadmingettransaction', addadmingetTransactions);
router.post('/addadminaddtransaction', addadminaddTransaction);
router.delete('/:id', addadmindeleteTransaction);

router.get('/addadminbalance', addadmingetBalance);
router.put('/addadminavailablebalance', addadminupdateAvailableBalance);

export default router;
