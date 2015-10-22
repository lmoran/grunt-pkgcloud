var commands = {};
var pkgcloud = require('pkgcloud');
var utils = require("../lib/utils");

/**
 * Prints data about available security groups
 */
commands.getsecuritygroups = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getNetworkClient(clientOptions),
      "getSecurityGroups", null, done);
};

/**
 * Prints data about a security group
 */
commands.getsecuritygroup = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getNetworkClient(clientOptions),
      "getSecurityGroup", [options.id], done);
};

/**
 * Prints data about available security group rules
 */
commands.getsecuritygrouprules = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getNetworkClient(clientOptions),
      "getSecurityGroupRules", null, done);
};

/**
 * Prints data about a security group rule
 */
commands.getsecuritygrouprule = function(grunt, clientOptions, options, done) {
  utils.logResultArray(grunt, utils.getNetworkClient(clientOptions),
      "getSecurityGroupRule", [options.id], done);
};

module.exports = commands;
