import { Client, User } from 'discord.js';

import userModel from '../models/users';
import getStats from "./getStats";
import makeEmbedFromStats from "./statsEmbed";
import { PlayerInfo } from "../types/hypixel";
import { user } from '../types/types';
import { hypixel as hypixelKey } from '../config.json';

const hypixel = require('hypixel');
const client = new hypixel({
    key: hypixelKey,
})

const check = async (bot: Client) => {
    const _users: any = await userModel.find({});
    const users: Array<user> = _users;

    for(const user of users) {
        if((Date.now() - (1000 * 60 * 60 * 24 * 7)) > user.date) {
            console.log('Weekly checkup!');
            const playerInfo: PlayerInfo = await client.getPlayerByUsername(user.username);
            const stats = getStats(playerInfo.stats.Bedwars);

            const author = await bot.users.fetch(user.userID);   
            author?.send(makeEmbedFromStats(user.initialStats, stats, user.username, user.uuid));

            console.log(user.uuid);
            const whatever: any = await userModel.findOneAndUpdate({ uuid: user.uuid }, {
                $push: {
                    checkups: {
                        stats: stats,
                        date: Date.now(),
                    },
                },
                $set: {
                    date: Date.now(),
                }
            })
            .then(() => console.log('Updated'));
            console.log(whatever);
        }
    }

    setTimeout(check, 1000 * 60);
};

export default check;