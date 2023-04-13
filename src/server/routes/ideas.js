// routes/ideas.js
// TODO: Make sure to use the ensureAuthenticated middleware for routes that require authentication.
const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

router.post('/', ensureAuthenticated, async (req, res) => {
  // Create a new idea
});

router.get('/', async (req, res) => {
  // Retrieve all ideas
});

router.get('/:id', async (req, res) => {
  // Retrieve a specific idea
});

router.put('/:id', ensureAuthenticated, async (req, res) => {
  // Update a specific idea
});

router.delete('/:id', ensureAuthenticated, async (req, res) => {
  // Delete a specific idea
});

module.exports = router;
