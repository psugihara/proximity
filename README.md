	 __    __    ______     ______    __  ___ 
	|  |  |  |  /  __  \   /  __  \  |  |/  / 
	|  |__|  | |  |  |  | |  |  |  | |  '  /  
	|   __   | |  |  |  | |  |  |  | |    <   
	|  |  |  | |  `--'  | |  `--'  | |  .  \  
	|__|  |__|  \______/   \______/  |__|\__\ 
                                          
Hook is a tiny program that executes a command when a file or directory has changed. I use it to run a build script when I modify the source for a project I'm working on.

## Installation
Hook requires *node.js* and *npm*. Once you have these dependencies, simply:

	npm install joint -g
	
## Usage
The first argument after `hook` is the command to run. All following arguments are paths to watch.

For example, the following command will run `./build.sh && ps aux | grep node` whenever *server.js* or *static/* are changed.

	hook "./build.sh && ps aux | grep node" server.js static/

### Note
Hook should only be used to run commands that will exit at some point because a separate child process is spawned on each change detected.

## TODO
* Catch errors:
	* File/directory doesn't exist.
* Throttle commands so they don't run multiple times when fs.watch() incorrectly reports multiple changes.