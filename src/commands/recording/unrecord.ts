import { Client, Message } from "discord.js";
import userModel from '../../models/users';
import { hypixel as hypixelKey} from '../../config.json';
import { Public, user } from "../../types/types";
import makeEmbedFromStats from "../../utils/statsEmbed";
import { PlayerInfo } from "../../types/hypixel";
import getStats from "../../utils/getStats";

const MC = require('minecraft-api');
const hypixel = require('hypixel');

const client = new hypixel({
    key: hypixelKey,
});

export = {
    aliases: ['unrecord', 'untrack', 'remove'],
    expectedArgs: '<username>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (msg: Message, args: Array<string>, bot: Client, Public: Public, users: Array<user>) => {
        const uuid = await MC.uuidForName(args[0]);
        const name = await MC.nameForUuid(uuid);

        if(!uuid) return msg.channel.send('baka');

        const userDOC: any = await userModel.findOneAndDelete({ uuid: uuid })
        const user: user = userDOC;
        if(!user) return msg.channel.send('They aren\'t in our database!');
        msg.channel.send(`${user.username} has been removed from our database`);

        const playerInfo: PlayerInfo = await client.getPlayerByUsername(name);

        const stats = getStats(playerInfo.stats.Bedwars);

        msg.channel.send(makeEmbedFromStats(user.initialStats, stats, user.username, user.uuid));
    },
};