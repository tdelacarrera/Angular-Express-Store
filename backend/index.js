import express from 'express'
import cors from 'cors'
import path from 'path'
import { PORT } from './config.js'
import { fileURLToPath } from 'url';
import usersRoutes from './routes/user.routes.js';
import productsRoutes from './routes/products.routes.js'
import { sequelize } from './sequelize.js';
import { Product } from './models/product.model.js'; 
import { User } from './models/user.model.js'; 

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.set('port', PORT)
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);


// Rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
    console.log('Server running on port', PORT)
})

sequelize.sync({ force: true })
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });

