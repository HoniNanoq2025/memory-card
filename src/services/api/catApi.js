// src/services/api/catApi.js
const CAT_API_URL = "https://api.thecatapi.com/v1/images/search";

export async function fetchCatImages() {
  try {
    // Fetch 21 random cat images
    const response = await fetch(`${CAT_API_URL}?limit=21&size=med`);

    if (!response.ok) {
      throw new Error(`Cat API error: ${response.status}`);
    }

    const result = await response.json();

    if (!Array.isArray(result) || result.length === 0) {
      throw new Error("Invalid response format from Cat API");
    }

    // Transform to match expected format
    const transformedImages = result.map((item, index) => ({
      id: item.id || `cat-${index}`,
      image: {
        original: {
          url: item.url,
        },
      },
      category: `Cat ${index + 1}`,
      width: item.width,
      height: item.height,
    }));

    return { images: transformedImages };
  } catch (error) {
    console.error("Cat API failed:", error);
    throw error;
  }
}
