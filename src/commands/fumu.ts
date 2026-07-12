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
      .setMaxValue(10000),
  );

export async function execute(
  interaction: ChatInputCommandInteraction,
): Promise<void> {
  console.log("execute start");

  const count = interaction.options.getInteger("count", true);

  console.log(count);

  const message = Array(count).fill("ふむ").join("");

  console.log("before reply");

  await interaction.reply(message);

  console.log("after reply");
}
