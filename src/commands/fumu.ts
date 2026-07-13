import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("fumu")
  .setDescription("ふむと言います")
  .addIntegerOption((option) =>
    option
      .setName("count")
      .setDescription("「ふむ」を繰り返す回数")
      .setRequired(true)
      .setMinValue(1)
      .setMaxValue(1000),
  );

export async function execute(
  interaction: ChatInputCommandInteraction,
): Promise<void> {
  const count = interaction.options.getInteger("count", true);

  let message = "";

  for (let i = 0; i < count; i++) {
    message += Math.random() < 0.01 ? "ほーん" : "ふむ";
  }

  await interaction.reply(message);
}
