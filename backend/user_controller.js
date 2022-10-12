import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5';
const router = express.Router();

//Users for testing
let users = [{
    id: uuidv4(),
    email: 'user1@asd.asd',
    password: md5('user1'),
    HightScore: 12
}, {
    id: uuidv4(),
    email: 'user2@asd.asd',
    password: md5('user2'),
    HightScore: 24
}, {
    id: uuidv4(),
    email: 'user3@asd.asd',
    password: md5('user3'),
    HightScore: 33
}, {
    id: uuidv4(),
    email: 'user4@asd.asd',
    password: md5('user4'),
    HightScore: 41
}];

//Search an user using the email
router.get('/user/:email', (req, res) => {
    const email = req.params.email;
    const user = users.find(e => e.email === email);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ msg: 'User not found' });
    }
});//get user_email

//Search an user using the token/id
router.get('/user/token/:token', (req, res) => {
    const token = req.params.token;
    const user = users.find(e => e.id === token);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ msg: 'User not found' });
    }
});//default

//Creates a user
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

//Check if the password is correct
router.get('/user/:email/:pass', (req, res) => {
    const email = req.params.email;
    const password = md5(req.params.pass);
    const user = users.find(i => i.email === email);
    if (user.password == password) {
        res.json({ status: 'OK', id: user.id });
    } else {
        res.json({ status: 'Invalid password' });
    }
})//check password

//Change the HightScore of the specified user searching it by id
router.put('/user/:id', (req, res) => {
    const id = req.params.id;
    const userIndex = users.findIndex(e => e.id === id);
    if (userIndex !== -1) {
        if (req.body.HightScore) {
            users[userIndex].HightScore = req.body.HightScore
        }
        res.send({ msg: 'User updated' });
    } else {
        res.status(404).json({ msg: 'User not found' });
    }
});//update user


//Get the top 10 players withe the max score
router.get('/score', (req, res) => {
    let max = 10;
    if (max > users.length) { max = users.length };
    const scores = users.map(i => { return { email: i.email, score: i.HightScore }; })
        .sort((a, b) => b.score - a.score)
        .splice(0, max);
    res.json(scores);
});//Get the high scores

export default router;