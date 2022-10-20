import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
dotenv.config();

const PORT = process.env.PORT || 3000 //Get the port from the .env file
import router from './user_controller.js' //The router of the users that is also the controller

const app = express(); //Create the app
app.use(cors()); //Use the cors dependencies
app.use(express.json()); //With this the req.body can have json format
app.use(router); //Import the user controller

//Start the server
app.listen(PORT, () => {
    console.log('SERVER UP');
});