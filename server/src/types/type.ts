import "express-session";

export interface ChallengeType {
  challenge: String;
  spotName: String;
  completedBy: String[];
  _id?: String;
}

export interface Comment {
  madeBy: String;
  comment: String;
}

export interface Spot {
  name: String;
  description: String;
  imagePaths: String[];
  lat: Number;
  lng: Number;
  author: String;
  likedBy: String[];
  comments: Comment[];
}
