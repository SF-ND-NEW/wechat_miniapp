// 根据环境选择配置
const accountInfo = wx.getAccountInfoSync().miniProgram;
const envVersion = accountInfo.envVersion;

let env = require('./prod.js');

// 开发版或体验版使用开发环境配置
if (envVersion === 'develop' || envVersion === 'trial') {
  env = require('./dev.js');
}

// 添加环境标识
env.ENV_TYPE = envVersion;
env.IS_DEV = envVersion !== 'release';

module.exports = env;