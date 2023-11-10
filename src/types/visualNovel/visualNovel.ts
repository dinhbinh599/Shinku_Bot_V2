export interface IVisualNovel {
  id: string;
  title: string;
  alttitle?: string;
  titles: Title[];
  aliases?: string[];
  olang: string;
  devstatus: number;
  released: string;
  languages: string[];
  platforms: string[];
  image: Image;
  length: number;
  length_minutes?: number;
  length_votes: number;
  description?: string;
  rating: number;
  votecount: number;
  screenshots: Screenshots[];
  tags: Tag[];
}

export interface Tag {
  rating?: number;
  name: string;
  spoiler?: number;
  lie?: boolean;
}

export interface Screenshots {
  thumbnail: string;
  thumbnail_dims?: number[];
  id: string;
  url?: string;
  dims?: number[];
  sexual?: number;
  violence?: number;
  votecount?: number;
}

export interface Image {
  id: string;
  url?: string;
  dims?: number[];
  sexual?: number;
  violence?: number;
  votecount?: number;
}

export interface Relation {
  id: number;
  relation?: string;
  title?: string;
  original?: string;
  official?: boolean;
}

export interface Link {
  wikipedia?: string;
  encubed?: string;
  renai?: string;
  wikidata?: string;
}

export interface ImageFlagging {
  votecount: number;
  sexual_avg?: number;
  violence_avg?: number;
}

export interface Anime {
  id: number;
  ann_id?: number;
  nfo_id?: string;
  title_romaji?: string;
  title_kanji?: string;
  year?: number;
  type?: string;
}

export interface Title {
  lang?: string;
  title?: string;
  latin?: string;
  official?: string;
  main?: boolean;
}
