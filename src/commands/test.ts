import { Client, Message } from "discord.js";
import { Public, user } from "../types/types";

export = {
    aliases: ['test'],
    maxArgs: 0,
    callback: (msg: Message, args: Array<string>, bot: Client, Public: Public, users: Array<user>) => {
        //
    },
};