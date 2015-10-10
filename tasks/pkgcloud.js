/*
 * grunt-pkgcloud
 * https://github.com/shareworks/grunt-pkgcloud
 *
 * Copyright (c) 2014 Raymond Jelierse
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var pkgcloud = require('pkgcloud'),
      path = require('path'),
      q = require('q');

  grunt.registerMultiTask('pkgcloud', 'Grunt task for deploying using pkgcloud', function() {
    var done = this.async();
    var options = this.options({
      createContainer: true,
      metadata: {}
    });

    if (!options.client) {
      throw new Error('Missing client configuration');
    }

    var client = pkgcloud.storage.createClient(options.client);

    function getContainer(name, create) {
      var deferred = q.defer();

      if (typeof create === 'undefined') {
        create = true;
      }

      function onContainerResponse(error, container) {
        if (!error) {
          return deferred.resolve(container);
        }

        if (error.statusCode === 404 && create) {
          grunt.verbose.writeln('Container "' + name + '" not found, creating.');

          return client.createContainer(name, onContainerResponse);
        }

        return deferred.reject(error);
      }

      grunt.verbose.writeln('Opening container "' + name + '".');

      client.getContainer(name, onContainerResponse);

      return deferred.promise;
    }

    function uploadFiles(files, container) {
      grunt.log.subhead('Uploading files to "' + container.name + '" ...');

      var queue = files
        .filter(function(file) {
          return grunt.file.isFile(file.local);
        })
        .map(function(file) {
          return uploadFile(file, container);
        });

      return q.all(queue);
    }

    function uploadFile(path, container) {
      var deferred = q.defer(),
          file = {
            container: container,
            remote: path.remote,
            local: path.local,
            metadata: options.metadata
          };

      if (path.hasOwnProperty('headers')) {
        file.headers = path.headers;
      }

      function onFileUploaded(err, result) {
        if (err || !result) {
          deferred.reject(err);
        } else {
          deferred.resolve(file);
        }
      }

      client.upload(file, onFileUploaded);

      return deferred.promise;
    }

    var queue = this.files.map(function(f) {
      var files = f.src.map(function(local) {
        var file = {
          remote: local,
          local: f.cwd + '/' + local
        };

        if (f.hasOwnProperty('headers')) {
          file.headers = f.headers;
        }

        return file;
      });

      return getContainer(f.dest, options.createContainer)
        .then(function(container) {
          return uploadFiles(files, container);
        });
    });

    q.all(queue)
      .then(function () {
        grunt.log.ok('Files uploaded.');
      })
      .catch(function(error) {
        grunt.log.error(error);
      })
      .finally(function() {
        done();
      });
  });

};
