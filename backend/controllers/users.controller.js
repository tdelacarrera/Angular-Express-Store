import { pool } from '../database.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const [result] = await pool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        res.status(201).json({
            message: 'Usuario creado exitosamente',
            userId: result.insertId,
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
            [name, email, role, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario editado exitosamente' });
    } catch (error) {
        console.error('Error al editar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const login = async(req, res) => {
    const { email, password } = req.body;
    try{
        const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            if(result.length === 0){
                return res.status(404).json({ message: 'Correo electronico o contraseña invalidas' })
            }
        const user = result[0];

        const isValid = await bcryptjs.compare(password, user.password);
        if(!isValid){
            return res.status(401).json({ message: 'Correo electrónico o contraseña invalidas'})
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ 
            message: 'Inicio de sesión exitoso', 
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role 
            }
        });
    }catch(error){
        console.error('error en el login', error);
        res.status(500).json({ message: 'Error interno del servidor' })
    }
}

export const methods = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
};
