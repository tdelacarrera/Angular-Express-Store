import express from 'express'
import cors from 'cors'
import path from 'path'
import { PORT } from './config.js'
import { fileURLToPath } from 'url';
import usersRoutes from './routes/user.routes.js';
import productsRoutes from './routes/products.routes.js'
import purchasesRoutes from './routes/purchases.routes.js'

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.set('port', PORT)
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/purchases', purchasesRoutes);


// Rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
    console.log('Server running on port', PORT)
})