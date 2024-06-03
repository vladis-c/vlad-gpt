const {withAppBuildGradle} = require('@expo/config-plugins');

const withAppBuildGradlePlaceholders = cnfg => {
  return withAppBuildGradle(cnfg, config => {
    config.modResults.contents = applyAppBuildGradle(
      config.modResults.contents,
    );
    return config;
  });
};

const applyAppBuildGradle = gradleContent => {
  const splitAt = 'apply plugin: "com.android.application"';
  const parts = gradleContent.split(splitAt);
  const gmsServices = 'apply plugin: "com.google.gms.google-services"';
  const withInjected = `${parts[0]}${splitAt}
${gmsServices}${parts[1]}`;
  return withInjected;
};

module.exports = withAppBuildGradlePlaceholders;
