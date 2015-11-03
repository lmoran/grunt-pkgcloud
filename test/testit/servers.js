/**
 * Integration tests for images
 */

"use strict";

var expect = require("chai").expect, _ = require("underscore"), utils = require("../../lib/utils");

// Loads test configuration
var testConfig = utils.getConfig();

describe(
    "servers",
    function() {

      describe("getservers", function() {
        it("returns a list of servers", function(done) {
          utils.gruntExec("getservers", {}, function(err, stdout, stderr) {
            if (err) {
              console.log(err);
              expect(false).equals(true);
              done();
            }

            var lines = stdout.split("\n");
            expect(lines.length).above(2);
            expect(lines[1].split(",")[2]).equals("status");
            done();
          });
        });
      });

      describe("getflavors", function() {
        it("returns a list of flavors", function(done) {
          utils.gruntExec("getflavors", {}, function(err, stdout, stderr) {
            if (err) {
              console.log(err);
              expect(false).equals(true);
              done();
            }

            var lines = stdout.split("\n");
            expect(lines.length).above(2);
            expect(lines[1].split(",")[4]).equals("vcpus");
            done();
          });
        });
      });

      describe(
          "manageserver",
          function() {
            it(
                "adds and removes a server",
                function(done) {
                  utils
                      .gruntExec(
                          "createserver",
                          {
                            tenantId : testConfig.pkgcloud.test.tenantId,
                            security_groups : "[{'name':'default'}]",
                            user_data : "ZWNobyAicG9zdC1paW5zdGFsbGF0aW9uIiA+PiAvdmFyL2xvZy9wb3N0LmxvZw==",
                            availability_zone : testConfig.pkgcloud.test.availability_zone,
                            imageRef : testConfig.pkgcloud.test.imageRef,
                            flavorRef : testConfig.pkgcloud.test.flavorRef,
                            name : "testServer",
                            key_name : testConfig.pkgcloud.test.key_name
                          }, function(err, stdout, stderr) {

                            if (err) {
                              console.log(err);
                              expect(false).equals(true);
                              done();
                            }

                            var lines = stdout.split("\n");
                            var id = lines[1].split("Created server: ")[1];
                            expect(id.length).above(10);

                            utils.gruntExec("getserveraddresses", {
                              id : id
                            }, function(err, stdout, stderr) {
                              if (err) {
                                console.log(err);
                                expect(false).equals(true);
                                done();
                              }

                              var lines = stdout.split("\n");
                              expect(lines[1].indexOf("ipversion")).above(-1);

                              utils.gruntExec("destroyserver", {
                                id : id
                              }, function(err, stdout, stderr) {
                                if (err) {
                                  console.log(err);
                                  expect(false).equals(true);
                                  done();
                                }

                                var lines = stdout.split("\n");
                                expect(lines[1].indexOf("Destroyied server"))
                                    .above(-1);
                                done();
                              });
                            });

                          });
                });
          });

    });
