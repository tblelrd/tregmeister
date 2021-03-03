import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';
import tableConfig from './tableConfig';
import { table } from  'table';
import * as c from 'ansi-colors';

const commandStatus = [
    [`${c.bold('Command')}`, `${c.bold('Status')}`],
];
const eventStatus = [
    [`${c.bold('Event')}`, `${c.bold('Status')}`],
];

const commandBaseName = 'command-base.ts';
import commandBase from '../commands/command-base';
// const eventBaseName = 'event-base.ts';
// import eventBase from '../events/event-base';

const readCommands = async (bot: Discord.Client, dir: string, Public: any) => {
    const files = fs.readdirSync(path.join(__dirname, '../', dir));
    for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, '../', dir, file));
        if(stat.isDirectory()) {
            readCommands(bot, path.join(dir, file), Public);
        } else if(file.endsWith('ts') && file !== commandBaseName) {
            const options =  require(path.join(__dirname, '../', dir, file));
            if(!options.aliases || !options.callback) {
                commandStatus.push(
                    [`${c.cyan(file)}`, `${c.bgRed('Failed')}`],
                );
            } else {
                commandBase(bot, options, Public);
                commandStatus.push(
                    [`${c.cyan(file)}`, `${c.bgGreen('Loaded')}`],
                );
            }
        }
    }
}
// const readEvents = async (bot: Discord.Client, dir: string, Public: any) => {
//     const files = fs.readdirSync(path.join(__dirname, '../', dir));
//     for (const file of files) {
//         const stat = fs.lstatSync(path.join(__dirname, '../', dir, file));
//         if(stat.isDirectory()) {
//             readEvents(bot, path.join(dir, file), Public);
//         } else if(file.endsWith('ts') && file !== eventBaseName) {
//             const options =  require(path.join(__dirname, '../', dir, file));
//             if(!options.event) {
//                 eventStatus.push(
//                     [`${c.cyan(file)}`, `${c.bgRed('Failed')}`],
//                 );
//             } else {
//                 eventBase(bot, options, Public);
//                 eventStatus.push(
//                     [`${c.cyan(file)}`, `${c.bgGreen('Loaded')}`],
//                 );
//             }
//         }
//     }
// }
const registerCommands = (bot: Discord.Client, Public: any) => {
    readCommands(bot, 'commands', Public);
    console.log(table(commandStatus, tableConfig.options));
}

export default registerCommands; 