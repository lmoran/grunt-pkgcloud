/**
 * Integration tests for falvors
 */

"use strict";

var expect = require("chai").expect, _ = require("underscore"), exec = require('child_process').exec;

var gruntExec = function(cmd, callback) {
  exec("grunt pkgcloud:" + cmd, callback);
};

describe("flavors", function() {

  describe("getflavors", function() {
    it("returns a list of flavors", function(done) {
      gruntExec("getflavors", function(err, stdout, stderr) {
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

});
