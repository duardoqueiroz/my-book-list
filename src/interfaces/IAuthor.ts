import { Book } from "./IBook";

export interface Author {
  url: string;
  name: string;
  books: Book[];
}
