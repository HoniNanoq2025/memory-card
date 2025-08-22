// src/services/api/imageService.js
import { fetchPicsumImages } from "./picsumApi.js";
import { fetchCatImages } from "./catApi.js";
import { fetchDogImages } from "./dogApi.js";

export async function fetchImages() {
  try {
    // Try Lorem Picsum first - most reliable
    return await fetchPicsumImages();
  } catch (error) {
    console.warn("Picsum API failed, trying cat API:", error);

    // Try cat API as fallback
    try {
      return await fetchCatImages();
    } catch (fallbackError) {
      console.warn("Cat API failed, trying dog API:", fallbackError);

      // Try dog API as second fallback
      try {
        return await fetchDogImages();
      } catch (secondFallbackError) {
        console.error("All APIs failed:", secondFallbackError);
        throw new Error("All image APIs failed");
      }
    }
  }
}
