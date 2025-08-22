// src/services/api/dogApi.js
const DOG_API_URL = "https://api.thedogapi.com/v1/images/search";

export async function fetchDogImages() {
  try {
    // Fetch 21 random dog images
    const response = await fetch(`${DOG_API_URL}?limit=21&size=med`);

    if (!response.ok) {
      throw new Error(`Dog API error: ${response.status}`);
    }

    const result = await response.json();

    if (!Array.isArray(result) || result.length === 0) {
      throw new Error("Invalid response format from Dog API");
    }

    // Transform to match expected format
    const transformedImages = result.map((item, index) => ({
      id: item.id || `dog-${index}`,
      image: {
        original: {
          url: item.url,
        },
      },
      category: `Dog ${index + 1}`,
      width: item.width,
      height: item.height,
    }));

    return { images: transformedImages };
  } catch (error) {
    console.error("Dog API failed:", error);
    throw error;
  }
}
