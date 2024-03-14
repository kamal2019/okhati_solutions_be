import dotenv from 'dotenv';

dotenv.config()

const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

export { DB_URI, PORT, SECRET_KEY }