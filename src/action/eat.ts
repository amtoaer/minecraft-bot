import MinecraftData from "minecraft-data";
import { Bot } from "mineflayer";
import { errorf } from "../utils/log";

export function eat(bot: Bot, mcData: MinecraftData.IndexedData) {
	let foods = bot.inventory
		.items()
		.filter((item) => item.name in mcData.foodsByName);
	if (foods.length === 0) {
		errorf(bot.username, "eat", "nothing to eat");
		return;
	}
	let foodToEat = foods[0];
	(async () => {
		try {
			await bot.equip(foodToEat, "hand");
			await bot.consume();
		} catch (error) {
			errorf(bot.username, "eat", error);
		}
	})();
}
