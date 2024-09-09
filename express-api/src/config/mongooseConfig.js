import mongoose from 'mongoose';

const conn = mongoose.createConnection('mongodb://127.0.0.1/db-cotojs', {});

conn.on('connected', () => console.log('Base de datos conectado.'));
conn.on('disconnected', () => console.log('Base de datos desconectado.'));
conn.on('error', () => console.log('Error en la conexión con mongodb.'));

export default conn;