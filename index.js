const Dasher = require('node-dash-button');
const OmxManager = require('omx-manager');
const Dotenv = require('dotenv');

Dotenv.config({ path: './.env' });
const Dash = Dasher(process.env.DASH_BUTTON_MAC_ADDRESS, null, null, 'all');

const omxPlayer = new OmxManager({ position: '0,0,800,400' });
Dash.on('detected', () => {
  console.log('detected');
  const player = omxPlayer.create('video/sample.mp4', { '--win': '0,0,800,480' });
  player.play();
  player.on('end', () => {
    console.log('Video play end');
  });
});
