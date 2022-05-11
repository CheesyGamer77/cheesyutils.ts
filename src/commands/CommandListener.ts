import SlashCommand from "./slash/SlashCommand";
import { CommandInteraction } from 'discord.js';

export default class CommandListener {
    private readonly commandMap: Map<string, SlashCommand> = new Map();

    constructor(...commands: SlashCommand[]) {
        for(const command of commands) {
            this.commandMap.set(command.name, command);
        }
    }

    async process(interaction: CommandInteraction) {
        await this.commandMap.get(interaction.commandName)?.process(interaction);
    }
}