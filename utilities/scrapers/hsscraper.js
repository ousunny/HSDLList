const axios = require('axios');
const cheerio = require('cheerio');

const SITE_HS_SITE = 'https://horriblesubs.info';
const SITE_HS_API = 'https://horriblesubs.info/api.php';

const promises = [];

const pause = interval => {
  return new Promise(resolve => setTimeout(resolve, interval));
};

const getCurrentSeason = async () => {
  let series = [];

  await axios
    .get(SITE_HS_SITE + '/current-season')
    .then(res => {
      const $ = cheerio.load(res.data);

      $('.ind-show > a').each((i, elem) => {
        series.push({
          title: $(elem).attr('title'),
          link: $(elem).attr('href')
        });
      });
    })
    .catch(err => console.log(err.message));

  return series;
};

module.exports = { getCurrentSeason };
