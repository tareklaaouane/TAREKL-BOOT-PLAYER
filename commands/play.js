const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
const {QueryType} = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a song")
    .addStringOption(option=>{
      option.setName("song")
        .setDescription("The song to play")
        .setRequired(true)
    })
 /* async execute(interaction){
    await interaction.deferReply();
    const query = interaction.options.getString("song");
    const queue = interaction.client.Player.createQueue(interaction.guild,{
      metadata:{
        channel:interaction.channel
      }
    });
    try {
      if(!queue.connection) await queue.connect(interaction.member.voice.channel);
    } catch {
      queue.destroy();
      return await interaction.followUp({content:"Could not join your voice channel!",ephemeral:true});
    }
    await interaction.followUp({content:`Searching 🔎 \`${query}\``,ephemeral:true});
    const searchResult = await interaction.client.Player.search(query,{
      requestedBy:interaction.user,
      searchEngine:QueryType.AUTO
    });
    if(!searchResult || !searchResult.tracks.length) return await interaction.followUp({content:"No results were found!",ephemeral:true});
    const track = searchResult.tracks[0];
    queue.addTrack(track);
    if(!queue.playing) await queue.play();
    const embed = new MessageEmbed()
      .setTitle("Now Playing 🎶")
      .setDescription(`[${track.title}](${track.url})`)
      .setThumbnail(track.thumbnail)
      .setColor("#FF0000")
      .setFooter(`Requested by ${track.requestedBy.tag}`,track.requestedBy.displayAvatarURL({dynamic:true}));
    await interaction.followUp({embeds:[embed]});
  }*/
};