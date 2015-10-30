var commands = {};
var pkgcloud = require('pkgcloud'), utils = require("../lib/utils"), _ = require("underscore");

/**
 * Prints data about available networks
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the PkgCloud client
 * @param {Object}
 *          options not used
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.getnetworks = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getNetworkClient(clientOptions),
      "getNetworks", options, done);
};

/**
 * Prints data about available subnets
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the PkgCloud client
 * @param {Object}
 *          options not used
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.getsubnets = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getNetworkClient(clientOptions),
      "getSubnets", options, done);
};

module.exports = commands;
