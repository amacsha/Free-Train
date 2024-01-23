interface Spot {
  name: string;
  description: string;
  imagePaths: string[];
  lat: number;
  lng: number;
  author: string;
  likedBy: string[];
  comments: {
    madeBy: string;
    comment: string;
  }[];
}

export type { Spot };
