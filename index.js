const Dasher = require('node-dash-button');
const Dotenv = require('dotenv');
const Log4js = require('log4js');

const logger = Log4js.getLogger('default');
const VideoPlayer = require('./module/video-player.js');
const PiUtil = require('./module/pi-util.js');

Dotenv.config({ path: './.env' });
const Dash = Dasher(process.env.DASH_BUTTON_MAC_ADDRESS, null, null, 'all');

(async () => {
  logger.level = 'debug';

  const videoPlayer = await new VideoPlayer();
  videoPlayer.on('play', (video) => {
    logger.info(`Start play video: ${video}`);
    PiUtil.changeMonitorPower('on');
  });
  videoPlayer.on('stop', () => {
    logger.info('Finish play video');
    PiUtil.changeMonitorPower('off');
  });
  PiUtil.changeMonitorPower('off');
  Dash.on('detected', (dashId) => {
    logger.debug(`Detected: ${dashId}`);
    if (videoPlayer.Playing) {
      videoPlayer.stop();
    } else {
      videoPlayer.play();
    }
  });
})();
