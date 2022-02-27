'use strict';

const os = require('os');
const dayjs = require('dayjs');

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
