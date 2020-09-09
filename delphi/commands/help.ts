import { Message } from 'discord.js';

import { Command } from 'commands';
import { CommandContext } from 'models/command-context';

export class HelpCommand implements Command {
  readonly commandNames = ['help', 'halp', 'sos'];

  private commands: Command[];

  constructor(commands: Command[]) {
    this.commands = commands;
  }

  async run(commandContext: CommandContext): Promise<void> {
    const allowedCommands = this.commands.filter(
      command => command.hasPermissionToRun(commandContext)
    );

    if (commandContext.args.length == 0) {
      // No help for specific command, show all of them.
      const commandNames = allowedCommands.map(command => command.commandNames[0]);
      await commandContext.originalMessage.reply(
        `Here is a list of the commands you can run:
          - ${commandNames.join(', ')}
         Try ${commandContext.commandPrefix}help ${commandNames[0]} to learn more about one of them.
        `
      );
      return;
    }

    const matchedCommand = this.commands.find(
      command => command.commandNames.includes(commandContext.args[0]);
    );
    if (!matchedCommand) {
      await commandContext.originalMessage.reply(
        `I don't know that command! Try ${commandContext.commandPrefix}help to see all possible commands`
      );
      return Promise.reject('Unrecognized command');
    } else if (allowedCommands.includes(matchedCommand)) {
      await commandContext.originalMessage.reply(
        this.buildHelpMessageForCommand(matchedCommand, commandContext);
      )
    }
  }

  private buildHelpMessageForCommand(command: Command, context: CommandContext): string {
    return `
      ${command.getHelpMessage(context.commandPrefix)}
    `;
  }

  hasPermissionToRun(commandContext: CommandContext): boolean {
    return true;
  }

  getHelpMessage(commandPrefix: string) {
    return 'This command is really self explanatory...';
  }
}