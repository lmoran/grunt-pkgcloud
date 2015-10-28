/*
 * grunt-pkgcloud
 * https://github.com/shareworks/grunt-pkgcloud
 *
 * Copyright (c) 2014 Raymond Jelierse
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

  grunt.initConfig({
    config : grunt.file.readJSON("config.json"),

    jshint : {
      all : [ "Gruntfile.js", "tasks/*.js" ],
      options : {
        jshintrc : ".jshintrc"
      }
    },

    pkgcloud : {
      options : {
        client : {
          authUrl : "<%= config.pkgcloud.authUrl %>",
          region : "<%= config.pkgcloud.region %>",
          username : "<%= config.pkgcloud.username %>",
          password : "<%= config.pkgcloud.password %>",
          provider : "<%= config.pkgcloud.provider %>",
          tenantName : "<%= config.pkgcloud.tenantName %>"
        }
      },
      test : {
        options : {
          client : {
            provider : "openstack",
            username : "<%= config.objectstore.username %>",
            password : "<%= config.objectstore.password %>",
            tenantId : "<%= config.objectstore.tenant %>",
            authUrl : "https://identity.stack.cloudvps.com",
            region : "NL"
          }
        },
        files : [ {
          cwd : "dist",
          src : "**",
          dest : "shareworks.nl"
        } ],
      },
      getsecuritygroup : {
        id : grunt.option("id")
      },
      createsecuritygroup : {
        name : grunt.option("name"),
        description : grunt.option("description"),
        tenantId : grunt.option("tenantid")
      },
      destroysecuritygroup : {
        id : grunt.option("id")
      },
      getsecuritygrouprule : {
        id : grunt.option("id")
      }
    }

  });

  grunt.loadTasks("tasks");

  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.registerTask("test", [ "clean", "pkgcloud:test" ]);
  grunt.registerTask("default", [ "jshint" ]);

};
