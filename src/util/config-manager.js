"use strict";

/**
 * @file: Configuration object. Allows for getting and setting of various properties.
 */

var _ = require('lodash');

var config = function() {
  var _config = {};

  /**
   * Shortcut method for .config().
   * @see .config();
   */
  var myConfig = function() {
    return configMethod.apply(this, arguments);
  };

  /**
   * Config get/setter
   * @param - Accepts 0, 1 or 2 parameters
   *
   * .config() - Load config object.
   * .config(obj) - Sets multiple config options.
   * .config(string) - Loads a single config item based on key
   * .config(string, string) - Sets a string
   *
   * @returns {*}
   *   .config() - Returns object.
   *   .config(obj) - Returns resulting config object.
   *   .config(string) - Returns single config object.
   *   .config(string, string) - Returns resulting config object.
   */
  myConfig.config = function () {
    return configMethod.apply(this, arguments);
  };

  /**
   * @see .config().
   */
  function configMethod() {
    if (arguments.length === 0) {
      return _.cloneDeep(_config);
    }

    if (arguments.length === 1) {
      if (_.isObject(arguments[0])) {
        _config = _.defaults(arguments[0], _config);
        return _.cloneDeep(_config);
      } else if (_.isString(arguments[0])) {
        return _config[arguments[0]];
      }
    }

    if (arguments.length === 2) {
      _config[arguments[0]] = arguments[1];
      return _.cloneDeep(_config);
    }
  }

  /**
   *
   * @param key
   * @returns {*|boolean}
   */
  myConfig.has = function(key) {
    return _config.hasOwnProperty(key);
  };

  /**
   *
   * @returns {*}
   */
  myConfig.list = function() {
    return _.keys(_config);
  };

  return myConfig;
};

module.exports = config;
