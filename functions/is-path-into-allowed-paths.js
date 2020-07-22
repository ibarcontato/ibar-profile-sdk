const { throwIfIsNotArray, throwIfIsNotString } = require('ibar-sdk').throws;

module.exports = function isPathIntoAllowedPaths(allowedPaths, path) {
  throwIfIsNotArray(allowedPaths, '"allowedPaths" should be a list.');
  throwIfIsNotString(path, '"path" should be a string.');
  return allowedPaths.includes(path);
}