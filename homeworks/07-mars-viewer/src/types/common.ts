export type Photo = {
  id: number;
  // eslint-disable-next-line camelcase
  img_src: string;
};

export type AppState = {
  currentSearch: Photo[];
  favourites: Photo[];
}
