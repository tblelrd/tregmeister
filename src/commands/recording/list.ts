import { Client, Message } from "discord.js";
import { Public, user } from "../../types/types";

export = {
    aliases: ['list'],
    maxArgs: 0,
    callback: (msg: Message, _args: Array<string>, _bot: Client, _Public: Public, users: Array<user>) => {
        msg.channel.send(`\`\`\`nim\n${users.map(user => `${user.username}\nDate added: ${dateStringify(user.started)}`).join('\n---\n')}\`\`\``)
    }
}

const dateStringify = (ms: number) => {
    const iso = new Date(ms).toUTCString();

    return iso; 
};