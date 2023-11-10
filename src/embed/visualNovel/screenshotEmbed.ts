import { EmbedBuilder } from "discord.js";

import { convertDate } from "../../utils/shortFunc/date.ts";
import { IRelease } from "../../types/visualNovel/releases.ts";
import { IVisualNovel } from "../../types/visualNovel/visualNovel.ts";

export const screenshotEmbed = (
  visualNovelDetail: IVisualNovel,
  visualNovelID: string
): EmbedBuilder | EmbedBuilder[] => {
  const SFW_Screenshots = visualNovelDetail.screenshots
    .filter((screenshot) => {
      return screenshot.sexual === 0;
    })
    .slice(0, 10);

  if (SFW_Screenshots.length > 0) {
    const embedList = SFW_Screenshots.map((screenshot) => {
      return new EmbedBuilder()
        .setURL("https://s2.vndb.org/sf/")
        .setImage(screenshot.url!).addFields({
            name: "ID",
            value: visualNovelID,
          });
    });
    return embedList;
  } else {
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Vote List")
      .addFields({
        name: "ID",
        value: visualNovelID,
      })
      .setDescription("This visual novel has no images")
      .setTimestamp();
    return embed;
  }
};
