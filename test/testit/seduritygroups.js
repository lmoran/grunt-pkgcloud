/**
 * Integration tests for security groups
 */

"use strict";

var expect = require("chai").expect, _ = require("underscore"), exec = require('child_process').exec;

var gruntExec = function(cmd, callback) {
  exec("grunt pkgcloud:" + cmd, callback);
};

describe("securitygroups", function() {

  describe("listsecuritygroup", function() {
    it("lists security groups", function(done) {
      gruntExec("getsecuritygroups", function(err, stdout, stderr) {
        if (err) {
          console.log(err);
          expect(false).equals(true);
          done();
        }

        var lines = stdout.split("\n");
        expect(lines.length).above(2);
        expect(lines[1].split(",")[1]).equals("name");
        done();
      });
    });
  });
/* TODO
  describe("managesecuritygroup", function() {
    it("adds and removes a security group", function(done) {
      gruntExec("addsecuritygroup", function(err, stdout, stderr) {
        if (err) {
          console.log(err);
          expect(false).equals(true);
          done();
        }

        var lines = stdout.split("\n");
        console.log(lines); // XXX
        expect(lines.length).above(2);
        expect(lines[1].split(",")[1]).equals("status");

        
        gruntExec("destroysecuritygroup", function(err, stdout, stderr) {
          if (err) {
            console.log(err);
            expect(false).equals(true);
            done();
          }
        });
      });
  });
    */

});
