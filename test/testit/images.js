/**
 * Integration tests for images
 */

"use strict";

var expect = require("chai").expect, _ = require("underscore"), exec = require('child_process').exec;

var gruntExec = function(cmd, callback) {
  exec("grunt pkgcloud:" + cmd, callback);
};

describe("networks", function() {

  describe("getimages", function() {
    it("returns a list of images", function(done) {
      gruntExec("getimages", function(err, stdout, stderr) {
        if (err) {
          console.log(err);
          expect(false).equals(true);
          done();
        }

        var lines = stdout.split("\n");
        expect(lines.length).above(2);
        expect(lines[1].split(",")[2]).equals("created");
        done();
      });
    });
  });

});
