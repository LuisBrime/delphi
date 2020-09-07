import { Command } from 'commands';
import { CommandContext } from 'models/command-context';

export class GreetCommand implements Command {
  commandNames = ['greet', 'hello'];

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}greet to get a greeting from the bot!`;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
    await parsedUserCommand.originalMessage.reply('Hello there!');
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }
}
