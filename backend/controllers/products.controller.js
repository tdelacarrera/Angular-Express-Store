import { pool } from '../database.js';


const getProducts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const createProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body;
    const path = req.file.filename

    try {
        const [result] = await pool.query(
            'INSERT INTO products (name, description, price, category, stock, path) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description, price, category, stock, path]
        );
        res.status(201).json({
            message: 'Producto creado exitosamente',
            productId: result.insertId,
        });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE products SET name = ?, description = ?, price = ?, category = ?, stock = ? WHERE id = ?',
            [name, description, price, category, stock, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const methods = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
