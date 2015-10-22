var commands = {};
var pkgcloud = require('pkgcloud');
var utils = require("../lib/utils");

/**
 * Prints data about available servers
 */
commands.getservers = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getComputeClient(clientOptions),
      "getServers", null, done);
};

module.exports = commands;
