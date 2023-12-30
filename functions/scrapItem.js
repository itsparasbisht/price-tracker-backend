const puppeteer = require("puppeteer");
const { executablePath } = require("puppeteer");

console.log("chromium path - ", executablePath());

async function scrapItem(itemUrl) {
  const URL = itemUrl;
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      executablePath: executablePath(),
    });
    const page = await browser.newPage();
    await page.goto(URL);

    // get item title
    let title = await page.evaluate(() => {
      let item = document.querySelector("#productTitle");
      return item.innerText;
    });

    // get item price
    let price = await page.evaluate(() => {
      let item = document.querySelector(".a-price-whole");
      return parseInt(item.innerText.replace(/\D/g, ""));
    });

    // get item image
    let image = await page.evaluate(() => {
      let item = document.querySelector("#landingImage");
      return item.getAttribute("src");
    });

    return {
      title,
      image,
      price,
    };
  } catch (error) {
    console.error("error - ", error);
    throw new Error(error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = scrapItem;
