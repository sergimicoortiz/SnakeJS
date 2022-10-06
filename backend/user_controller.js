import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5';
const router = express.Router();

let users = [{
    id: uuidv4(),
    email: 'pepito@pepito.com',
    password: md5('pepito'),
    HightScore: 0
}];

router.get('/user/:email', (req, res) => {
    const email = req.params.email;
    const user = users.find(e => e.email === email);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ msg: 'User not found' });
    }
});//get user_email

router.get('/user/token/:token', (req, res) => {
    const token = req.params.token;
    const user = users.find(e => e.id === token);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ msg: 'User not found' });
    }
});//default

router.post('/user', (req, res) => {
    const user = {
        id: uuidv4(),
        email: req.body.email,
        password: md5(req.body.password),
        HightScore: 0
    };
    users.push(user);
    res.json(user);
});//add user

router.get('/user/:email/:pass', (req, res) => {
    const email = req.params.email;
    const password = md5(req.params.pass || '');
    const user = users.find(i => i.email === email);
    if (user.password === password) {
        res.json({ status: 'OK' });
    } else {
        res.json({ status: 'Invalid passwors' });
    }
})//check password

export default router;