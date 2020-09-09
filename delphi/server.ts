import Discord, { Message } from 'discord.js';
import dotenv from 'dotenv';

import { config } from 'config';
import { CommandHandler } from './command-handler';

dotenv.config();

const commandHandler = new CommandHandler(config.prefix);
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Bot has started');
});

client.on('message', (message: Message) => {
    commandHandler.handleMessage(message);
});

client.on('error', e => {
    console.error('Discord client error!', e);
});

client.login(process.env.DISCORD_TOKEN);

