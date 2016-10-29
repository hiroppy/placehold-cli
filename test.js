'use strict';

var test     = require('ava');
var pify     = require('pify');
var execFile = require('child_process').execFile;
var packages = require('./package.json');

test('should return version number', async (t) => {
  const versionLabel = `Version: ${packages.version}`;
  const stdout       = await pify(execFile)('./index.js', ['-v']);

  t.is(stdout.trim(), versionLabel);
});

// test('should return generated url', async function() {
// });
