import axios from 'axios';

const API_URL = 'https://api.artic.edu/api/v1/artworks';

export const fetchProducts = async () => {
  const response = await axios.get(API_URL, {
    params: {
      limit: 24,
    },
  });
  
  const products = response.data.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    thumbnail: item.thumbnail?.lqip || '',
    artist_display: item.artist_display || 'Unknown artist',
    place_of_origin: item.place_of_origin || 'Unknown origin',
    dimensions: item.dimensions || 'Unknown dimensions',
    description: item.description || 'No description available',
    liked: false,
    image_url: item.image_url || '', 
  }));

  return products;
};
