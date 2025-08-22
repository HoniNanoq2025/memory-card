// src/services/api/picsumApi.js
const PICSUM_API_BASE = "https://picsum.photos";

export async function fetchPicsumImages() {
  try {
    // First, get list of available images to ensure we get different ones
    const listResponse = await fetch(
      `${PICSUM_API_BASE}/v2/list?page=1&limit=100`
    );

    if (!listResponse.ok) {
      throw new Error(`Picsum list API error: ${listResponse.status}`);
    }

    const imageList = await listResponse.json();

    // Shuffle and take first 21 images
    const shuffledImages = imageList
      .sort(() => Math.random() - 0.5)
      .slice(0, 21);

    // Transform to match expected format
    const transformedImages = shuffledImages.map((item, index) => ({
      id: item.id || `picsum-${index}`,
      image: {
        original: {
          url: `${PICSUM_API_BASE}/300/300?random=${item.id}`,
        },
      },
      category: `Image ${index + 1}`,
      author: item.author,
    }));

    return { images: transformedImages };
  } catch (error) {
    // Fallback: generate random images without API call
    console.warn("Picsum list API failed, using fallback method:", error);

    const fallbackImages = Array.from({ length: 21 }, (_, index) => ({
      id: `picsum-fallback-${index}`,
      image: {
        original: {
          url: `${PICSUM_API_BASE}/300/300?random=${
            Math.floor(Math.random() * 1000) + index
          }`,
        },
      },
      category: `Image ${index + 1}`,
    }));

    return { images: fallbackImages };
  }
}
