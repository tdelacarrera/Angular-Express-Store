import express from 'express';
import { methods } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/', methods.getUsers);
router.get('/:id', methods.getUserById); 
router.post('/login', methods.login);
router.post('/', methods.createUser);
router.put('/:id',methods.updateUser);
router.delete('/:id',methods.deleteUser);

export default router;