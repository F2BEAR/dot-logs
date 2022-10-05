import winston, { transports, format, Logger } from 'winston';
import { join } from 'path';

export default class DotLogs {

	private readonly  colors = {
		error: 'red',
		warn: 'yellow',
		info: 'magenta',
		http: 'blue',
		verbose: 'green',
		debug: 'white',
	};

	private readonly addColors = winston.addColors(this.colors);
	private logger: Logger;
	private transport: any[];
	private logPath: string = 'logs';

	constructor(logPath: string ) {
		this.logPath = logPath;
		this.addColors;
		this.transport = [
			new transports.Console({
				format: winston.format.colorize({ all: true }),
			}),
			new transports.File({
				filename: join(this.logPath, '/error.log'),
				level: 'error',
			}),
			new transports.File({
				filename: join(this.logPath, '/info.log'),
				level: 'info',
			}),
			new transports.File({ filename: join(this.logPath, '/all.log')}),
		]

		this.logger = winston.createLogger({
			level: this.level(),
			levels: this.levels,
			format: this.formats,
			transports: this.transport,
			exceptionHandlers: [
				new transports.File({ filename: join(this.logPath, '/exceptions.log')}),
				new transports.Console({
					format: winston.format.colorize({ all: true }),
				}),
			],
			exitOnError: false,
		});
	}

	private readonly levels = {
		error: 0,
		warn: 1,
		info: 2,
		http: 3,
		verbose: 4,
		debug: 5,
	};

	private readonly level = () => {
		const env = process.env.NODE_ENV || 'development';
		const isDevelopment = env === 'development';
		return isDevelopment ? 'debug' : 'http';
	};

	private readonly formats = format.combine(
		format.timestamp({ format: 'YYYYMMDD HH:mm:ss' }),
		format.printf(
			(info) => `${info.timestamp} ${info.level}: ${info.message}`,
		),
	);

	error(message?: string) {
		this.logger.error(message);
	}
	warn(message?: string) {
		this.logger.warn(message);
	}
	info(message?: string) {
		this.logger.info(message);
	}
	http(message?: string) {
		this.logger.http(message);
	}
	debug(message?: string) {
		this.logger.debug(message);
	}
	verbose(message?: string) {
		this.logger.verbose(message);
	}
}
