const puppeteer = require("puppeteer");

async function scrapItem(itemUrl) {
  const URL = itemUrl;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(URL, { waitUntil: "domcontentloaded" });

    // get item title
    let title = await page.evaluate(() => {
      let item = document.querySelector("#productTitle");
      return item?.innerText;
    });

    // get item price
    let price = await page.evaluate(() => {
      let item = document.querySelector(".a-price-whole");
      return parseInt(item?.innerText.replace(/\D/g, ""));
    });

    // get item image
    let image = await page.evaluate(() => {
      let item = document.querySelector("#landingImage");
      return item?.getAttribute("src");
    });

    if (title) {
      return {
        title,
        image,
        price,
      };
    }
    return { error: "failed to scrap data" };
  } catch (error) {
    console.error("Error accessing the page:", error);
    return null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = scrapItem;
