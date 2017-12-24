const Promise = require('bluebird');
const File = Promise.promisifyAll(require('fs'));

module.exports = class VideoFile {
  constructor() {
    return new Promise((resolve, reject) => {
      this.getFiles()
        .then(() => {
          resolve(this);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getFiles() {
    this.files = await (await File.readdirAsync('./video')).filter((file) => {
      const filePath = `./video/${file}`;
      return File.statSync(filePath).isFile() && /^.+\.mp4$/.test(filePath);
    });
  }

  getRandom() {
    const random = Math.floor(Math.random() * this.files.length);
    return `./video/${this.files[random]}`;
  }
};
