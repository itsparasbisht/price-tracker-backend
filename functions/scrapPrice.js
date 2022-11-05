const { Cluster } = require("puppeteer-cluster");

const scrappedValues = [];

async function scrapPrice(urls) {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 2,
  });

  await cluster.task(async ({ page, data }) => {
    await page.goto(data.url);

    // get item price
    let price = await page.evaluate(() => {
      let item = document.querySelector(".a-price-whole");
      return item.innerText.replace(/[.,]/g, "");
    });

    scrappedValues.push({
      id: data.id,
      currentPrice: Number(price),
    });
  });

  for (let i = 0; i < urls.length; i++) {
    cluster.queue(urls[i]);
  }

  await cluster.idle();
  await cluster.close();

  return scrappedValues;
}

module.exports = scrapPrice;
