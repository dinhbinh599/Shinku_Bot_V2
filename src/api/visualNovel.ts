import axios from 'axios';
import { IVisualNovel } from '../types/visualNovel/visualNovel';
import { IRelease } from '../types/visualNovel/releases';

class VisualNovelApi {
  async queryVisualNovelByName(visualNovelName: string) : Promise<IVisualNovel[]>{
    let response = await axios({
      url: `${process.env.VNDB_URL}/vn`,
      method: 'post',
      data: {
        filters: ['search', '=', visualNovelName],
        fields: 'title',
        results: 25,
      },
    });

    return response.data.results;
  };
  
  async queryVisualNovelById(visualNovelId: string) : Promise<IVisualNovel[]> {
    let response = await axios({
      url: `${process.env.VNDB_URL}/vn`,
      method: 'post',
      data: {
        filters: ['id', '=', visualNovelId],
        fields:
          'title, alttitle ,image.url, length_minutes, description, rating, image.url ,screenshots.url, tags.name, released, screenshots.sexual, length, tags.spoiler, tags.rating, image.sexual',
      },
    });
    return response.data.results;
  };
  
  async queryVisualNovelReleases (visualNovelId: string) : Promise<IRelease[]>{
    let response = await axios({
      url: `${process.env.VNDB_URL}/release`,
      method: 'post',
      data: {
        filters: ['vn', '=', ['id', '=', visualNovelId]],
        fields:
          'id, title, platforms, languages.lang, extlinks.url, patch, released',
        results: 100,
        sort: 'released',
      },
    });
    return response.data.results;
  };

  async queryCharacterByName(characterName: string) {
    let response = await axios({
      url: `${process.env.VNDB_URL}/character`,
      method: 'post',
      data: {
        filters: ['search', '=', characterName],
        fields: 'name',
        results: 25,
      },
    });

    return response.data.results;
  };

  async queryCharacterById(characterID: string) : Promise<IVisualNovel[]> {
    let response = await axios({
      url: `${process.env.VNDB_URL}/character`,
      method: 'post',
      data: {
        filters: ['id', '=', characterID],
        fields:
          'name, original, vns.title, description, blood_type, image.url , image.sexual, height, weight, bust, waist, hips, cup, birthday',
      },
    });
    console.log(response.data.results)
    return response.data.results;
  };
}

export default VisualNovelApi;