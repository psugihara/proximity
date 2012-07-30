Proximity ![image](http://rhodesmill.org/goldeneye/images/wPrM.gif)
=========
                                
Proximity is a tiny program that executes a command when a file or directory has changed. I use it to run a build script when I modify the source for a project I'm working on.

## Installation
Proximity requires *node.js* and *npm*. Once you have these dependencies, simply:

	npm install proximity -g
	
## Usage
The first argument after `proximity` is the command to run. All following arguments are paths to watch.

For example, the following command will run `./build.sh && ps aux | grep node` whenever *server.js* or *static/* are changed.

	proximity "./build.sh && ps aux | grep node" server.js static/

### Note
Proximity should only be used to run commands that will exit at some point because a separate child process is spawned on each change detected.


## TODO
* Catch errors:
	* File/directory doesn't exist.
* Throttle commands so they don't run multiple times when fs.watch() incorrectly reports multiple changes.
* Check compatability on other systems (only tested on Mac OS X Lion).