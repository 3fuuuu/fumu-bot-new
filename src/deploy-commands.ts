import dotenv from "dotenv";
dotenv.config();

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { REST, Routes } from "discord.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commandsPath = path.join(__dirname, "commands");

const commands: object[] = [];

for (const file of fs.readdirSync(commandsPath)) {
  if (!file.endsWith(".ts") && !file.endsWith(".js")) continue;

  const command = await import(
    pathToFileURL(path.join(commandsPath, file)).href
  );

  if ("data" in command) {
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

try {
  console.log(`Deploying ${commands.length} commands...`);

  await rest.put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID!,
      process.env.GUILD_ID!,
    ),
    {
      body: commands,
    },
  );

  console.log("Success!");
} catch (err) {
  console.error(err);
}
