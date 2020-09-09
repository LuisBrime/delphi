import { Command } from 'commands';
import { CommandContext } from 'models/command-context';

export class GreetCommand implements Command {
  readonly commandNames = ['greet', 'hello', 'salute'];

  private greets = [
    `Hello there!`,
    `WASAAAAAAAAAAP`,
    `What's up boooy`,
    `Hey there`,
    `Hi how's it going?`,
    `How's life?`,
    `It's been a while!`,
    `Hey, I missed you`,
    `Hi sweetie`,
    `Hey darling!`,
    `There's my favorite person!`,
    `Hi.`
  ]

  getHelpMessage(commandPrefix: string): string {
    return `
      Use this command to get a greet from the bot!

      Aliases:
        ${this.commandNames.map(
          name => `${commandPrefix}${name}`
        ).join(', ')}
    `;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
    await parsedUserCommand.originalMessage.reply(
      this.greets[Math.floor(Math.random() * this.greets.length)]
    );
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }
}
