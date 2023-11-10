import {
    ButtonInteraction,
    CommandInteraction,
    InteractionReplyOptions,
    InteractionResponse,
    Message,
    MessageContextMenuCommandInteraction,
    MessagePayload,
    ModalSubmitInteraction,
    StringSelectMenuInteraction,
  } from 'discord.js';


export const timeout = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms));

export async function editOrReplyThenDelete(
    interaction:
      | CommandInteraction
      | ButtonInteraction
      | MessageContextMenuCommandInteraction
      | ModalSubmitInteraction
      | StringSelectMenuInteraction
      | Message,
    options: string | InteractionReplyOptions | MessagePayload = '',
    delay = 5000,
  ): Promise<void> {
    let msg: Message;
    if (interaction instanceof Message) msg = await interaction.reply(options as string | MessagePayload);
    else if (interaction.deferred) msg = await interaction.editReply(options);
    else msg = await interaction.reply(options).then(async (res: InteractionResponse) => await res.fetch());
  
    await timeout(delay);
  
    if (interaction instanceof Message) msg.delete();
    else interaction.deleteReply();
  }