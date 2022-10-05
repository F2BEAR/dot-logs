# Dot-logs

![npm](https://img.shields.io/npm/v/dot-logs)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/f2bear/dot-logs/release)
![npm bundle size](https://img.shields.io/bundlephobia/min/dot-logs)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)


This library aims to bring you an easy way to log stuff both in your console and .log files.

## Installation

```shell
$ npm i dot-logs
```

## Usage

```javascript
import DotLogs from 'dot-logs';

const log = new DotLogs();
log.info('my awesome log');
```

> **Note**
>
> At the moment we only support Typescript and ESModules, but we are currently working on giving support for CJS as well.
>
> Check this [issue](https://github.com/F2BEAR/dot-logs/issues/1) for more information.

There are 6 log levels built-in, all available at your instance. They all expect only one parameter 

- .error()
- .warn()
- .info()
- .http()
- .debug()
- .verbose()

Take in mind that DotLogs is a singleton class so you can instance it only once in your application and then reference it everywhere you need it.

All logs will be stored in a `/logs/all.log` file on a `/logs` folder at the root of the project;  if the `/logs` folder does not exists before the first log, Dot-Logs will create it for you.

You can configure the path where Dot-Logs will store the .log files at the constructor:

```javascript
const log = new DotLogs('dist/logs')
```

There are two other files that will be created, the `info.log` and `error.log` files containing all the logs for those levels.

It will also catch and log `uncaughtException` events and store them on the `exceptions.log` file.

By default the log format is `timestamp log-level: message` and the timestamp `YYYYMMDD HH:mm:ss`.

## License

MIT License.

Copyright (c) 2022 Facundo Carbonel / LogIt