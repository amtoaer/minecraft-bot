import { createBot } from "./bot/bot";
import { option } from "./bot/option";

for (let opt of option.bots) {
	createBot(opt);
}
