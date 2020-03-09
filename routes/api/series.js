const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');

const {
  getSeries,
  getSeriesDetails,
  getUpdatedSeries
} = require('../../utilities/scrapers/hsscraper');

// @route   GET api/series/current
// @desc    Get all currently airing series
// @access  Private
router.get('/current', auth, async (req, res) => {
  try {
    const series = await getSeries('current');

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
    const series = await getSeries('all');

    res.json(series);
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
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile)
      return res.status(400).json({ msg: 'Profile does not exist for user' });

    const { series, episodes } = await getUpdatedSeries(profile.series);

    profile.series = series;
    profile.episodes = profile.episodes.concat(episodes);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
