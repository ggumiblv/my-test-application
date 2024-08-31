export interface Product {
    id: string;
    title: string;
    thumbnail: string; 
    artist_display: string;
    place_of_origin: string;
    dimensions: string;
    description: string | null;
    liked: boolean;
    image_url: string; 
}
