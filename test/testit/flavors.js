/**
 * Integration tests for falvors
 */

"use strict";

var expect = require("chai").expect, _ = require("underscore"), utils = require("../../lib/utils");

describe("flavors", function() {

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

});
