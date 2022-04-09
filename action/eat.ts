import MinecraftData from "minecraft-data";
import { Bot } from "mineflayer";

export function eat(bot: Bot, mcData: MinecraftData.IndexedData) {
	let foods = bot.inventory
		.items()
		.filter((item) => item.name in mcData.foodsByName);
	if (foods.length === 0) {
		return;
	}
	let foodToEat = foods[0];
	(async () => {
		try {
			await bot.equip(foodToEat, "hand");
			await bot.consume();
		} catch (error) {
			console.log(error);
		}
	})();
}
