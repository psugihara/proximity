#!/usr/local/bin/node

var program = require('commander');

program
    .usage('command path [paths...]');

program.on('--help', function(){
    console.log('  Examples:');
    console.log('');
    console.log('    $ proximity "./build.sh" ./static/js');
    console.log('');
});

program.parse(process.argv);

if (program.args.length < 2) {
    console.log('');
    console.log('  Usage: proximity ' + program.usage());
    console.log('');
    process.exit(0);
}

var command = program.args[0],
    paths = program.args.slice(1),
    proximity = require('proximity')(command, paths);