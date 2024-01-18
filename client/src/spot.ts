interface Spot {
    name: String,
    description: String,
    imagePaths: String[],
    lat: Number,
    lng: Number,
    author: String,
    likedBy: String[],
    comments: 
      {
        madeBy: String,
        comment: String,
      }[],
  }

export type {Spot}