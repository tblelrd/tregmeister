import Discord from 'discord.js';
import mongoose from 'mongoose';

import registerCommands from './utils/register';
import { token } from './config.json';
import { Public } from './types/types';
import background from './backgroundtasks/background';

const bot = new Discord.Client();

const Public: Public = {
    users: [],
};

bot.on('ready', () => {
    registerCommands(bot, Public);
    background(bot);
    mongoose.connect('mongodb+srv://televox:getjacked@jackack-bot.r14ha.mongodb.net/tregmo', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    console.log(`Logged in as ${bot.user?.username}`);
});

bot.login(token);