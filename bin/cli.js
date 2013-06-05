#!/usr/bin/env node

var watchTree = require('fs-watch-tree').watchTree;
var exec = require('child_process').exec;
var program = require('commander');

var excludes = [];

program
    .usage('[options] <command>')
    .option('--exitonerror', 'Exit if the spawned command exits with an error code.')
    .option('-x, --exclude <pattern>', 'Specify a string or regular expression which if matched, will ignore the change. You can specify multiple patterns to exclude by repeating this option.', function( val ) {
        excludes.push( val );
    })
    .option('-t, --timeout', 'Specify a timeout (in milliseconds) for the spawned process. Default: none', 0)
    .option('-q, --quiet', 'Supress command output.')
    .option('-v, --verbose', 'Output verbose information.')
    .parse(process.argv);

if (program.args.length != 1) {
    program.help();
    process.exit(1);
}

var command = program.args[0];

var ignored = null;
if ( !!program.ignore )
{
    ignored = new RegExp( program.ignore );
}

function log(str) {
    !!program.verbose && console.log( str );
}

log( 'exitonerror: ' + !!program.exitonerror );
log( 'exclude: ' + excludes );
log( 'quiet: ' + !!program.quiet );
log( '' );

var running = false;
var lastChange = 0;
watchTree('.', {
    exclude: excludes
}, function( event ) {
    
    if ( running )
    {
        log( '  ...command running, skipping change: ' + event.name );
        return;
    }
    
    running = true;

    log( 'changed: ' + event.name );
    log( '  spawning "' + command + '"' );
    log( '' );

    // Child will use parent's stdios
    exec( command, {
        timeout: program.timeout
    }, function( error, stdout, stderr ) {
        log( '' );
        
        !program.quiet && console.log( stdout );
        !program.quiet && !!stderr && console.error( stderr );
        !program.quiet && !!error && console.error( '  command exited with error code: ' + error.code );
        
        if ( program.exitonerror && !!error )
        {
            log( '  exiting' );
            process.exit( error.code );
        }

        log( '  completed.' );
        running = false;
    });
});
