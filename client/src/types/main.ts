export interface Anime {
  _id: string;
  image?: string;
  thumbnail: string;
  title: string;
  story: string;
  genre: string[];
  tags: string[];
  releaseType: string;
  updateDay?: string;
  isOnly: boolean;
  isDubbing: boolean;
  isUncut: boolean;
  isAdult: boolean;
  stars: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface DailyIndex {
  [index: string]: Anime[];
}

export interface Poster {
  _id: string;
  item?: string;
  image: string;
  logo: string;
  content: string;
  buttonText: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  link?: string;
}

export interface Time {
  _id: string;
  item: Anime;
  dailyView: number;
  totalView: number;
  createdAt: string;
  updatedAt: string;
  _v: number;
}

interface ThemeAnime extends Anime {
  isAd: string;
}

interface Theme {
  createdAt: string;
  items: ThemeAnime[];
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface HotsIndex {
  [index: string]: Time[];
}

export interface MainQuery {
  posters: Poster[];
  themes: Theme[];
  hots: HotsIndex;
}
