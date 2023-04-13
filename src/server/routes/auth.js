// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Logged in');
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();
  res.send('Registered');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.send('Logged out');
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.send('Google OAuth2 success');
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github'), (req, res) => {
  res.send('GitHub OAuth2 success');
});

module.exports = router;
