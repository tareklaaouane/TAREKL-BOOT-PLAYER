require("dotenv").config();

const {REST} = require("@discordjs/rest");
const {Routes} = require("discord-api-types/v9");
const {Client,Intents,Colllection, Collection}=require("discord.js");
const {Player}=require("discord-player");

const fs = require("node:fs")
const path = require("node:path")


const client = new Client({intents:[Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_VOICE_STATES]});

const commands = [];
client.commands = new Collection();

const commandsPath = path.join(__dirname,"commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file=>file.endsWith(".js"));

for(const file of commandFiles){ 
    const command = require(path.join(commandsPath,file));
    client.commands.set(command.data.name,command);
    commands.push(command);
}