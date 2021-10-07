const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user-models')

// auth login
router.get('/login', (req, res) => {
    // res.render('login', { user: req.user });
    res.send('Hi')
});

// auth logout
router.get('/logout', (req, res) => {
    // req.logout();
    // res.redirect('/');
});

router.post('/registers',(req, res, next)=>{
    passport.authenticate('signups')(req, res, next)
})


// auth with google+
// router.get('/google', passport.authenticate('google', {
//     scope: ['profile']
// }));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
// router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
//     // res.send(req.user);
//     res.redirect('/profile');
// });

module.exports = router;