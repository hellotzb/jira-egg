'use strict';

const os = require('os');
const dayjs = require('dayjs');
const md5 = require('md5');

module.exports = {
  // this 是 helper 对象，在其中可以调用其他 helper 方法
  // this.ctx => context 对象
  // this.app => application 对象
  machineInfo() {
    return {
      memorys: os.totalmem() / 1024 / 1024 / 1024 + 'G', // 获取本机内存大小
      platform: os.platform(),
      cpus: os.cpus().length,
    };
  },
  encryptedPwd(password) {
    // md5可以进行反解密，需要进行加盐处理
    return md5(password + this.app.config.salt);
  },
  formatTime() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
  },
  unPick(source, arr) {
    if (!Array.isArray(arr)) return;
    const newObj = {};
    for (const k in source) {
      if (!arr.includes(k)) {
        newObj[k] = source[k];
      }
    }
    return newObj;
  },
};
