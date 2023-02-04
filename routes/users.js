const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user')

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', catchAsync(async(req, res, next) => {
    try{
        const {email, username, password} = req.body; 
        const user = new User({email, username})
        const registeredUser = await User.register(user, password); 
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', 'welcome to ramenrater')
            res.redirect('/dishes')
        })
    } catch(e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}))

router.get('/login', (req, res) => {
    res.render('users/login'); 
})

//flash error message if user was not authenticated
// router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
//     req.flash('success', 'Welcome back!')
//     const redirectUrl = req.session.returnTo || '/dishes'
//     delete req.session.returnTo;
//     res.redirect(redirectUrl)
// })

router.post('/login', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
    keepSessionInfo: true
    }), (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  });

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err) }
        req.flash('success', "Logged you out!")
        res.redirect('/dishes'); 
    })
    
})

module.exports = router; 