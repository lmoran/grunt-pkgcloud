/*
 * grunt-pkgcloud
 * https://github.com/shareworks/grunt-pkgcloud
 *
 * Copyright (c) 2014 Raymond Jelierse
 * Licensed under the MIT license.
 */

"use strict";

var pkgcloud = require("pkgcloud"), utils = require("../lib/utils"), _ = require("underscore");

module.exports = function(grunt) {

  // Puts all the exported functions of the various modules in commands
  var commands = _.extend(require("../lib/containers"),
      require("../lib/servers"), require("../lib/networks"),
      require("../lib/securitygroups"));

  // Process the given command with arg.
  var processCommand = function(command, options, arg) {
    if (!arg) {
      arg = "default";
    }

    if (!commands[command]) {
      grunt.fail.fatal("Command [" + command + "] not found.");
    }

    // Check arg
    if (typeof (commands[command]) !== "function") {
      if (!commands[command][arg]) {
        grunt.fail.fatal("Argument [" + arg + "] for [" + command
            + "] not found.");
      }
    }

    var func = (arg) ? commands[command][arg] : commands[command];
    if (!func) {
      func = commands[command]; // fallback to the main function
    }

    var done = this.async();

    var callback = function(e) {
      if (e) {
        grunt.fail.warn(e);
      }
      done();
    };

    // Expands the client options
    var clientOptions= {
        authUrl: grunt.config.get("pkgcloud.options.client.authUrl"),
        region: grunt.config.get("pkgcloud.options.client.region"),
        username: grunt.config.get("pkgcloud.options.client.username"),
        password: grunt.config.get("pkgcloud.options.client.password"),
        provider: grunt.config.get("pkgcloud.options.client.provider"),
        tenantName: grunt.config.get("pkgcloud.options.client.tenantName")
    };

    func
        .apply(this, [ grunt, clientOptions, options[command], callback, arg ]);
  };

  // For each command, creates the grunt task
  _.keys(commands).forEach(
      function(command) {

        grunt.task.registerTask("pkgcloud:" + command, function(arg) {
          processCommand.apply(this, [ command,
              grunt.config.data.pkgcloud, arg ]);
        });
      });

  // Register the Grunt multi task
  grunt.registerMultiTask("pkgcloud", "Pkg-cloud tasks", processCommand);
};
