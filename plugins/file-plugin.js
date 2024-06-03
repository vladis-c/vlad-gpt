const {createRunOncePlugin} = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const withCopyFile = config => {
  return {
    ...config,
    android: {
      ...config.android,
      dangerous: {
        ...config.android.dangerous,
        ...copyFileToAndroidApp(),
      },
    },
  };
};

const copyFileToAndroidApp = () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  const sourceFilePath = '../google-services.json';
  const targetFileName = 'google-services.json';
  const sourceFile = path.resolve(__dirname, sourceFilePath);
  const targetDir = '../android/app';
  const targetFile = path.resolve(__dirname, targetDir, targetFileName);

  if (!fs.existsSync(targetFile)) {
    try {
      fs.copyFileSync(sourceFile, targetFile);
      console.log(`File ${sourceFilePath} copied to ${targetDir}`);
    } catch (err) {}
  }
};

module.exports = createRunOncePlugin(withCopyFile, 'withCopyFile');
