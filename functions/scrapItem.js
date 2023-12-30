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
    await page.goto(URL, { waitUntil: "load", timeout: 0 });

    await page.waitForSelector("#productTitle");
    let element = await page.$("#productTitle");
    const title = await page.evaluate((el) => el.textContent, element);

    await page.waitForSelector(".a-price-whole");
    element = await page.$(".a-price-whole");
    const price = await page.evaluate((el) => el.textContent, element);

    await page.waitForSelector("#landingImage");
    element = await page.$("#landingImage");
    const image = await page.evaluate((el) => el.getAttribute("src"), element);

    // get item title
    // let title = await page.evaluate(() => {
    //   let item = document.querySelector("#productTitle");
    //   return item.innerText;
    // });

    // get item price
    // let price = await page.evaluate(() => {
    //   let item = document.querySelector(".a-price-whole");
    //   return parseInt(item.innerText.replace(/\D/g, ""));
    // });

    // get item image
    // let image = await page.evaluate(() => {
    //   let item = document.querySelector("#landingImage");
    //   return item.getAttribute("src");
    // });

    return {
      title: title.trim(),
      image,
      price: parseInt(price.replace(/\D/g, "")),
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
