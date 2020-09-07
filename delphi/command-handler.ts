import { Message } from 'discord.js';
import { Command } from 'commands';
import { CommandContext } from 'models/command-context';

export class CommandHandler {
  private commands: Command[];

  private readonly prefix: string;

  constructor(prefix: string) {
    const commandClasses = [
      // TODO - Add commands
    ];

    this.commands = commandClasses.map(commandClass => new commandClass());
    this.prefix = prefix;
  }

  /** Executes user commands contained in a message if appropriate. */
  async handleMessage(message: Message): Promise<void> {
    // TODO
  }

  /** Determines whether or not a message is a user command. */
  private isCommand(message: Message): boolean {
    return message.content.startsWith(this.prefix);
  }
}
