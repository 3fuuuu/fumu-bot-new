import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { getFumuCount } from "../database.js";

export const data = new SlashCommandBuilder()
  .setName("fumu-count")
  .setDescription("自分が「ふむ」と言った回数を確認します");

export async function execute(
  interaction: ChatInputCommandInteraction,
): Promise<void> {
  const count = getFumuCount(interaction.user.id);

  await interaction.reply(
    `${interaction.user.displayName} ふむカウント: ${count}`,
  );
}
