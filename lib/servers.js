var commands = {};
var pkgcloud = require("pkgcloud");
var _ = require("underscore");
var utils = require("../lib/utils");

/**
 * Prints data about available servers *
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
commands.getservers = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getComputeClient(clientOptions),
      "getServers", null, done);
};

/**
 * Prints data about a server
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the PkgCloud client
 * @param {Object}
 *          options.id ID of the server
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.getserver = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getComputeClient(clientOptions),
      "getServer", [ options.id ], done);
};

/**
 * Creates a server
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the PkgCloud client
 * @param {Object}
 *          options Options for the server creation
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.createserver = function(grunt, clientOptions, options, done) {

  // Converts some parameters into Objects/Arrays or encodes in Base64
  var optionsRev = _.clone(options);
  optionsRev.security_groups = (options.security_groups) ? JSON
      .parse(options.security_groups.replace(/\'/g, "\"")) : undefined;
  optionsRev.networks = (options.networks) ? JSON.parse(options.networks
      .replace(/\'/g, "\"")) : undefined;

  utils.getComputeClient(clientOptions).createServer(optionsRev,
      function(err, result) {
        utils.dealWithError(err, done);
        grunt.log.ok("Created server: " + result.id);
        utils.logResultObject(grunt, result, done);
      });
};

/**
 * Prints the addresses of a server
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the PkgCloud client
 * @param {Object}
 *          options .id ID of the server, .type of IP addre (IPv4|IPv6)
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.getserveraddresses = function(grunt, clientOptions, options, done) {
  grunt.log.ok("zone,ipversion,address");
  utils.getComputeClient(clientOptions).getServerAddresses(options.id,
      function(err, result) {
        utils.dealWithError(err, done);
        _.keys(result).forEach(function(zoneName) {
          result[zoneName].forEach(function(addr) {
            grunt.log.ok(zoneName + "," + addr.version + "," + addr.addr);
          });
        });
        done();
      });
};

/**
 * Renames a server
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the v client
 * @param {Object}
 *          options .id ID of the server, .name New name of the server
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.renameserver = function(grunt, clientOptions, options, done) {
  utils.getComputeClient(clientOptions).renameServer(options.id, options.name,
      function(err) {
        utils.dealWithError(err, done);
        grunt.log.ok("Renamed server: " + options.id);
        done();
      });
};

/**
 * Reboots a server
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the PkgCloud client
 * @param {Object}
 *          .id ID of the server, .type Reboot type (SOFT|HARD)
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.rebootserver = function(grunt, clientOptions, options, done) {
  utils.getComputeClient(clientOptions).rebootServer(options.id, {
    type : options.type.toUpperCase()
  }, function(err, body) {
    utils.dealWithError(err, done);
    grunt.log.ok("Rebooted server: " + options.id);
    done();
  });
};

/**
 * Starts a server
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the PkgCloud client
 * @param {Object}
 *          .id ID of the server
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.startserver = function(grunt, clientOptions, options, done) {
  utils.getComputeClient(clientOptions).startServer(options.id,
      function(err, body) {
        utils.dealWithError(err, done);
        grunt.log.ok("Started server: " + options.id);
        done();
      });
};

/**
 * Stops a server
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the PkgCloud client
 * @param {Object}
 *          .id ID of the server
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.stopserver = function(grunt, clientOptions, options, done) {
  utils.getComputeClient(clientOptions).stopServer(options.id,
      function(err, body) {
        utils.dealWithError(err, done);
        grunt.log.ok("Stopped server: " + options.id);
        done();
      });
};

/**
 * Destroys a server
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the PkgCloud client
 * @param {Object}
 *          .id ID of the server
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.destroyserver = function(grunt, clientOptions, options, done) {
  utils.getComputeClient(clientOptions).destroyServer(options.id,
      function(err, body) {
        utils.dealWithError(err, done);
        grunt.log.ok("Destroyied server: " + options.id);
        done();
      });
};

module.exports = commands;
