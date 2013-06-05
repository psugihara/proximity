Proximity <img src="https://raw.github.com/andyburke/proximity/master/proximity.jpg" width="48" height="48" />
=========
                                
Proximity is a tiny program that executes a command when a file is changed somewhere under the current directory. It's useful for performing automatic tasks such as a build when files change.

## Installation
Proximity requires *node.js* and *npm*. Once you have these dependencies, simply:

	npm install proximity -g
	
## Usage

```
  Usage: proximity [options] <command>

  Options:

    -h, --help               output usage information
    --exitonerror            Exit if the spawned command exits with an error code.
    -x, --exclude <pattern>  Specify a string or regular expression which if matched, will ignore the change. You can specify multiple patterns to exclude by repeating this option.
    -t, --timeout            Specify a timeout (in milliseconds) for the spawned process. Default: none
    -q, --quiet              Supress command output.
    -v, --verbose            Output verbose information.
```

For example, the following command will run `./build.sh && ps aux | grep node` whenever a file under the directory where you executed proximity changes:

```
	proximity "./build.sh && ps aux | grep node"
```

You can also cause proximity to exit if the command it runs has an error (by default, proximity will ignore errors in the command it is set to execute):

```
    proximity "false" --exitonerror
```

You can exclude files and patterns you don't want to trigger the command (patterns are treated as regulard expressions):

```
    proximity "./build.sh" -x node_modules -x components -x "/\.json$/i"
```

You can specify a timeout (in milliseconds) after which proximity will stop the command (maybe your build process sometimes hangs? You could kill it after 10 seconds.):

```
    proximity "./build.sh" -t 10000
```

You can suppress the output of the command if you'd prefer not to clutter up your terminal:

```
    proximity "./build.sh" -q
```

Having problems? Enable verbose output to get a better idea of what proximity is doing:

```
    proximity "./build.sh" -v
```

## NOTES

You may see errors like:

```
(node) warning: possible EventEmitter memory leak detected. 11 listeners added. Use emitter.setMaxListeners() to increase limit.
Trace
    at EventEmitter.addListener (events.js:160:15)
    at /usr/local/lib/node_modules/proximity/node_modules/fs-watch-tree/lib/tree-watcher.js:74:21
    at /usr/local/lib/node_modules/proximity/node_modules/fs-watch-tree/lib/async.js:15:21
    at /usr/local/lib/node_modules/proximity/node_modules/fs-watch-tree/lib/fs-filtered.js:23:9
    at Object.oncomplete (fs.js:107:15)
```

*These are not a problem.* fs-watch-tree has accepted a pull request that should resolve this soon: https://github.com/busterjs/fs-watch-tree/pull/5

## TODO
* Check compatability on other systems (only tested on Mac OS X Lion).
