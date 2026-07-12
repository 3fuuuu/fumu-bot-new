import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pingを返します");

export async function execute(
  interaction: ChatInputCommandInteraction,
): Promise<void> {
  await interaction.reply("Pong!");
}
