const mailWithData = require("./mailWithData");

function computeAndMail(items, currentPrice) {
  const itemUpdated = [];

  items.forEach((item) => {
    const itemId = item.id;

    for (let i = 0; i < currentPrice.length; i++) {
      if (currentPrice[i].id === itemId) {
        itemUpdated.push({
          id: itemId,
          title: item.product,
          productUrl: item.productUrl,
          imageUrl: item.imageUrl,
          oldPrice: item.price,
          priceSelected: item.priceSelected,
          currentPrice: currentPrice[i].currentPrice,
          email: item.email,
        });
        break;
      }
    }
  });

  itemUpdated.forEach((item) => {
    if (item.currentPrice <= item.priceSelected) {
      mailWithData("reached", item, item.email);
    } else {
      console.log(`${item.id} -------- NOT YET`);
    }
  });
}

module.exports = computeAndMail;
