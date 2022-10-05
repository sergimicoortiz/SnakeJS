import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5';
const router = express.Router();

let users = [{
    id: uuidv4(),
    name: 'pepito',
    email: 'pepito@pepito.com',
    password: md5('pepito')
}];

router.get('/user/:name', (req, res) => {
    const name = req.params.name;
    const user = users.find(e => e.name === name);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ msg: 'User not found' });
    }
});//default

export default router;