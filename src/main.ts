import dotenv from "dotenv";
dotenv.config();

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  ChatInputCommandInteraction,
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  SlashCommandBuilder,
} from "discord.js";

type Command = {
  data: SlashCommandBuilder;
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
};

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const commands = new Collection<string, Command>();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commandsPath = path.join(__dirname, "commands");

for (const file of fs.readdirSync(commandsPath)) {
  if (!file.endsWith(".ts") && !file.endsWith(".js")) continue;

  const command: Command = await import(
    pathToFileURL(path.join(commandsPath, file)).href
  );

  commands.set(command.data.name, command);
}

client.once(Events.ClientReady, (client) => {
  console.log(`${client.user.tag} Ready!`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "エラーが発生しました。",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "エラーが発生しました。",
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.TOKEN);
