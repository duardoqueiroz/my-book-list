import { Author } from "./IAuthor";

export interface BookRating {
  rating: number;
  count: number;
  reviewsCount: number;
}

export interface Book {
  url: string;
  title: string;
  rating: BookRating;
  author: Author;
}
