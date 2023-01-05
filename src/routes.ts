import { Dataset, createPuppeteerRouter } from "crawlee";
import Crawler from "./Crawler.js";
import Books from "./schemas/Books.js";

export const router = createPuppeteerRouter();
router.addDefaultHandler(async ({ log, page }) => {
  const crawler = new Crawler(page, log);

  //Getting the title of the book
  log.info("Getting title");
  const titleXPath = "//*[@id='bookTitle']";
  const titleSelector = "#bookTitle";
  var bookTitle = await crawler.getTextContent(titleSelector);

  //Getting the author of the book
  log.info("Getting author");
  const authorXPath = "//*[@id='bookAuthors']/span[2]/div/a/span";
  const authorSelector = "#bookAuthors > span:nth-child(2) > div > a > span";
  var bookAuthor = await crawler.getTextContent(authorSelector);

  //Getting book rating value
  log.info("Getting rating");
  const ratingValueXPath = "//*[@id='bookMeta']/span[2]";
  const ratingValueSelector = "#bookMeta > span:nth-child(2)";
  var bookRating = await crawler.getTextContent(ratingValueSelector);

  //Getting book rating quantity
  const ratingQuantityXPath = "//*[@id='bookMeta']/a[2]/meta";
  const ratingQuantitySelector = "#bookMeta > a:nth-child(7) > meta";
  var bookRatingQuantity = await crawler.getAttributeContent(
    ratingQuantitySelector,
    "content"
  );

  //Getting book review quantity
  const reviewQuantityXPath = "//*[@id='bookMeta']/a[3]/meta";
  const reviewQuantitySelector = "#bookMeta > a:nth-child(9) > meta";
  var bookReviewQuantity = await crawler.getAttributeContent(
    reviewQuantitySelector,
    "content"
  );

  //Getting author data
  const authorAnchorXPath = "//*[@id='bookAuthors']/span[2]/div/a";
  const authorAnchorSelector = "#bookAuthors > span:nth-child(2) > div > a";
  var authorUrl = await crawler.getAttributeContent(
    authorAnchorSelector,
    "href"
  );

  await Dataset.pushData({
    url: page.url(),
    title: bookTitle,
    author: {
      name: bookAuthor,
      url: authorUrl,
    },
    rating: {
      value: parseFloat(bookRating!),
      quantity: parseFloat(bookRatingQuantity!),
      reviews: parseFloat(bookReviewQuantity!),
    },
  });

  try {
    await Books.create({
      url: page.url(),
      title: bookTitle,
      rating: {
        rating: parseFloat(bookRating!),
        count: parseFloat(bookRatingQuantity!),
        reviews: parseFloat(bookReviewQuantity!),
      },
      author: {
        name: bookAuthor,
      },
    });
  } catch (error) {
    console.log(error);
  }
});
