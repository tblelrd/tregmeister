import discord from 'discord.js';

export = {
    aliases: ['ping'],
    expectedArgs: '',
    callback: (msg: discord.Message, args: Array<string>, bot: discord.Client) => {
        msg.reply('Pong!');
    }
};