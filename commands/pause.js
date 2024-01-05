const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("hbess")
        .setDescription("ana habes"),
	execute: async ({ client, interaction }) => {
        // Get the queue for the server
		const queue = client.player.getQueue(interaction.guildId)

        // Check if the queue is empty
		if (!queue)
		{
			await interaction.reply("makatmezzek lwalo a 3chiri")
			return;
		}

        // Pause the current song
		queue.setPaused(true);

        await interaction.reply("rak hbestini.")
	},
}