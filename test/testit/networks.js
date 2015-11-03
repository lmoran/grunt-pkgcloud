/**
 * Integration tests for networks
 */

"use strict";

var expect = require("chai").expect, _ = require("underscore"), utils = require("../../lib/utils");

var gruntExec = function(cmd, callback) {
  exec("grunt pkgcloud:" + cmd, callback);
};

describe("networks", function() {

  describe("getnetworks", function() {
    it("returns a list of networks", function(done) {
      utils.gruntExec("getnetworks", {}, function(err, stdout, stderr) {
        if (err) {
          console.log(err);
          expect(false).equals(true);
          done();
        }

        var lines= stdout.split("\n");
        expect(lines.length).above(2);
        expect(lines[1].split(",")[1]).equals("status");
        done();
      });
    });
  });

});
