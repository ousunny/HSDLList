const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const { getCurrentSeason } = require('../../utilities/scrapers/hsscraper');

// @route   GET api/series/current
// @desc    Get all currently airing series
// @access  Private
router.get('/current', auth, async (req, res) => {
  try {
    const series = await getCurrentSeason();

    res.json(series);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/series/all
// @desc    Get all available series
// @access  Private
router.get('/all', auth, async (req, res) => {
  try {
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/series/update
// @desc    Update series and episodes
// @access  Private
router.get('/update', auth, async (req, res) => {
  try {
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
