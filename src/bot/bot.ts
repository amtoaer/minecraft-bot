import * as mineflayer from "mineflayer";
import { pathfinder, Movements, goals } from "mineflayer-pathfinder";
import MinecraftData from "minecraft-data";
import { eat } from "../action/eat";
import { BotOption } from "./option";
import { errorf } from "../utils/log";

export function createBot(opt: BotOption) {
	const { host, username, admin, version, password, auth } = opt;
	const bot = mineflayer.createBot({
		host: host,
		username: username,
		version: version,
	});
	const data = MinecraftData(bot.version);

	bot.loadPlugin(pathfinder);

	const move = new Movements(bot, data);
	move.canDig = false; // do not dig
	move.allow1by1towers = false; //do not build 1*1 towers when going up
	bot.pathfinder.setMovements(new Movements(bot, data));

	bot.once("spawn", async () => {
		if (password && auth) {
			auth(bot, password);
		}
	});

	bot.on("whisper", async (username: string, message: string) => {
		if (admin && !admin.includes(username)) {
			bot.whisper(username, "Sorry, you're not admin!");
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
					bot.whisper(username, "I can't find you!");
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
				break;
			}
			case "location":
			case "position": {
				bot.whisper(username, `current location:${bot.entity.position}`);
			}
		}
	});

	bot.on("health", async () => {
		if (bot.food <= 7 || bot.health <= 12) {
			eat(bot, data);
		}
	});

	bot.on("error", (err) => {
		errorf(bot.username, "", err);
	});
}
