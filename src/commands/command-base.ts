import Discord, { PermissionString } from 'discord.js';
import mongoose from 'mongoose';
import userModel from '../models/users';
import { prefix } from '../config.json';
import { Public, user } from '../types/types';

const validatePermissions = (permissions: Array<PermissionString>) => {
    const permList: Array<PermissionString> = [
        'ADD_REACTIONS', 'ADMINISTRATOR', 'BAN_MEMBERS',
        'CHANGE_NICKNAME', 'CONNECT', 'CREATE_INSTANT_INVITE',
        'DEAFEN_MEMBERS', 'EMBED_LINKS', 'KICK_MEMBERS',
        'MANAGE_CHANNELS', 'MANAGE_EMOJIS', 'MANAGE_GUILD',
        'MANAGE_MESSAGES', 'MANAGE_NICKNAMES', 'MANAGE_ROLES',
        'MANAGE_WEBHOOKS', 'MENTION_EVERYONE', 'MOVE_MEMBERS',
        'MUTE_MEMBERS', 'PRIORITY_SPEAKER', 'READ_MESSAGE_HISTORY',
        'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'SPEAK', 'STREAM',
        'USE_EXTERNAL_EMOJIS','USE_VAD',
        'VIEW_AUDIT_LOG', 'VIEW_CHANNEL', 'VIEW_GUILD_INSIGHTS',
    ];

    for (const permission of permissions) {
        if(!permList.includes(permission)) {
            throw new Error(`Unknown permission node ${permission}`)
        }
    }
};

export = (
    bot: Discord.Client,
    options: {
        aliases: Array<string>, 
        expectedArgs: string,
        minArgs: number,
        maxArgs: number | null,
        permissions: Array<PermissionString>,
        permissionError: string,
        callback: any
    },
    Public: Public,
    ) => {

    let {
        aliases,
        expectedArgs = '',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        permissionError = 'Insufficient permissions',
        callback,
    } = options;

    if(permissions.length) {
        validatePermissions(permissions);
    }

    bot.on('message', async (msg: Discord.Message) => {
        const { member, content } = msg;

        for(const alias of aliases) {

            if(content.toLowerCase().split(' ')[0] == prefix
            && content.toLowerCase().split(/[ ]+/)[1] == alias) {

                for(const permission of permissions) {
                    if(!member?.hasPermission(permission)) {
                        msg.reply(permissionError);
                        return;
                    }
                }
                const args = content.split(/[ ]+/);
                args.shift();
                args.shift();

                if(args.length < minArgs || (
                    maxArgs !== null && args.length > maxArgs
                )) {
                    msg.channel.send(`Incorrect syntax, please use \`${prefix} ${alias} ${expectedArgs}\``);
                    return;
                }
                const users = await userModel.find({});

                callback(msg, args, bot, Public, users);
                return;

            }

        }
    });
}