const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');

const SITE_HS_SITE = 'https://horriblesubs.info';
const SITE_HS_API = 'https://horriblesubs.info/api.php';

const promises = [];

const pause = interval => {
  return new Promise(resolve => setTimeout(resolve, interval));
};

const getSeries = async type => {
  let series = [];
  let urlType = '';

  switch (type) {
    case 'current':
      urlType = url.resolve(SITE_HS_SITE, '/current-season');
      break;
    case 'all':
      urlType = url.resolve(SITE_HS_SITE, '/shows');
      break;
    default:
      urlType = SITE_HS_SITE;
  }

  await axios
    .get(urlType)
    .then(res => {
      const $ = cheerio.load(res.data);

      $('.ind-show > a').each((i, elem) => {
        series.push({
          title: $(elem).attr('title'),
          link: url.resolve(SITE_HS_SITE, $(elem).attr('href'))
        });
      });
    })
    .catch(err => console.log(err.message));

  return series;
};

const getSeriesDetails = async showUrl => {
  let showId = '';
  let title = '';

  await axios
    .get(showUrl)
    .then(res => {
      const $ = cheerio.load(res.data);

      title = $('h1').text();

      const showIdScript = $('script').filter((i, elem) => {
        return (
          $(elem)
            .html()
            .trim()
            .indexOf('var hs_showid') >= 0
        );
      });

      showId = $(showIdScript).html();

      showId = showId
        .substring(showId.indexOf('=') + 1, showId.indexOf(';'))
        .substr(1);
    })
    .catch(err => console.log(err.message));

  return { showId, title };
};

module.exports = { getSeries, getSeriesDetails };
