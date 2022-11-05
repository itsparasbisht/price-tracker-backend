const express = require("express");
const notifyRouter = express.Router();
const Item = require("../model/items");

notifyRouter.post("/", (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const newItem = new Item({
      product: data.title,
      productUrl: data.productUrl,
      imageUrl: data.image,
      price: data.price,
      priceSelected: data.selectedPrice,
      email: data.email,
    });

    newItem.save((err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
      } else {
        res.status(201).json({ item: result });
      }
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: error });
  }
});

module.exports = notifyRouter;
