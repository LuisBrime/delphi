export type BotConfig = {
    /* Prefix for Bot commands */
    prefix: string,
    /* Name of the role that gives power over the bot */
    botOwnerRoleName: string,
    /* Add reactions to command indicating success or failure */
    enableReactions: boolean,
};

export const config: BotConfig = {
    prefix: './',
    botOwnerRoleName: '',
    enableReactions: true,
};
