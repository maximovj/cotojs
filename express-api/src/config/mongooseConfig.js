import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoUri = process.env.APP_MONGODB_URI || 'mongodb://127.0.0.1/db-cotojs'; 
const conn = mongoose.createConnection(mongoUri, {});

conn.on('connected', () => console.log('Base de datos conectado.'));
conn.on('disconnected', () => console.log('Base de datos desconectado.'));
conn.on('error', () => console.log('Error en la conexión con mongodb.'));

export default conn;