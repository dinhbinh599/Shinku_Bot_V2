
import { EmbedBuilder } from "discord.js";

import {
  convertDate,
} from "../../utils/shortFunc/date.ts";
import { IRelease } from "../../types/visualNovel/releases.ts";


export const releaseEmbed = (
  visualNovelReleases: IRelease[],
  visualNovelID: string
): EmbedBuilder => {
  let release_EN = "";
  let release_JP = "";
  let release_VI = "";

  visualNovelReleases.map((release) => {
    switch (release.languages![0].lang) {
      case "en":
        release_EN += `[${
          release.released !== "TBA" ? convertDate(release.released!) : "TBA"
        } | ${release.platforms![0]} | ${release.title} | ${
          release.patch === true ? "(Patch)" : ""
        }](${release.extlinks![0] ? release.extlinks![0].url : ""})\n`;
        break;
      case "ja":
        release_JP += `[${
          release.released !== "TBA" ? convertDate(release.released!) : "TBA"
        } | ${release.platforms![0]} | ${release.title} | ${
          release.patch === true ? "(Patch)" : ""
        }](${release.extlinks![0] ? release.extlinks![0].url : ""})\n`;
        break;
      case "vi":
        release_VI += `[${
          release.released !== "TBA" ? convertDate(release.released!) : "TBA"
        } | ${release.platforms![0]} | ${release.title} | ${
          release.patch === true ? "(Patch)" : ""
        }](${release.extlinks![0] ? release.extlinks![0].url : ""})\n`;
        break;
      default:
        break;
    }
  });

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("List of releases")
    .addFields({
      name: "ID",
      value: visualNovelID,
    })
    .setTimestamp().setDescription(` ${
    release_EN !== "" ? "**English :flag_gb: **\n" + release_EN : ""
  }\n 
      ${release_JP !== "" ? "**Japanese :flag_jp: **\n" + release_JP : ""}\n 
      ${release_VI !== "" ? "**Vietnamese :flag_vn: **\n" + release_VI : ""}\n 
      `);

  return embed;
};
