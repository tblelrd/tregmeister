import discord from 'discord.js';

export = {
    aliases: ['ping'],
    expectedArgs: '',
    callback: (msg: discord.Message, _args: Array<string>, bot: discord.Client) => {
        msg.reply('Pong!');
    }
};