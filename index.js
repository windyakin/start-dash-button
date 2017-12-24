const Dasher = require('node-dash-button');
const Dotenv = require('dotenv');

const VideoPlayer = require('./module/video-player.js');
const PiUtil = require('./module/pi-util.js');

Dotenv.config({ path: './.env' });
const Dash = Dasher(process.env.DASH_BUTTON_MAC_ADDRESS, null, null, 'all');

(async () => {
  const videoPlayer = await new VideoPlayer();
  videoPlayer.on('play', (video) => {
    console.log(`video start (${video})`);
    PiUtil.changeMonitorPower('on');
  });
  videoPlayer.on('stop', () => {
    console.log('video end');
    PiUtil.changeMonitorPower('off');
  });
  PiUtil.changeMonitorPower('off');
  Dash.on('detected', () => {
    console.log('detected');
    if (videoPlayer.Playing) {
      videoPlayer.stop();
    } else {
      videoPlayer.play();
    }
  });
})();
