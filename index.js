#!/usr/bin/env node

'use strict';

var ncp      = require('copy-paste');
var inquirer = require('inquirer');

var questions = [
  {
    type: 'input',
    name: 'width',
    message: 'Width(px)',
    default: function() {
      return '640';
    },
    validate: function(value) {
      var pass = value.match(/[1-9]+/i);
      if (pass) {
        return true;
      }
      return 'Please type using numbers';
    }
  },
  {
    type: 'input',
    name: 'height',
    message: 'Height(px)',
    default: function() {
      return '480';
    },
    validate: function(value) {
      var pass = value.match(/[1-9]+/i);
      if (pass) {
        return true;
      }
      return 'Please type using numbers';
    }
  },
  {
    type: 'input',
    name: 'background',
    message: 'Background Color(hex)',
    validate: function(value) {
      var pass = value.match(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i);

      if (pass || value.length === 0) {
        return true;
      }
      return 'Please type hexadecimal(3 or 6 digit)';
    }
  },
  {
    type: 'input',
    name: 'text',
    message: 'Text',
  },
  {
    type: 'input',
    name: 'fontColor',
    message: 'Font Color(hex)',
    validate: function(value) {
      var pass = value.match(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i);

      if (pass || value.length === 0) {
        return true;
      }
      return 'Please type hexadecimal(3 or 6 digit)';
    }
  },
  {
    type: 'input',
    name: 'fontSize',
    message: 'Font Size(px)',
    validate: function(value) {
      var pass = value.match(/[1-9]+/i);
      if (pass || value.length === 0) {
        return true;
      }
      return 'Please type using numbers';
    }
  }
];

var commands = process.argv.slice(2);

if (commands[0] === '-v' || commands[0] === '--version') {
  console.log('Version: ' + require('./package.json').version);
  process.exit(0);
}

inquirer.prompt(questions).then(function(answers) {
  var url = 'https://placehold.jp/'
    + (answers.fontSize === '' ?  '' : answers.fontSize + '/')
    + (answers.background === '' ? '' : answers.background + '/')
    + (answers.fontColor === '' ? '' : answers.fontColor + '/')
    + (answers.width + 'x' + answers.height + '.png')
    + (answers.text === '' ? '' : '?text=' + answers.text);

  console.log('url:', url);

  ncp.copy(url, function() {
    console.log('Copied url.');
  });
});
