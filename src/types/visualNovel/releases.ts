import { IVisualNovel } from "./visualNovel";

export interface IRelease {
  id: string;
  title: string;
  alttitle?: string;
  languages?: Language[];
  platforms?: string[];
  media?: Media[];
  vns?: VNS[];
  producers?: Producer[];
  released?: string;
  minage?: number;
  patch?: boolean;
  freeware?: boolean;
  uncensored?: boolean;
  official?: boolean;
  has_ero?: boolean;
  resolution?: number[] | string;
  engine?: string;
  voiced?: number;
  notes?: string;
  gtin?: string;
  catalog?: string;
  extlinks?: Extlink[];

}

export interface Extlink {
    url?: string;
    label?: string;
    name? : string;
    id?: string;
  }

export interface Producer {
    developer?: boolean;
    publisher?: boolean;
  }

export interface Language {
  lang?: string;
  title?: string;
  latin?: string;
  mtl?: boolean;
  main?: string;
}

export interface Media {
  medium?: string;
  qty?: number;
}

export interface VNS {
    rtype?: string;
    vn: IVisualNovel
  }