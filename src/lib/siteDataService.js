import {
  fetchGalleryImagesFromSheet,
  fetchHeroSlidesFromSheet,
  fetchOffersFromSheet,
} from './sheetsService';

export async function fetchGalleryImages() {
  return fetchGalleryImagesFromSheet();
}

export async function fetchHeroSlides() {
  return fetchHeroSlidesFromSheet();
}

export async function fetchOffers() {
  return fetchOffersFromSheet();
}
