var fs = require('fs');

function runCommand(command) {
    var spawn = require('child_process').spawn;

    // Child will use parent's stdios
    spawn(command, [], { stdio: 'inherit' });
}

// Run the command when there is a change at one of the paths.
module.exports = function (command, paths) {
    for (var i = 0; i < paths.length; i++) {
        fs.watch(paths[i], function (event, filename) {
            runCommand(command);
        });
    }
};