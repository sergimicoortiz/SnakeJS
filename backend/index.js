import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
dotenv.config();

const cors_options = {
    origin: process.env.CORSURL || "http://localhost:5500"
};
const PORT = process.env.PORT || 3000
import router from './user_controller.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log('SERVER UP');
});