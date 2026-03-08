/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// export const fetchPixabayImages = async (query: string, count = 6) => {
//   const res = await fetch(
//       `https://api.pexels.com/v1/search?query=${encodeURIComponent(
//         query
//       )}&per_page=${count}`,
//       {
//         headers: {
//           Authorization: process.env.PEXELS_API_KEY || "",
//         },
//         cache: "no-store",
//       }
//     );

//   if (!res.ok) {
//     console.log("Unsplash chlra");
//     return [
//       "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
//     ];
//   }

//   const data = await res.json();

//   return data?.hits?.length
//     ? data.hits.map((img: any) => img.largeImageURL)
//     : [
//         "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
//       ];
// };

export const fetchPexelsImages = async (query: string, count = 6) => {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        query
      )}&per_page=${count}`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY || "",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Pexels API Error:", res.status);
      return [];
    }

    const data = await res.json();

    if (!data?.photos) return [];

    return data.photos.map((img: any) => img.src.large);
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
};