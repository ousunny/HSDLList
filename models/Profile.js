const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  series: [
    {
      showId: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      latest: {
        type: String,
        required: true
      }
    }
  ],
  episodes: [
    {
      title: {
        type: String,
        required: true
      },
      episode: {
        type: String,
        required: true
      },
      links: {
        '360p': [
          {
            server: {
              type: String
            },
            link: {
              type: String
            }
          }
        ],
        '480p': [
          {
            server: {
              type: String
            },
            link: {
              type: String
            }
          }
        ],
        '720p': [
          {
            server: {
              type: String
            },
            link: {
              type: String
            }
          }
        ],
        '1080p': [
          {
            server: {
              type: String
            },
            link: {
              type: String
            }
          }
        ]
      }
    }
  ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
