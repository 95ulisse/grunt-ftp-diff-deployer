/*
 * grunt-ftp-diff-deployer
 * https://github.com/95ulisse/grunt-ftp-diff-deployer
 *
 * Copyright (c) 2014 Marco Cameriero
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js'
			],
			options: {
				jshintrc: '.jshintrc',
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint']);

};
