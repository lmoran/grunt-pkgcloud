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
          },
        },
        files : [ {
          cwd : "dist",
          src : "**",
          dest : "shareworks.nl"
        } ]
      },
      getimage : {
        id : grunt.option("id")
      },
      getflavor : {
        id : grunt.option("id")
      },
      getserver : {
        id : grunt.option("id")
      },
      getserveraddresses : {
        id : grunt.option("id")
      },
      createserver : {
        tenant_id : grunt.option("tenant_id"),
        security_groups : grunt.option("security_groups"),
        user_data : grunt.option("user_data"),
        availability_zone : grunt.option("availability_zone"),
        server : grunt.option("server"),
        imageRef : grunt.option("imageRef"),
        flavorRef : grunt.option("flavorRef"),
        networks : grunt.option("networks"),
        uuid : grunt.option("uuid"),
        port : grunt.option("port"),
        fixed_ip : grunt.option("fixed_ip"),
        name : grunt.option("name"),
        metadata : grunt.option("metadata"),
        personality : grunt.option("personality"),
        block_device_mapping_v2 : grunt.option("block_device_mapping_v2 "),
        device_name : grunt.option("device_name"),
        source_type : grunt.option("source_type"),
        destination_type : grunt.option("destination_type "),
        delete_on_termination : grunt.option("delete_on_termination"),
        guest_format : grunt.option("guest_format"),
        boot_index : grunt.option("boot_index"),
        config_drive : grunt.option("config_drive"),
        key_name : grunt.option("key_name"),
        "os:scheduler_hints" : grunt.option("scheduler_hints "),
        "OS-DCF:diskConfig" : grunt.option("diskConfig")
      },
      renameserver : {
        id : grunt.option("id"),
        name : grunt.option("name")
      },
      rebootserver : {
        id : grunt.option("id"),
        type : grunt.option("type")
      },
      startserver : {
        id : grunt.option("id")
      },
      stopserver : {
        id : grunt.option("id")
      },
      destroyserver : {
        id : grunt.option("id")
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
      },
      createsecuritygrouprule : {
        securityGroupId : grunt.option("securityGroupId"),
        name : grunt.option("name"),
        description : grunt.option("description"),
        direction : grunt.option("direction"),
        ethertype : grunt.option("ethertype"),
        portRangeMin : grunt.option("portRangeMin"),
        portRangeMax : grunt.option("portRangeMax"),
        protocol : grunt.option("protocol"),
        remoteGroupId : grunt.option("remoteGroupId"),
        remoteIpPrefix : grunt.option("remoteIpPrefix")
      },
      destroysecuritygrouprule : {
        id : grunt.option("id")
      }
    }

  });

  grunt.loadTasks("tasks");

  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.registerTask("test", [ "clean", "pkgcloud:test" ]);
  grunt.registerTask("default", [ "jshint" ]);

};
