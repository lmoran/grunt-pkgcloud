/**
 * Grunt tasks for managing imahes
 * 
 * TODO: createImage, destroyImage, updateImageMeta
 */

var commands = {};
var pkgcloud = require("pkgcloud");
var _ = require("underscore");
var utils = require("../lib/utils");

/**
 * Prints data about available images
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
commands.getimages = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getComputeClient(clientOptions),
      "getImages", null, done);
};

/**
 * Prints data about an image
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the PkgCloud client
 * @param {Object}
 *          options.id ID of the image
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.getimage = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getComputeClient(clientOptions),
      "getImage", [ options.id ], done);
};

module.exports = commands;
