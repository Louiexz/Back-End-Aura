import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';

import leadRoutes from './routes/leadRoutes.js';

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Usando as rotas definidas
app.use('/', leadRoutes);

(async () => {
    try {
        if (mongoose.connection.readyState === 0) { // Verificar se já está conectado
            const mongoURI = "mongodb+srv://gstvrrds:<db_password>@aura.bbtfe.mongodb.net/?retryWrites=true&w=majority&appName=Aura";

            mongoose.Promise = global.Promise;
            mongoose.connect(mongoURI).then(() => {
                console.log('Conexão com MongoDB estabelecida.');
            }).catch((error) => {
                console.error('Conexão com MongoDB não estabelecida:', error);
            });
        }
        app.listen(3000, () => {
            console.log("Servidor rodando em  http://localhost:3000/");
        });
    } catch (error) {
        console.error("Erro ao sincronizar o banco de dados:", error);
    }
})();