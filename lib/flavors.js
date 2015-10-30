/**
 * Grunt tasks about flavors
 */

var commands = {};
var pkgcloud = require("pkgcloud");
var _ = require("underscore");
var utils = require("../lib/utils");

/**
 * Prints data about available flavors
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the PkgCloud client
 * @param {Object}
 *          options not used
 * @param {Function}
 *          done Callback to call when the request is completed
 * 
 */
commands.getflavors = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getComputeClient(clientOptions),
      "getFlavors", null, done);
};

/**
 * Prints data about a flavor
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the PkgCloud client
 * @param {Object}
 *          options.id ID of the flavor
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.getflavor = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getComputeClient(clientOptions),
      "getFlavor", [ options.id ], done);
};

module.exports = commands;
