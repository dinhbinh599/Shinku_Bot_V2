// import type { ArgsOf, Client } from 'discordx';
import { ChannelType } from "discord.js";
import { ArgsOf, Discord, On } from "discordx";
import { CommonConstants, NHentaiConstants } from "../constants/index.ts";
// import NotifyChannel from '../models/NotifyChannel.js';
import { NHentaiEmbed } from "../embed/nhentai/nhentaiEmbed.ts";
import NHentaiApi from "../api/nhentai.ts";
import { INHentai } from "../types/nhentai.js";
import { timeout } from "../utils/index.ts";

@Discord()
export class CommonEvents {
  private readonly NHentaiAPI = new NHentaiApi();

  /**
   * NHentai autoview
   *
   * @param {ArgsOf<'messageCreate'>} [message]
   * @memberof CommonEvents
   *
   */
  @On({ event: "messageCreate" })
  async NHentaiAutoview([message]: ArgsOf<"messageCreate">): Promise<void> {
    if (message.author.bot) return;
    if (message.channel.type !== ChannelType.GuildText) return;
    if (!message.channel.nsfw) return;

    let codes: Array<string> | null = message.content
      .replace(/<a?:.+?:\d+>/g, "") // remove all emojis
      .replace(/<@!?\d+>/g, "") // remove all mentions
      .replace(/https?:\/\/\S+/g, "") // remove all links (both http and https)
      // match all 6 digits separated by space, comma, or newline
      .match(/(?<!\d)\d{6}(?!\d)/g);

    if (!codes || codes.length === 0) return;

    // const isChannelEnabled = await NotifyChannel.exists({
    //   channelId: message.channelId,
    //   notifyType: CommonConstants.NOTIFY_TYPE.NHENTAI_AUTOVIEW,
    // });

    // if (!isChannelEnabled) return;

    codes = [...new Set(codes)].slice(
      0,
      CommonConstants.EMBED_LIMIT_PER_MESSAGE
    ); // remove duplicates and limit to max embed per message

    console.log(codes)
    let results: Array<INHentai> = [];
    for (const code of codes) {
      const res = await this.NHentaiAPI.simulateNHentaiRequest(code);
      if (!res || !res.data || res.status === 404) {
        message.reply('Not found ❌ ');
        continue;
      }

      results.push(res.data);
      await timeout(3333);
    }

    if (results.length === 0) return;

    const embeds = results.map((result) =>
      NHentaiEmbed(result, message.author)
    );

    await message.reply({
      embeds: [...embeds],
      allowedMentions: { repliedUser: false },
    });
  }
}
