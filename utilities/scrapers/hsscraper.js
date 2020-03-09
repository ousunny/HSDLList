const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');

const SITE_HS_SITE = 'https://horriblesubs.info';
const SITE_HS_API = 'https://horriblesubs.info/api.php';

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

const getEpisodes = async series => {
  let episodes = [];

  for (let i = 0; i < series.length; i++) {
    await pause(500);
    await axios
      .get(SITE_HS_API, {
        params: {
          method: 'getshows',
          type: 'show',
          showid: series[i].showId,
          nextid: 0
        }
      })
      .then(res => {
        const $ = cheerio.load(res.data);
        const profileLatest = parseInt(series[i].latest);
        const title = series[i].title;
        let latestEpisode = profileLatest;
        let currentEpisode = profileLatest;

        const rlsInfoContainer = $('.rls-info-container').each((i, elem) => {
          currentEpisode = parseInt($(elem).attr('id'));

          if (currentEpisode <= profileLatest) return false;

          if (i === 0) latestEpisode = currentEpisode;

          if (i === 0 && profileLatest === latestEpisode) return false;

          const episode = {
            title,
            episode: currentEpisode,
            links: {
              '360p': {
                server: 'Magnet',
                link: $(elem)
                  .find('.link-360p > .hs-magnet-link > a')
                  .attr('href')
              },
              '480p': {
                server: 'Magnet',
                link: $(elem)
                  .find('.link-480p > .hs-magnet-link > a')
                  .attr('href')
              },
              '720p': {
                server: 'Magnet',
                link: $(elem)
                  .find('.link-720p > .hs-magnet-link > a')
                  .attr('href')
              },
              '1080p': {
                server: 'Magnet',
                link: $(elem)
                  .find('.link-1080p > .hs-magnet-link > a')
                  .attr('href')
              }
            }
          };

          episodes.push(episode);
        });

        series[i].latest = latestEpisode;
      })
      .catch(err => console.log(err));
  }

  return { series, episodes };
};

const getUpdatedSeries = async profileSeries => {
  return await getEpisodes(profileSeries);
};

module.exports = { getSeries, getSeriesDetails, getUpdatedSeries };
