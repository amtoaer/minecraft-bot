import * as mineflayer from "mineflayer";
import { pathfinder, Movements, goals } from "mineflayer-pathfinder";
import MinecraftData from "minecraft-data";
import { eat } from "./action/eat";
import config from "config";

const bot = mineflayer.createBot({
	host: config.get("host") as string,
	username: config.get("username") as string,
	version: config.get("version") as string,
});

bot.loadPlugin(pathfinder);
const move = new Movements(bot, MinecraftData(bot.version));
bot.pathfinder.setMovements(move);

bot.once("spawn", () => {
	// 自动注册登录
	bot.chat(`/auth register ${config.get("password")}`);
	bot.chat(`/auth login ${config.get("password")}`);
});

bot.on("whisper", (username: string, message: string) => {
	if (username !== config.get("admin")) {
		return;
	}
	let commands = message.split(" ");
	switch (commands[0]) {
		case "echo": {
			commands.splice(0, 1);
			console.log(commands.join(" "));
			bot.chat(commands.join(" "));
			break;
		}
		case "follow": {
			let target = bot.players[username]?.entity;
			if (!target) {
				bot.whisper(username, "I can't see you!");
				return;
			}
			bot.pathfinder.setGoal(new goals.GoalFollow(target, 1), true);
			break;
		}
		case "cancel": {
			bot.pathfinder.stop();
			break;
		}
		case "eat": {
			eat(bot, MinecraftData(bot.version));
		}
	}
});

bot.on("health", () => {
	if (bot.food !== 20) {
		eat(bot, MinecraftData(bot.version));
	}
});
