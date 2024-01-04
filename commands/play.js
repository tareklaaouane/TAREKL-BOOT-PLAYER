const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
const {QueryType} = require("discord-player");

/tmezzek playlista <mezzika>

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tmezzek")
    .setDescription("tle9 chi mezzika")
    .addSubcommand(Subcommand=>{
      Subcommand.setName("9allab 3la mezzika")
      .setDescription("hana kan9allab 3la mezzika ")
      .addStringOption(Option => {
        Option.setName("smia dial oughnia")
        .setDescription("kat9lleb 3laaaa ")
        .setRequired(true)
      })
    })
    .addSubcommand(Subcommand=>{
      Subcommand.setName("playlista")
      .setDescription("hana anmezzkek mn playlist dial youtib ")
      .addStringOption(Option => {
        Option.setName("lien dial mzzika")
        .setDescription("lien dial playlist ")
        .setRequired(true)
      })
    })
    .addSubcommand(Subcommand=>{
      Subcommand.setName("mezzika")
      .setDescription("hana kan9allab 3la mezzika ")
      .addStringOption(Option => {
        Option.setName("lien dial mzzika")
        .setDescription("lien dial playlist ")
        .setRequired(true)
      })
    }),
    execute : async ({client,interaction})=>{
      if (!interaction.member.voice.channel) {
        await interaction.reply("khass tkoun f chi voice channel bash tmezzek a sat");
        return;
      }
      const queue=await client.player.createQueue(interaction.guild);
      if(!queue.connection)await queue.connect(interation.member.voice.channel)

      let embed = new MessageEmbed();
      if (interaction.options.getSubcommand() === "mezzika")
      {
        let url = interaction.options.getString("url");
        const result = await client.player.search(url,{
          requestedBy:interaction.user,
          searchEngine:QueryType.AUTO,

        });
        if(result.tracks.length === 0){
          await interation.replay("makayna hta oughnia bhal hakka awjeh tobba");
          return
        }

        const song = result.tracks[0]
        await queue.addTrack(song);
        embed.setDescription(`rah tzadet **[${song.title}](${song.url})** lqueue`)
        .setThumbnail(song.thumbnail)
        .setFooter({text:`chhal fih: ${song.duration}`});
        }
      }
    }
    