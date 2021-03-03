import userModel from '../../models/users';
import { Client, Message } from "discord.js";
import { Public, stats, user } from "../../types/types";
import { hypixel as hypixelKey }  from '../../config.json';
import { PlayerInfo } from '../../types/hypixel';
import getStats from '../../utils/getStats';

const MC = require('minecraft-api');
const hypixel = require('hypixel');

const client = new hypixel({
    key: hypixelKey
})

export = {
    aliases: ['record', 'track', 'add'],
    expectedArgs: '<username>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (msg: Message, args: Array<string>, bot: Client, Public: Public, users: Array<user>) => {
        try {
            const uuid: string = await MC.uuidForName(args[0]);
            const name: string = await MC.nameForUuid(uuid);
            if(!uuid) return msg.reply('They don\'t exist!');
            if(users.find(user => user.uuid == uuid)) return msg.reply('Already in our database');

            msg.channel.send(`${name} has been added to our database`);

            const playerInfo: PlayerInfo = await client.getPlayerByUsername(name);
            if(!playerInfo) return msg.reply('They aren\'t in the hypixel\'s databse');

            const bedwars  = getStats(playerInfo.stats.Bedwars);

            const user = new userModel({
                username: name,
                uuid: uuid,
                started: Date.now(),
                initialStats: bedwars,
                userID: msg.author.id,
                date: Date.now(),
            });
            user.save();
        } catch(err) {
            msg.reply('There was an error, try again lmao');
        }
    }
};
