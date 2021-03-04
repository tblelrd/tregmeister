import Discord from 'discord.js';
import mongoose from 'mongoose';

import registerCommands from './utils/register';
import { Public } from './types/types';
import background from './backgroundtasks/background';
import http from './backgroundtasks/http';

const bot = new Discord.Client();

const Public: Public = {
    users: [],
    startDate: undefined,
};

bot.on('ready', () => {
    Public.startDate = Date.now();
    http(bot, Public);
    registerCommands(bot, Public);
    background(bot);
    mongoose.connect('mongodb+srv://televox:getjacked@jackack-bot.r14ha.mongodb.net/tregmo', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    console.log(`Logged in as ${bot.user?.username}`);
});


const Database = require("@replit/database");
const db = new Database();

db.get("token").then((token: string) => {
	bot.login(token);
});