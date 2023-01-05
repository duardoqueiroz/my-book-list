import Mongo from "mongoose";

await Mongo.connect("mongodb://localhost:27017/my-book-list").then(() =>
  console.log("\nDB Connected\n")
);
