const EventEmitter = require('events');
const OmxManager = require('omx-manager');

const VideoFile = require('./video-file.js');

module.exports = class VideoPlayer extends EventEmitter {
  constructor() {
    super();
    this.omx = new OmxManager();
    this.player = null;
    this.playing = false;
    return new Promise((resolve, reject) => {
      (new VideoFile()).then((videoFile) => {
        this.videoFile = videoFile;
        resolve(this);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  get Playing() {
    return this.playing;
  }

  play() {
    if (this.player === null) {
      const video = this.videoFile.getRandom();
      this.player = this.omx.create(video, { '--win': '0,0,800,480' });
      this.player.play();
      this.playing = true;
      this.player.on('end', () => this.stop());
      this.emit('play', video);
    } else {
      throw new Error('Already playing the video?');
    }
  }

  stop() {
    if (this.player !== null) {
      this.player.stop();
      this.player = null;
      this.playing = false;
      this.emit('stop');
    }
  }
};
