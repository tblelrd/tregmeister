import { MessageEmbed } from "discord.js";
import { stats } from "../types/types";

const makeEmbedFromStats = (initial: stats, stats: stats, username: string, uuid: string): MessageEmbed => {
    const e = new MessageEmbed();

    const newStats: stats = {
        Experience: stats.Experience - initial.Experience,
        coins: stats.coins - initial.coins,
        kills_bedwars: stats.kills_bedwars - initial.kills_bedwars,
        deaths_bedwars: stats.deaths_bedwars - initial.deaths_bedwars,
        wins_bedwars: stats.wins_bedwars - initial.wins_bedwars,
        losses_bedwars: stats.losses_bedwars - initial.losses_bedwars,
        final_kills_bedwars: stats.final_kills_bedwars - initial.final_kills_bedwars,
        final_deaths_bedwars: stats.final_deaths_bedwars - initial.final_deaths_bedwars,
        beds_broken_bedwars: stats.beds_broken_bedwars - initial.beds_broken_bedwars,
        beds_lost_bedwars: stats.beds_lost_bedwars - initial.beds_lost_bedwars,
        games_played_bedwars: stats.games_played_bedwars - initial.games_played_bedwars,
        games_played_bedwars_1: stats.games_played_bedwars_1 - initial.games_played_bedwars_1,
    }

    e.setAuthor(username, `https://visage.surgeplay.com/face/${uuid}.png`)
    .setDescription(`Bedwars Stats`)
    .addField('Coins earned', newStats.coins)
    .addField('Experience gained', newStats.Experience)
    .addField('kdr', ratio(newStats.kills_bedwars, newStats.deaths_bedwars))
    .addField('wlr', ratio(newStats.wins_bedwars, newStats.losses_bedwars))
    .addField('fkdr', ratio(newStats.final_kills_bedwars, newStats.final_deaths_bedwars));

    return e;
}

const ratio = (first: number, last: number): string => {
    return `${first}:${last} (${Math.floor((first / (last ? last : 1)) * 100) / 100})`;
}

export default makeEmbedFromStats;