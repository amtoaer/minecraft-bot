import { getLogger, configure } from "log4js";
import { option } from "../bot/option";

type logFunction = (
	username: string,
	action: string,
	error: Error | string
) => void;

let logFile = option.logfile || "bot.log";
let logLevel = option.loglevel || "error";

configure({
	appenders: { file: { type: "file", filename: logFile } },
	categories: { default: { appenders: ["file"], level: logLevel } },
});

const logger = getLogger();

function getLogStr(
	username: string,
	action: string,
	err: Error | string
): string {
	return `${username} when ${action} : ${err}`;
}

let debugf: logFunction = (username, action, error) => {
	logger.debug(getLogStr(username, action, error));
};

let errorf: logFunction = (username, action, error) => {
	logger.error(getLogStr(username, action, error));
};

export { debugf, errorf };
