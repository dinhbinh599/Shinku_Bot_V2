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
  @Slash({ name: "info", description: "Info student" })
  async infoStudent(
    @SlashOption({
      description: "Visual Novel Name",
      name: "name",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    visualNovelName: string,

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
      const visualNovelList = await this.visualNovelApi.queryVisualNovelByName(
        visualNovelName
      );
      if (visualNovelList.length === 0)
        return editOrReplyThenDelete(interaction, "❌ No visual novel found.");

      const names = visualNovelList.map((vn) => {
        return {
          label: vn.title.substring(0, 100),
          value: vn.id.toString() + "_" + isPublic.toString(),
        };
      });

      const menu = new StringSelectMenuBuilder()
        .addOptions(names)
        .setCustomId("name-menu");

      const buttonRow =
        new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
          menu
        );

      interaction.editReply({
        components: [buttonRow],
        content: `I have found ${names.length} Visual Novel, please select one`,
      });
      return;
    } catch (err: any) {
      console.log(err);
      return editOrReplyThenDelete(interaction, "❌ " + err.message);
    }
  }

  @SelectMenuComponent({ id: "name-menu" })
  async handle(interaction: StringSelectMenuInteraction): Promise<unknown> {
    const visualNovelID = interaction.values?.[0].split("_")[0];
    const isPublic =
      interaction.values?.[0].split("_")[1] === "true" ? true : false;
    await interaction.deferReply({ ephemeral: !isPublic });

    // extract selected value by member

    // if value not found
    if (!visualNovelID) {
      return interaction.followUp("invalid visual novel, select again");
    }

    const visualNovel = await this.visualNovelApi.queryVisualNovelById(
      visualNovelID
    );
    const embed = infoEmbed(visualNovel[0]);

    await interaction.editReply({ embeds: [embed], components: [row()] });

    return;
  }

  @ButtonComponent({ id: "visualNovelDetails" })
  async detailsBtnComponent(interaction: ButtonInteraction): Promise<void> {
    await interaction.deferUpdate();
    const visualNovelID = interaction.message.embeds[0]!.data.fields![0]!.value;

    const visualNovel = await this.visualNovelApi.queryVisualNovelById(
      visualNovelID
    );
    const embed = infoEmbed(visualNovel[0]);

    await interaction.editReply({ embeds: [embed], components: [row()] });

    return;
  }

  @ButtonComponent({ id: "visualNovelScreenshots" })
  async screenshotBtnComponent(interaction: ButtonInteraction): Promise<void> {
    await interaction.deferUpdate();
    const visualNovelID = interaction.message.embeds[0]!.data.fields![0]!.value;

    const visualNovel = await this.visualNovelApi.queryVisualNovelById(
      visualNovelID
    );
    const embed = screenshotEmbed(visualNovel[0], visualNovelID);

    if (Array.isArray(embed)) {
      await interaction.editReply({ embeds: embed, components: [row()] });
      return;
    }

    await interaction.editReply({ embeds: [embed], components: [row()] });
    return;
  }

  @ButtonComponent({ id: "visualNovelReleases" })
  async releasesBtnComponent(interaction: ButtonInteraction): Promise<void> {
    await interaction.deferUpdate();
    const visualNovelID = interaction.message.embeds[0]!.data.fields![0]!.value;

    const release = await this.visualNovelApi.queryVisualNovelReleases(
      visualNovelID
    );

    const embed = releaseEmbed(release, visualNovelID);

    await interaction.editReply({ embeds: [embed], components: [row()] });

    return;
  }
  
  @ButtonComponent({ id: "visualNovelTags" })
  async tagBtnComponent(interaction: ButtonInteraction): Promise<void> {
    await interaction.deferUpdate();
    const visualNovelID = interaction.message.embeds[0]!.data.fields![0]!.value;
    const visualNovel = await this.visualNovelApi.queryVisualNovelById(
      visualNovelID
    );

    const embed = tagEmbed(visualNovel[0], visualNovelID);

    await interaction.editReply({ embeds: [embed], components: [row()] });

    return;
  }
}

export default VisualNovelCommand;
