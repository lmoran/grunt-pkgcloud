"use strict";

var sinon = require("sinon"), expect = require("chai").expect, _ = require("underscore");
var utils = require("../lib/utils.js");
var nop = function() {
};
var cb = {
  done : nop
};
sinon.spy(cb, "done");

/*
 * mock.expects("method").once().throws();
 * 
 * mock.verify(); assert(spy.calledOnce);
 */

describe("utils", function() {

  describe("dealWithError", function() {
    it("should do nothing if no error is given", function(done) {
      utils.dealWithError(null, cb.done);
      expect(cb.done.called).equals(false);
      done();
    });

    it("should log and call callback when an error is given", function(done) {
      utils.dealWithError({}, cb.done);
      expect(cb.done.called).equals(true);
      done();
    });
  });

  describe("getComputeClient", function() {
    it("should call error if no option is given", function(done) {
      utils.getComputeClient(null, cb.done);
      expect(cb.done.called).equals(true);
      done();
    });
  });

  describe("getNetworkClient", function() {
    it("should call error if no option is given", function(done) {
      utils.getNetworkClient(null, cb.done);
      expect(cb.done.called).equals(true);
      done();
    });
  });

  describe("isPrimitive", function() {
    it("tells a primitive data type", function(done) {
      expect(utils.isPrimitive("a", 1)).equal(true);
      expect(utils.isPrimitive("a", {})).equal(false);
      expect(utils.isPrimitive("newListener", 1)).equal(false);
      expect(utils.isPrimitive("delimiter", 1)).equal(false);
      expect(utils.isPrimitive("wildcard", 1)).equal(false);
      done();
    });
  });

  describe("primitiveAttributes", function() {
    it("returns primitive data type attribute names", function(done) {
      var attrs = utils.primitiveAttributes({
        a : 1,
        b : {
          c : 1
        },
        c : [ 1, 2, 3 ],
        d : "4",
        newListener : 1,
        delimiter : 2,
        wildcard : 3
      });
      expect(attrs).eql([ "a", "d" ]);
      done();
    });
  });

  describe("primitiveValues", function() {
    it("returns primitive data type values", function(done) {
      var attrs = utils.primitiveValues({
        a : 1,
        b : {
          c : 1
        },
        c : [ 1, 2, 3 ],
        d : "4",
        newListener : 1,
        delimiter : 2,
        wildcard : 3
      });
      expect(attrs).eql([ 1, "4" ]);
      done();
    });
  });
});
