import winston from 'winston';

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	verbose: 4,
	debug: 5,
};

const level = () => {
	const env = process.env.NODE_ENV || 'development';
	const isDevelopment = env === 'development';
	return isDevelopment ? 'debug' : 'http';
};

const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'magenta',
	http: 'blue',
	verbose: 'green',
	debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
	winston.format.timestamp({ format: 'YYYYMMDD HH:mm:ss' }),
	winston.format.printf(
		(info) => `${info.timestamp} ${info.level}: ${info.message}`,
	),
);

const transports = [
	new winston.transports.Console({
		format: winston.format.colorize({ all: true }),
	}),
	new winston.transports.File({
		filename: 'logs/error.log',
		level: 'error',
	}),
	new winston.transports.File({
		filename: 'logs/info.log',
		level: 'info',
	}),
	new winston.transports.File({ filename: 'logs/all.log' }),
];

const logger = winston.createLogger({
	level: level(),
	levels,
	format,
	transports,
	exitOnError: false,
});

export default class DotLogs {
	static instance: DotLogs;
	constructor() {
		if (typeof DotLogs.instance == 'object') {
			return DotLogs.instance;
		}
		DotLogs.instance = this;
		return this;
	}
	error(message?: string) {
		logger.error(message);
	}
	warn(message?: string) {
		logger.warn(message);
	}
	info(message?: string) {
		logger.info(message);
	}
	http(message?: string) {
		logger.http(message);
	}
	debug(message?: string) {
		logger.debug(message);
	}
	verbose(message?: string) {
		logger.verbose(message);
	}
}
