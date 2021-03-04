import { Client, Message } from "discord.js";
import { Public, user } from "../types/types";
import { hypixel as hypixelKey } from '../config.json';
import getStats from "../utils/getStats";
import { PlayerInfo } from "../types/hypixel";
import makeEmbedFromStats from "../utils/statsEmbed";

const hypixel = require('hypixel');
const client = new hypixel({
    key: hypixelKey,
})

export = {
    aliases: ['checkup'],
    expectedArgs: '<username>',
    maxArgs: 1,
    minArgs: 1,
    callback: async (msg: Message, args: Array<string>, _bot: Client, _Public: Public, users: Array<user>) => {
        const user = users.find(user => user.username.toLowerCase() == args[0].toLowerCase());
        if(!user) return msg.reply('They aren\'t in out database!');

        const playerInfo: PlayerInfo = await client.getPlayerByUsername(user.username);

        const stats = getStats(playerInfo.stats.Bedwars);

        msg.channel.send(makeEmbedFromStats(user.initialStats, stats, user.username, user.uuid));
    }
}