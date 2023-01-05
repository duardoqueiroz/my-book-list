// For more information, see https://crawlee.dev/
import { PuppeteerCrawler, log } from "crawlee";
import "./database/index.ts";
import { router } from "./routes.js";

const startUrls = ["https://www.goodreads.com/book/show/2784.Ways_of_Seeing"];

const crawler = new PuppeteerCrawler({
  // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
  requestHandler: router,
  headless: false,
});

await crawler.run(startUrls);
