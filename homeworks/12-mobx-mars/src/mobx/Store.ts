import { action, makeAutoObservable } from 'mobx';

import { NasaPhoto, Photo } from '../types/common';

export class Store {
  currentSol = 1

  photos: Photo[] = []

  loadingPhotos = false

  showingFavourites = false

  constructor() {
    makeAutoObservable(this, {
      startPhotoLoad: action.bound,
      loadPhotos: action.bound,
      selectCurrentSol: action.bound,
      addPhotoToFavourites: action.bound,
      removePhotoFromFavourites: action.bound,
    });
  }

  startPhotoLoad() {
    this.loadingPhotos = true;
  }

  loadPhotos(loadedPhotos: NasaPhoto[]) {
    loadedPhotos.forEach((photo) => {
      this.photos.push({
        ...photo,
        favourite: false,
        sol: this.currentSol,
      });
    });
    this.loadingPhotos = false;
  }

  selectCurrentSol(sol: number) {
    this.currentSol = sol;
  }

  addPhotoToFavourites(photoId: number) {
    const photoToUpdate = this.photos.find((photo) => photo.id === photoId);
    if (photoToUpdate) photoToUpdate.favourite = true;
  }

  removePhotoFromFavourites(photoId: number) {
    const photoToUpdate = this.photos.find((photo) => photo.id === photoId);
    if (photoToUpdate) photoToUpdate.favourite = false;
    const anyFavourites = this.photos.find((photo) => photo.favourite === true);
    if (!anyFavourites) this.showingFavourites = false;
  }

  showFavouritePhotos() {
    this.showingFavourites = true;
  }

  hideFavouritePhotos() {
    this.showingFavourites = false;
  }

  loadPhotosAsync(sol: number) {
    this.startPhotoLoad();
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=${sol}&api_key=${process.env.REACT_APP_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        this.loadPhotos(data.photos as unknown as NasaPhoto[]);
      })
      .catch((error) => console.warn(error));
  }
}
