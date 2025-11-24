
export interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  videoUrl?: string;
}

export interface WorkPost {
  id: number;
  imageUrl: string;
  caption: string;
  likes: number;
}
