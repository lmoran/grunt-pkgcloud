/**
 * Integration tests for security groups
 */

"use strict";

var expect = require("chai").expect, _ = require("underscore"), utils = require("../../lib/utils");

// Loads test configuration
var testConfig = utils.getConfig();

describe("securitygroups", function() {

  describe("listsecuritygroup", function() {
    it("lists security groups", function(done) {
      utils.gruntExec("getsecuritygroups", {}, function(err, stdout, stderr) {
        if (err) {
          console.log(err);
          expect(false).equals(true);
          done();
        }

        var lines = stdout.split("\n");
        expect(lines.length).above(2);
        done();
      });
    });
  });

  describe("managesecuritygroup", function() {
    it("adds and removes a security group", function(done) {
      utils.gruntExec("createsecuritygroup", {
        name : "testSecurityGroup",
        description : "Security group used for test",
        tenantId : testConfig.pkgcloud.test.tenantId
      }, function(err, stdout, stderr) {
        if (err) {
          console.log(err);
          expect(false).equals(true);
          done();
        }

        var lines = stdout.split("\n");
        expect(lines.length).above(2);
        var id = lines[1].split("Created security group: ")[1];

        utils.gruntExec("destroysecuritygroup", {
          id : id
        }, function(err, stdout, stderr) {
          if (err) {
            console.log(err);
            expect(false).equals(true);
            done();
          }

          var lines = stdout.split("\n");
          expect(lines.length).above(2);
          done();
        });

      });
    });
  });

});
