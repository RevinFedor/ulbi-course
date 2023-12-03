export interface MovieResults {
  id: string;
  originalTitleText: {
    text: string;
    __typename: string;
  };
  primaryImage: {
    id: string;
    width: number;
    height: number;
    url: string | null;
    caption: {
      plainText: string;
      __typename: string;
    };
    __typename: string;
  };
  releaseDate: null;
  releaseYear: { year: number; endYear: null; __typename: string };
  titleText: { text: string; __typename: string };
  titleType: {
    text: string;
    id: string;
    isSeries: false;
    isEpisode: false;
    __typename: string;
  };
  _id: string;
}

export interface Movie {
  page: number;
  next: string;
  entries: number;
  results: MovieResults[];
}

export interface MovieSchema {
  data?: Movie;
  isLoading: boolean;
  error?: string;
  counter: number;
}
