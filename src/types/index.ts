export interface TrekItinerary {
  id: string;
  title: string;
  location: string;
  duration: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  highlights: string[];
  description: string;
  maxGroupSize: number;
  bestSeasons: string[];
  elevation: string;
  dayByDay: DayItinerary[];
  inclusions?: string[];
  galleryImages?: string[];
  businessValue?: string[];
  packingChecklist?: PackingChecklist;
  facilities?: TrekFacilities;
}

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  distance?: string;
  elevation?: string;
  accommodation: string;
  meals: string[];
}

export interface PackingChecklist {
  documents: string[];
  backpack: string[];
  clothing: string[];
  footwear: string[];
  accessories: string[];
  others: string[];
}

export interface TrekFacilities {
  campsites: string[];
  water: string[];
  connectivity: string[];
  safety: string[];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  treksCount: number;
  description: string;
  popularTreks: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
  trekName: string;
}