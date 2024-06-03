const {withProjectBuildGradle} = require('@expo/config-plugins');

const withProjectBuildGradlePlaceholders = cnfg => {
  return withProjectBuildGradle(cnfg, config => {
    config.modResults.contents = applyProjectBuildGradle(
      config.modResults.contents,
    );
    return config;
  });
};

const applyProjectBuildGradle = gradleContent => {
  const splitAt = 'dependencies {';
  const parts = gradleContent.split(splitAt);
  const dependencyLine = "classpath 'com.google.gms:google-services:4.4.1'";
  const withInjected = `${parts[0]}${splitAt}
        ${dependencyLine}${parts[1]}`;
  return withInjected;
};

module.exports = withProjectBuildGradlePlaceholders;
