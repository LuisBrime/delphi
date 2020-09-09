import { Message } from 'discord.js';
import { Command, GreetCommand } from 'commands';
import { CommandContext } from 'models/command-context';
import { reactor } from 'utils';
import { HelpCommand } from 'commands/help';

export class CommandHandler {
  private commands: Command[];

  private readonly prefix: string;

  constructor(prefix: string) {
    const commandClasses = [
      // TODO - Add commands
      GreetCommand
    ];

    this.commands = commandClasses.map(commandClass => new commandClass());
    this.commands.push(new HelpCommand(this.commands));
    this.prefix = prefix;
  }

  /** Executes user commands contained in a message if appropriate. */
  async handleMessage(message: Message): Promise<void> {
    if (message.author.bot || !this.isCommand(message)) return;

    const commandContext = new CommandContext(message, this.prefix);

    const allowedCommands = this.commands.filter(command => command.hasPermissionToRun(commandContext));
    const matchedCommands = this.commands.find(
      command => command.commandNames.includes(commandContext.parsedCommandName)
    );

    if (!matchedCommands) {
      await message.reply(`I don't recognize that command. Try using help`);
      await reactor.failure(message);
    } else if (!allowedCommands.includes(matchedCommands)) {
      await message.reply(`You aren't allowed to use that command. Try using help`);
      await reactor.failure(message);
    } else {
      await matchedCommands.run(commandContext).then(() => {
        reactor.success(message);
      }).catch(() => {
        reactor.failure(message);
      })
    }
  }

  /** Determines whether or not a message is a user command. */
  private isCommand(message: Message): boolean {
    return message.content.startsWith(this.prefix);
  }
}
