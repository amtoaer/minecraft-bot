import { Bot } from "mineflayer";
import { login } from "./login";

type BotOption = {
	host: string;
	username: string;
	admin?: string[];
	version: string;
	password?: string;
	auth?: (bot: Bot, password: string) => void;
};

type Option = {
	logfile: string;
	loglevel: string;
	bots: BotOption[];
};

let option: Option = {
	logfile: "bot.log",
	loglevel: "error",
	bots: [
		{
			host: "mc.ldgame.xyz",
			username: "bot",
			password: "password",
			admin: ["amtoaer"],
			version: "1.18.2",
			auth: login,
		},
	],
};

export { BotOption, option };
