import { pool } from '../database.js';

const getPurchases = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT p.id AS purchaseId, p.userId, p.price, 
                   u.name AS userName, u.email,
                   pr.id AS productId, pr.name AS productName,
                   pp.quantity
            FROM purchases p
            JOIN users u ON p.userId = u.id
            JOIN purchase_product pp ON pp.purchaseId = p.id
            JOIN products pr ON pr.id = pp.productId
        `);

        const purchasesMap = {};

        rows.forEach(row => {
            if (!purchasesMap[row.purchaseId]) {
                purchasesMap[row.purchaseId] = {
                    id: row.purchaseId,
                    userId: row.userId,
                    price: row.price,
                    user: {
                        name: row.userName,
                        email: row.email
                    },
                    products: []
                };
            }

            purchasesMap[row.purchaseId].products.push({
                id: row.productId,
                name: row.productName,
                quantity: row.quantity
            });
        });

        const purchases = Object.values(purchasesMap);

        res.status(200).json(purchases);
    } catch (error) {
        console.error('Error al obtener las compras:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getPurchaseById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query(`
            SELECT p.id AS purchaseId, p.userId, p.price, 
                   u.name AS userName, u.email,
                   pr.id AS productId, pr.name AS productName,
                   pp.quantity
            FROM purchases p
            JOIN users u ON p.userId = u.id
            JOIN purchase_product pp ON pp.purchaseId = p.id
            JOIN products pr ON pr.id = pp.productId
            WHERE p.id = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }

        const purchase = {
            id: rows[0].purchaseId,
            userId: rows[0].userId,
            price: rows[0].price,
            user: {
                name: rows[0].userName,
                email: rows[0].email
            },
            products: rows.map(row => ({
                id: row.productId,
                name: row.productName,
                quantity: row.quantity
            }))
        };

        res.status(200).json(purchase);
    } catch (error) {
        console.error('Error al obtener la compra:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const createPurchase = async (req, res) => {
    const { userId, products, price } = req.body;

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [result] = await connection.query(
            'INSERT INTO purchases (userId, price) VALUES (?, ?)',
            [userId, price]
        );
        const purchaseId = result.insertId;

        for (const item of products) {
            await connection.query(
                'INSERT INTO purchase_product (purchaseId, productId, quantity) VALUES (?, ?, ?)',
                [purchaseId, item.productId, item.quantity]
            );
        }

        await connection.commit();
        res.status(201).json({ message: 'Compra creada exitosamente', purchaseId });

    } catch (error) {
        await connection.rollback();
        console.error('Error al crear la compra:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    } finally {
        connection.release();
    }
};

const deletePurchase = async (req, res) => {
    const { id } = req.params;

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.query('DELETE FROM purchase_product WHERE purchaseId = ?', [id]);

        const [result] = await connection.query('DELETE FROM purchases WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Compra no encontrada' });
        }

        await connection.commit();
        res.status(200).json({ message: 'Compra eliminada exitosamente' });
    } catch (error) {
        await connection.rollback();
        console.error('Error al eliminar la compra:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    } finally {
        connection.release();
    }
};

export const methods = {
    getPurchases, 
    getPurchaseById,
    createPurchase,
    deletePurchase,
};