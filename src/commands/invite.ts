import { Client, Message, MessageEmbed } from "discord.js";

export = {
    aliases: ['invite'],
    maxArgs: 0,
    callback: (msg: Message, _args: Array<string>, bot: Client) => {
        const e = new MessageEmbed()
        .setAuthor(bot.user?.username, bot.user?.avatarURL()!)
        .setTitle('Invite me to your server!')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=816677000818196492&permissions=8&scope=bot');

        msg.channel.send(e);
    },
};