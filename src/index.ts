import express from 'express';

import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express'
import testRoutes from './routes/testRoutes';
import swaggerDocs from './config/swagger';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import cors from 'cors';
import { testConnection } from './config/database';
import { syncDatabase } from './models/SyncModels';


const app = express();

//chargement des variables d'environnement
dotenv.config();

const PORT = process.env.PORT;
console.log("test")

app.use(express.json());
// Active CORS pour toutes les origines
app.use(cors());

// Connecter à Sequelize
testConnection().then(() => syncDatabase());

//Routes
app.use('/test', testRoutes)
app.use('/users', userRoutes)

// Routes d'authentification
//app.use('/auth', authRoutes);

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.API_URL} sur le port: ${PORT}`);
});
