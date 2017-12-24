const Dasher = require('node-dash-button');

require('dotenv').config({ path: './.env' });
const Dash = Dasher(process.env.DASH_BUTTON_MAC_ADDRESS, null, null, 'all');

Dash.on('detected', () => {
  console.log('detected');
});