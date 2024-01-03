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

client.Player = new Player(client,{
  ytdlOptions:{
    quality:"highestaudio",
    highWaterMark:1<<25
  }
});

client.on("ready",()=>{
  const guild_ids =client.guilds.cache.map(guild=>guild.id);

  const rest = new REST({version:"9"}).setToken(process.env.TOKEN);
  for (const guild_id of guild_ids) {
    rest.put(Routes.applicationGuildCommands(process.env.Client_ID,guildId),{
      body:commands
    })
    .then(()=>console.log(`Added commands to ${guild_id}`))
    .catch(console.error);
    
  }
});

client.on("interactionCreate",async interaction=>{
  if(!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);

  if(!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({content:"There was an error while executing this command!",ephemeral:true});
  }
});

client.login(process.env.TOKEN);