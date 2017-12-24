const Promise = require('bluebird');
const File = Promise.promisifyAll(require('fs'));

module.exports = class PiUtil {
  static async changeMonitorPower(power) {
    try {
      await File.writeFileAsync('/sys/class/backlight/rpi_backlight/bl_power', (power === 'on' ? '0' : '1'));
    } catch (err) {
      throw err;
    }
  }
};
