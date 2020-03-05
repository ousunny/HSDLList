const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) return res.status(400).json({ msg: 'No profile for user' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/profile
// @desc    Create profile for user
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const newProfile = new Profile({ user: req.user.id });

    const profile = await newProfile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/profile/series
// @desc    Add a series to profile
// @access  Private
router.post('/series', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile)
      return res.status(400).json({ msg: 'Profile does not exist for user' });

    const { showId, title, latest } = req.body;

    const isExist = profile.series.some(show => show.showId === showId);
    if (isExist)
      return res.status(400).json({ msg: 'Show is already on your list' });

    const newSeries = { showId, title, latest };

    profile.series.push(newSeries);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PATCH api/profile/series
// @desc    Remove series from profile
// @access  Private
router.patch('/series', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile)
      return res.status(400).json({ msg: 'Profile does not exist for user' });

    const { showIds } = req.body;

    profile.series = profile.series.filter(
      show => !showIds.includes(show.showId)
    );

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PATCH api/profile/episodes
// @desc    Remove episode from profile
// @access  Private
router.patch('/episodes', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile)
      return res.status(400).json({ msg: 'Profile does not exist for user' });

    const { episodes } = req.body;

    profile.episodes = profile.episodes.filter(
      episode => !episodes.includes(episode._id)
    );

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
