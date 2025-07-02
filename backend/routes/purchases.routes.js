import express from 'express';
import { methods } from '../controllers/purchase.controller.js';

const router = express.Router();

router.get('/', methods.getPurchases);
router.get('/:id', methods.getPurchaseById);
router.post('/', methods.createPurchase);
router.delete('/:id', methods.deletePurchase);

export default router;