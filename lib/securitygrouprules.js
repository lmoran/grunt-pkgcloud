var commands = {};
var pkgcloud = require('pkgcloud');
var utils = require("../lib/utils");

/**
 * Prints data about available security group rules
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
commands.getsecuritygrouprules = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getNetworkClient(clientOptions),
      "getSecurityGroupRules", null, done);
};

/**
 * Prints data about a security group rule
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the PkgCloud client
 * @param {Object}
 *          options.id ID of the security group
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.getsecuritygrouprule = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getNetworkClient(clientOptions),
      "getSecurityGroupRule", [ options.id ], done);
};

/**
 * Creates a security group rule
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the PkgCloud client
 * @param {Object}
 *          options .securityGroupId The security group ID to associate with
 *          this security group rule. .direction The direction ("ingress" or
 *          "egress") in which the security group rule is applied. .ethertype
 *          "IPv4" or "IPv6". .portRangeMin The minimum port number in the range
 *          that is matched by the security group rule. .portRangeMax The
 *          maximum port number in the range that is matched by the security
 *          group rule. .protocol The protocol ("tcp", "udp", or "icmp") that is
 *          matched by the security group rule. .remoteGroupId The remote group
 *          ID to be associated with this security group rule. You can specify
 *          either this or remoteIpPrefix. .remoteIpPrefix The remote IP prefix
 *          to be associated with this security group rule. .tenantId ID of
 *          tenant. .name Name of rule. .description Description of rule
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.createsecuritygrouprule = function(grunt, clientOptions, options, done) {
  utils.getNetworkClient(clientOptions).createSecurityGroupRule(options,
      function(err, result) {
        grunt.log.ok("Created security group rule: " + result.id);
        utils.dealWithError(err, done);
        done();
      });
};

/**
 * Deletes a security group rule
 * 
 * @param {Object}
 *          grunt The Grunt instance
 * @param {Object}
 *          clientOptions Options to create the PkgCloud client
 * @param {Object}
 *          options.id ID of the security group
 * @param {Function}
 *          done Callback to call when the request is completed
 */
commands.destroysecuritygrouprule = function(grunt, clientOptions, options,
    done) {

  utils.getNetworkClient(clientOptions).destroySecurityGroupRule(options.id,
      function(err, id) {
        utils.dealWithError(err, done);
        grunt.log.ok("Deleted security group rule: " + id);
        done();
      });
};

module.exports = commands;
