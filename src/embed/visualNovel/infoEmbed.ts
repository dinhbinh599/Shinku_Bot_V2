import type { APIEmbedField, User } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

import { IVisualNovel } from '../../types/visualNovel/visualNovel.ts';
import { convertDate, convertMinuteToHour } from '../../utils/shortFunc/date.ts';


const Length = new Map([
    [ 1, 'Very Short'],  
    [ 2, 'Short'],  
    [ 3, 'Medium'],
    [ 4, 'Long'],
    [ 5, 'Very Long']])

export const infoEmbed = (visualNovelDetail: IVisualNovel): EmbedBuilder => {

    const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(visualNovelDetail.title)
    .setURL(`https://vndb.org/${visualNovelDetail.id}`)
    .setDescription(
      visualNovelDetail.description
        ? visualNovelDetail.description
            .replace('[spoiler]', '||')
            .replace('[/spoiler]', '||')
        : ' '
    )
    .addFields(
      {
        name: 'ID',
        value: visualNovelDetail.id,
      },
      {
        name: 'Alternative title',
        value: visualNovelDetail.alttitle ? visualNovelDetail.alttitle : 'None',
      },
      { name: '\u200B', value: '\u200B' },
      {
        name: 'Rating',
        value: visualNovelDetail.rating
          ? visualNovelDetail.rating.toString()
          : 'None',
        inline: true,
      },
      {
        name: 'Release Day',
        value: visualNovelDetail.released
          ? convertDate(visualNovelDetail.released)
          : 'None',
        inline: true,
      }
    )
    .addFields({
        name: 'Playtime',
        value: visualNovelDetail.length_minutes
          ? convertMinuteToHour(visualNovelDetail.length_minutes)
          : Length.get(visualNovelDetail.length) 
          ? Length.get(visualNovelDetail.length)!
          : 'None',
        inline: true,
      })
    .setImage(
        visualNovelDetail.image.url && visualNovelDetail.image.sexual === 0
          ? visualNovelDetail.image.url
          : 'https://preview.redd.it/koharus-laying-down-the-law-by-v0-rntszta6dpfa1.jpg?width=640&crop=smart&auto=webp&s=efba42cbdcbc6f818165d22fd300e1d29c558c16'
      )
    .setTimestamp();

    return embed;
  };