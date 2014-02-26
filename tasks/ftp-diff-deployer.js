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

		//Diff
		switch (options.diff) {
			case 'simple':
				options.diff = new DiffDeployer.SimpleDiff({
					src: options.src,
					memory: options.memory,
					exclude: options.exclude
				});
				break;
			default:
				throw new Error("Cannot find '" + options.diff + "' diff");
		}

		//Reporter
		switch (options.reporter) {
			case 'simple':
				options.reporter = new DiffDeployer.SimpleReporter();
				break;
			case 'null':
			case null:
				options.reporter = new DiffDeployer.NullReporter();
				break;
			default:
				throw new Error("Cannot find '" + options.reporter + "' reporter");
		}

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
