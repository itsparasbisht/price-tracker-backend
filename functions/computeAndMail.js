const mailWithData = require("./mailWithData");
const Items = require("../model/items");

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

      // update db with active false
      Items.findByIdAndUpdate(item.id, { active: false }, (err, result) => {
        if (err) {
          console.log("-----------error while updating-----------");
          console.log(error);
        } else {
          console.log(`${item.id} updated`);
        }
      });
    } else {
      console.log(`${item.id} -------- NOT YET`);
    }
  });
}

module.exports = computeAndMail;
