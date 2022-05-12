import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export abstract class SlashCommandBase {
    readonly name: string;
    readonly description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    abstract process(interaction: CommandInteraction): Promise<void>;
    abstract invoke(interaction: CommandInteraction): Promise<void>;
}

export default abstract class SlashCommand extends SlashCommandBase {
    readonly data: SlashCommandBuilder;

    constructor(name: string, description: string) {
        super(name, description);

        this.data = new SlashCommandBuilder()
            .setName(name)
            .setDescription(description);
    }

    override async process(interaction: CommandInteraction): Promise<void> {
        if(interaction.commandName === this.name) {
            const subcommand = interaction.options.getSubcommand();
            const subcommandGroup = interaction.options.getSubcommandGroup();

            if(subcommandGroup === null && subcommand == null) {
                await this.invoke(interaction);
            }
        }
    }
}