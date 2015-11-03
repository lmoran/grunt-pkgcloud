/**
 * Integration tests for security group rules
 */

"use strict";

var expect = require("chai").expect, _ = require("underscore"), utils = require("../../lib/utils");

// Loads test configuration
var testConfig = utils.getConfig();

describe("securitygrouprules", function() {

  describe("listsecuritygrouprules", function() {
    it("lists security group rules", function(done) {
      utils.gruntExec("getsecuritygrouprules", {},
          function(err, stdout, stderr) {
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

  describe("managesecuritygrouprule", function() {
    it("adds and removes a security group rule", function(done) {

      utils.gruntExec("createsecuritygroup", {
        name : "testSecurityGroup",
        description : "Security group used for test",
        tenantId : "OpenAPI"
      }, function(err, stdout, stderr) {
        if (err) {
          console.log(err);
          expect(false).equals(true);
          done();
        }

        var lines = stdout.split("\n");
        expect(lines.length).above(2);
        var securityGroupId = lines[1].split("Created security group: ")[1];

        utils.gruntExec("createsecuritygrouprule", {
          securityGroupId : securityGroupId,
          name : "testSecurityGroupRule",
          description : "Security group rule used for test",
          direction : "ingress",
          ethertype : "IPv4",
          portRangeMin : 8000,
          portRangeMax : 8080,
          protocol : "tcp",
          remoteGroupId : undefined,
          remoteIpPrefix : testConfig.pkgcloud.test.remoteIpPrefix,
          tenantId : testConfig.pkgcloud.test.tenantId
        }, function(err, stdout, stderr) {
          if (err) {
            console.log(JSON.stringify(err));
            expect(false).equals(true);
            done();
          }

          var lines = stdout.split("\n");
          expect(lines.length).above(2);
          var id = lines[1].split("Created security group rule: ")[1];
          utils.gruntExec("destroysecuritygrouprule", {
            id : id
          }, function(err, stdout, stderr) {
            if (err) {
              console.log(err);
              expect(false).equals(true);
              done();
            }

            var lines = stdout.split("\n");
            expect(lines.length).above(2);

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
  });
});
