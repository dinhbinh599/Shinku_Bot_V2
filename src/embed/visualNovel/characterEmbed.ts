import type { APIEmbedField, User } from "discord.js";
import { EmbedBuilder } from "discord.js";

import { IVisualNovel } from "../../types/visualNovel/visualNovel.js";
import {
  convertDate,
  convertMinuteToHour,
} from "../../utils/shortFunc/date.js";

const Length = new Map([
  [1, "Very Short"],
  [2, "Short"],
  [3, "Medium"],
  [4, "Long"],
  [5, "Very Long"],
]);

export const characterEmbed = (characterDetail: any): EmbedBuilder => {
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(characterDetail.name)
    .setURL(`https://vndb.org/${characterDetail.id}`)
    .setDescription(
      characterDetail.description
        ? characterDetail.description
            .replace("[spoiler]", "||")
            .replace("[/spoiler]", "||")
        : " "
    )
    .addFields(
      {
        name: "ID",
        value: characterDetail.id,
      },
      {
        name: "Original name",
        value: characterDetail.original ? characterDetail.original : "None",
      },
      {
        name: "Birthday",
        value: characterDetail.birthday
          ? `${characterDetail.birthday[1]}-${characterDetail.birthday[0]}`
          : "None",
      },
      {
        name: "Three Size",
        value:
          characterDetail.bust && characterDetail.waist && characterDetail.hips
            ? `${characterDetail.bust}-${characterDetail.waist}-${characterDetail.hips}`
            : "Unknown",
        inline: true,
      },
      {
        name: "Cup Size",
        value: characterDetail.cup ? characterDetail.cup : "Unknown",
        inline: true,
      },
      {
        name: "Weight",
        value: characterDetail.weight ? characterDetail.weight : "Unknown",
        inline: true,
      }
    )
    .setImage(
      characterDetail.image && characterDetail.image.url && characterDetail.image.sexual < 2
        ? characterDetail.image.url
        : "https://preview.redd.it/koharus-laying-down-the-law-by-v0-rntszta6dpfa1.jpg?width=640&crop=smart&auto=webp&s=efba42cbdcbc6f818165d22fd300e1d29c558c16"
    )
    .setTimestamp();

  return embed;
};
