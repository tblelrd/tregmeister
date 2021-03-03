import check from '../utils/check';
import { Client } from 'discord.js';

const background = (bot: Client) => {
    check(bot);
}

export default background;