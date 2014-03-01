/*
 * grunt-ftp-diff-deployer
 * https://github.com/95ulisse/grunt-ftp-diff-deployer
 *
 * Copyright (c) 2014 Marco Cameriero
 * Licensed under the MIT license.
 */

'use strict';

var DiffDeployer = require('ftp-diff-deployer');

module.exports = function(grunt) {

	grunt.registerMultiTask('ftp-diff-deployer', 'Incrementally push differences to FTP server.', function() {

		var taskCallback = this.async();

		//Default options
		var options = this.options({
			host: 'localhost',
			port: 21,
			auth: {
				username: '',
				password: ''
			},
			diff: 'simple',
			memory: './.grunt/grunt-ftp-diff-deployer/memory.' + this.target + '.json',
			exclude: [],
			reporter: 'simple', //{ simple | null }
			src: null,
			dest: null,
			retry: 3
		});

		//Starts the deploying process
		var deployer = new DiffDeployer(options);
		deployer.deploy(function (e) {
			if (e) {
				grunt.fatal(e);
				taskCallback(e);
			} else {
				taskCallback();
			}
		});

	});

};
