export type Photo = {
  id: number;
  // eslint-disable-next-line camelcase
  img_src: string;
};

export type SolPhotoSet = { photoSet: Photo[], sol: number };

export type AppState = {
  favourites: Photo[];
  currentSol: number;
  solPhotoSets: SolPhotoSet[];
}
