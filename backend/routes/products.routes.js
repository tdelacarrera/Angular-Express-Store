import express from 'express';
import multer from 'multer';
import { methods } from '../controllers/products.controller.js';


const upload = multer({ dest: 'public/uploads' });
const router = express.Router();

router.get('/', methods.getProducts);
router.get('/:id', methods.getProductById);
router.post('/', upload.single('file'), methods.createProduct);
router.put('/:id', methods.updateProduct);
router.delete('/:id', methods.deleteProduct);

export default router;