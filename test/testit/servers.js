/**
 * Integration tests for images
 */

"use strict";

var expect = require("chai").expect, _ = require("underscore"), exec = require('child_process').exec, utils = require("../../lib/utils");

var gruntExec = function(cmd, callback) {
  exec("grunt pkgcloud:" + cmd, callback);
};

describe(
    "servers",
    function() {

      describe("getservers", function() {
        it("returns a list of servers", function(done) {
          gruntExec("getservers", function(err, stdout, stderr) {
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
      // user_data : "sudo curl -sSL https://get.docker.com/ | sh;sudo usermod
      // -aG docker ubuntu;sudo docker --version;sudo docker run hello-world",

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
                            tenantId : "OpenAPI",
                            security_groups : "[{'name':'default'},{'name':'consul'},{'name':'LB'}]",
                            user_data : "IyEvYmluL2Jhc2gNCnN1ZG8gY3VybCAtc1NMIGh0dHBzOi8vZ2V0LmRvY2tlci5jb20vIHwgc2gNCnN1ZG8gdXNlcm1vZCAtYUcgZG9ja2VyIHVidW50dQ0Kc3VkbyBkb2NrZXIgLS12ZXJzaW9uDQpzdWRvIGRvY2tlciBydW4gaGVsbG8td29ybGQ=",
                            availability_zone : "melbourne-np",
                            imageRef : "81f6b78f-6d51-4de9-a464-91d47543d4ba",
                            flavorRef : "cba9ea52-8e90-468b-b8c2-777a94d81ed3",
                            name : "testServer",
                            key_name : "lmorandini"
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
                                expect(lines[1].indexOf("Destroyied server")).above(-1);
                                done();
                              });
                            });

                          });
                });
          });
    });
