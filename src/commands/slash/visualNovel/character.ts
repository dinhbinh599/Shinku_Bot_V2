import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CommandInteraction,
  EmbedBuilder,
  MessageActionRowComponentBuilder,
  MessageFlags,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import {
  ButtonComponent,
  Discord,
  SelectMenuComponent,
  Slash,
  SlashChoice,
  SlashGroup,
  SlashOption,
} from "discordx";

import { editOrReplyThenDelete } from "../../../utils/shortFunc/editOrReplyThenDelete.ts";
import VisualNovelApi from "../../../api/visualNovel.ts";
import { infoEmbed } from "../../../embed/visualNovel/infoEmbed.ts";
import { releaseEmbed } from "../../../embed/visualNovel/releaseEmbed.ts";
import { screenshotEmbed } from "../../../embed/visualNovel/screenshotEmbed.ts";
import { tagEmbed } from "../../../embed/visualNovel/tagEmbed.ts";
import { characterEmbed } from "../../../embed/visualNovel/characterEmbed.ts";

const studentMoreInfoBtn = () =>
  new ButtonBuilder()
    .setLabel("❕ Details")
    .setStyle(ButtonStyle.Primary)
    .setCustomId("visualNovelDetails");

const studentStatsBtn = () =>
  new ButtonBuilder()
    .setLabel("🖼️ Screenshots")
    .setStyle(ButtonStyle.Primary)
    .setCustomId("visualNovelScreenshots");

const studentSkillsBtn = () =>
  new ButtonBuilder()
    .setLabel("🏷️ Tags")
    .setStyle(ButtonStyle.Primary)
    .setCustomId("visualNovelTags");
const studentWeaponBtn = () =>
  new ButtonBuilder()
    .setLabel("📘 Releases")
    .setStyle(ButtonStyle.Primary)
    .setCustomId("visualNovelReleases");

const row = () =>
  new ActionRowBuilder<MessageActionRowComponentBuilder>()
    .addComponents(studentMoreInfoBtn())
    .addComponents(studentStatsBtn())
    .addComponents(studentSkillsBtn())
    .addComponents(studentWeaponBtn());

@Discord()
@SlashGroup({ name: "vn", description: "Visual Novel Commands" })
class VisualNovelCommand {
  private readonly visualNovelApi = new VisualNovelApi();

  @SlashGroup("vn")
  @Slash({ name: "character", description: "Character information" })
  async infoStudent(
    @SlashOption({
      description: "Character Name",
      name: "name",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    characterName: string,

    @SlashOption({
      description: "Show Everyone?",
      name: "public",
      required: true,
      type: ApplicationCommandOptionType.Boolean,
    })
    isPublic: string,
    interaction: CommandInteraction
  ) {
    await interaction.deferReply({ ephemeral: true });

    try {
      const characterList = await this.visualNovelApi.queryCharacterByName(
        characterName
      );

     
      if (characterList.length === 0)
        return editOrReplyThenDelete(interaction, "❌ No character found.");

      const names = characterList.map((character: { name: string; id: string }) => {
        return {
          label: character.name.substring(0, 100),
          value: character.id + "_" + isPublic.toString(),
        };
      });

      const menu = new StringSelectMenuBuilder()
        .addOptions(names)
        .setCustomId("character-name-menu");

      const buttonRow =
        new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
          menu
        );

      interaction.editReply({
        components: [buttonRow],
        content: `I have found ${names.length} character, please select one`,
      });
      return;
    } catch (err: any) {
      console.log(err);
      return editOrReplyThenDelete(interaction, "❌ " + err.message);
    }
  }

  @SelectMenuComponent({ id: "character-name-menu" })
  async handle(interaction: StringSelectMenuInteraction): Promise<unknown> {
    const characterID = interaction.values?.[0].split("_")[0];
    const isPublic =
      interaction.values?.[0].split("_")[1] === "true" ? true : false;
    await interaction.deferReply({ ephemeral: !isPublic });

    // extract selected value by member

    // if value not found
    if (!characterID) {
      return interaction.followUp("invalid character, select again");
    }

    const characters = await this.visualNovelApi.queryCharacterById(
      characterID
    );
    const embed = characterEmbed(characters[0]);

    await interaction.editReply({ embeds: [embed] });

    return;
  }
}

export default VisualNovelCommand;
