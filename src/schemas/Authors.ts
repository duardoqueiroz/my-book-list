import Mongo from "mongoose";
import { Book } from "../interfaces/IBook";
import { Author } from "../interfaces/IAuthor";
import Books from "./Books";

const AuthorSchema = new Mongo.Schema<Author>({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  books: {
    type: [Object],
    required: false,
  },
});

export default Mongo.model<Author>("Authors", AuthorSchema);
