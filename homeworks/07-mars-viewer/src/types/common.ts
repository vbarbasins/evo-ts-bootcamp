export type NasaPhoto = {
  id: number;
  // eslint-disable-next-line camelcase
  img_src: string;
}

export type Photo = NasaPhoto & {
  favourite: boolean;
  sol: number;
};

export type AppState = {
  currentSol: number;
  photos: Photo[];
  loadingPhotos: boolean;
  showingFavourites: boolean;
}
