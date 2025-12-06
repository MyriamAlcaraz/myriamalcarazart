export interface Artwork {
  id: string;
  title: string;
  dimensions: string;
  technique: string;
  price: number;
  image: string;
  description: string;
  year?: string;
  status: 'available' | 'sold' | 'reserved';
}

export interface PriceRow {
  dimensions: string;
  priceBase: number;
  priceWithTax: number;
}

export interface WorkflowItem {
  id: string;
  client: string;
  project: string;
  status: 'contact' | 'agreement' | 'production' | 'delivery' | 'complete';
  date: string;
}

export interface SocialPost {
  id: string;
  title: string;
  type: 'carousel' | 'reel';
  content: string[];
  hashtags: string;
}