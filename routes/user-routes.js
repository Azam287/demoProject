const router = require('express').Router();
const User = require('../models/user-models');

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.send({ users });
});

router.get('/user', async (req, res) => {
    const {
        user: {
            id
        }
    } = req.body;
    const users = await User.findOne({ id });
    res.send({ users });
})


module.exports = router;