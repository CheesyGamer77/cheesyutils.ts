import { CommandInteraction } from "discord.js";

export default abstract class SlashCommand {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    async process(interaction: CommandInteraction): Promise<void> {
        if(interaction.commandName === this.name) {
            await this.invoke(interaction);
        }
    }

    abstract invoke(interaction: CommandInteraction): Promise<void>;
}