import Mongo from "mongoose";
import { Book } from "../interfaces/IBook";

const BooksSchema = new Mongo.Schema<Book>({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Object,
    required: true,
  },
  author: {
    type: Object,
    required: true,
  },
});

export default Mongo.model<Book>("Books", BooksSchema);
