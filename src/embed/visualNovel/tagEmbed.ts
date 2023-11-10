import { EmbedBuilder } from "discord.js";

import { convertDate } from "../../utils/shortFunc/date.js";
import { IRelease } from "../../types/visualNovel/releases.js";
import { IVisualNovel } from "../../types/visualNovel/visualNovel.js";

export const tagEmbed = (
  visualNovelDetail: IVisualNovel,
  visualNovelID: string
): EmbedBuilder => {
  const noSpoilerTags = visualNovelDetail.tags
    .filter((tag) => {
      return tag.spoiler === 0;
    })
    .sort((a, b) => b.rating! - a.rating!);

  const tagsInformation = noSpoilerTags.reduce((accumulator, currentValue) => {
    return (
      accumulator +
      `${currentValue.name!} : ${(
        Math.round(currentValue.rating! * 10) / 10
      ).toString()}\n`
    );
  }, "");

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(visualNovelDetail.title)
    .addFields({
      name: "ID",
      value: visualNovelID,
    })
    .setURL(`https://vndb.org/${visualNovelDetail.id}`)
    .setDescription(tagsInformation)
    .setImage(
      visualNovelDetail.image.url && visualNovelDetail.image.sexual === 0
        ? visualNovelDetail.image.url
        : "https://preview.redd.it/koharus-laying-down-the-law-by-v0-rntszta6dpfa1.jpg?width=640&crop=smart&auto=webp&s=efba42cbdcbc6f818165d22fd300e1d29c558c16"
    )
    .setTimestamp();

  return embed;
};
