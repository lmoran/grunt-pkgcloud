var commands = {};
var pkgcloud = require('pkgcloud'), utils = require("../lib/utils"), _ = require("underscore");

/**
 * Prints data about available networks
 */
commands.getnetworks = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getNetworkClient(clientOptions),
      "getNetworks", options, done);
};

/**
 * Prints data about available subnets
 */
commands.getsubnets = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getNetworkClient(clientOptions),
      "getSubnets", options, done);
};

module.exports = commands;
