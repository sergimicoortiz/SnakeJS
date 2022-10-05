import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(cors());
import router from './user_controller.js'
app.use(router);

app.listen(PORT, () => {
    console.log('SERVER UP');
});