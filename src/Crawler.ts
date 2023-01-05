import { Log } from "crawlee";
import { Page } from "puppeteer";

export default class Crawler {
  private page: Page;
  private log: Log;
  constructor(page: Page, log: Log) {
    this.page = page;
    this.log = log;
  }

  public async getTextContent(selector: string): Promise<string> {
    var textContent: string = "";
    try {
      const element = await this.page.$(selector);
      textContent =
        (await this.page.evaluate((el) => el?.textContent, element)) || "";
    } catch (error) {
      console.log(error);
      this.log.error(`Error getting text content. Selector: ${selector}`);
    }
    if (textContent === "") this.log.error("Content not found!");
    return textContent.trim();
  }

  public async getAttributeContent(
    selector: string,
    attribute: string
  ): Promise<string> {
    var attributeContent: string = "";
    try {
      const element = await this.page.$(selector);
      attributeContent =
        (await this.page.evaluate(
          (el, attr) => el?.getAttribute(attr),
          element,
          attribute
        )) || "";
    } catch (error) {
      console.log(error);
      this.log.error(
        `Error getting attribute content. Selector: ${selector} | Attribute: ${attribute}`
      );
    }
    return attributeContent.trim();
  }
}
