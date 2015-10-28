/* 
 * MIT License (MIT)
 * Copyright (c) 2014 Johann Troendle
 * 
 * This file is part of <grunt-dock>.
 */

"use strict";

var pkgcloud = require("pkgcloud"), _ = require("underscore"), grunt = require("grunt");

// Exports.
var utils = {};

/**
 * Adds to Underscore a function that returns true when the variable is not:
 * null, undefined, or NaN
 * 
 * @param v
 *          Variable to test
 * @return {Boolean}
 */
_.mixin({
  is : function(v) {
    return !(_.isUndefined(v) || _.isNull(v) || _.isNaN(v));
  }
});

/**
 * Logs an error (if existing) on the Grunt error log, and calls the callback
 * 
 * @param {Object}
 *          err Error object
 * @param {Function}
 *          done Callback
 */
utils.dealWithError = function(err, done) {

  if (_.is(err)) {
    grunt.log.error(err);
    if (_.is(done)) {
      done();
    }
  }
};

/**
 * Returns a compute client based on the given options
 * 
 * @see https://github.com/pkgcloud/pkgcloud/tree/master/docs/providers
 * @param {Object}
 *          options Options for client creation
 * @param {Function}
 *          doneError Callback to call in case of error
 */
utils.getComputeClient = function(options, doneError) {

  try {
    if (!_.is(options)) {
      throw new Error("Missing client configuration");
    }
    return pkgcloud.compute.createClient(options);
  } catch (err) {
    utils.dealWithError(err, doneError);
  }
};

/**
 * Returns a network client based on the given options
 * 
 * @see https://github.com/pkgcloud/pkgcloud/tree/master/docs/providers
 * @param {Object}
 *          options Options for client creation
 * @param {Function}
 *          doneError Callback to call in case of error
 */
utils.getNetworkClient = function(options, doneError) {

  try {
    if (!_.is(options)) {
      throw new Error("Missing client configuration");
    }
    return pkgcloud.network.createClient(options);
  } catch (err) {
    utils.dealWithError(err, doneError);
  }
};

/**
 * Returns true if an attribute is primitive and it is not in the list of
 * attributes to skip
 * 
 * @param {String}
 *          name Attribute name
 * @param {value}
 *          Attribute value Attribute name
 * @return {Boolean}
 */
utils.isPrimitive = function(name, value) {
  if (_.isArray(value) === true || _.isObject(value) === true
      || [ "newListener", "delimiter", "wildcard" ].indexOf(name) >= 0) {
    return false;
  } else {
    return true;
  }
};

/**
 * Returns an array containing the names of all the primitive data types of an
 * object
 * 
 * @param {Object}
 *          Object to extract the attributes names from
 * @return {Array} Attribute names
 */
utils.primitiveAttributes = function(obj) {
  var attrs = [];
  _.keys(obj).forEach(function(attr) {
    if (utils.isPrimitive(attr, obj[attr])) {
      attrs.push(attr);
    }
  });
  return attrs;
};

/**
 * Returns the values of primitive data type of an object
 * 
 * @param {Object}
 *          Object to extract the valus from
 * @return {Array} Values
 */
utils.primitiveValues = function(obj) {
  var values = [];
  _.keys(obj).forEach(function(attr) {
    if (utils.isPrimitive(attr, obj[attr])) {
      values.push(obj[attr]);
    }
  });
  return values;
};

/**
 * Prints on the Grunt log the primitive data types of an Array of Objects
 * 
 * @gparam {Object} grunt Grunt instance
 * @param {Object}
 *          PkgCloud client
 * @param {String}
 *          method Name of the client's method to call
 * @param {Array}
 *          options Parameters to pass to the method (null if no argument has to
 *          be passed)
 * @param {Function}
 *          done Callback
 */
utils.logResultArray = function(grunt, client, method, options, done) {
  var callback = function(err, result) {
    utils.dealWithError(err, done);
    var resArray = _.isArray(result) ? result : [ result ];
    grunt.log.ok(utils.primitiveAttributes(resArray[0]));
    resArray.forEach(function(obj) {
      grunt.log.ok(utils.primitiveValues(obj));
    });
    done();
  };
  client[method].apply(client, _.union(options, [ callback ]));
};

module.exports = utils;
