const puppeteer = require("puppeteer");

async function scrapItem(itemUrl) {
  const URL = itemUrl;

  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
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
        return item.innerText.replace(/[.,]/g, "");
      });

      // get item image
      let image = await page.evaluate(() => {
        let item = document.querySelector("#landingImage");
        return item.getAttribute("src");
      });

      await browser.close();

      resolve({
        title,
        image,
        price: parseInt(price),
      });
    } catch (error) {
      console.error(error);
      reject({ error });
    }
  });
}

module.exports = scrapItem;
