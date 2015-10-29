var commands = {};
var pkgcloud = require('pkgcloud');
var utils = require("../lib/utils");

/**
 * Prints data about available security groups
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the Docker client
 * @param {Object}
 *          options not used
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.getsecuritygroups = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getNetworkClient(clientOptions),
      "getSecurityGroups", null, done);
};

/**
 * Prints data about a security group
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the Docker client
 * @param {Object}
 *          options.id ID of the security group
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.getsecuritygroup = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getNetworkClient(clientOptions),
      "getSecurityGroup", [ options.id ], done);
};

/**
 * Creates a security group
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the Docker client
 * @param {Object}
 *          options .name and .description of the security group
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.createsecuritygroup = function(grunt, clientOptions, options, done) {

  utils.getNetworkClient(clientOptions).createSecurityGroup(options,
      function(err, result) {
        utils.dealWithError(err, done);
        grunt.log.ok("Created security group: " + result.id);
        done();
      });
};

/**
 * Deletes a security group
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the Docker client
 * @param {Object}
 *          options.id ID of the security group
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.destroysecuritygroup = function(grunt, clientOptions, options, done) {
  utils.getNetworkClient(clientOptions).destroySecurityGroup(options.id,
      function(err, id) {
        utils.dealWithError(err, done);
        grunt.log.ok("Deleted security group: " + id);
        done();
      });
};

module.exports = commands;
