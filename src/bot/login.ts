import { Bot } from "mineflayer";

// login for my server
export function login(bot: Bot, password: string) {
	bot.chat(`/auth register ${password}`);
	bot.chat(`/auth login ${password}`);
}
