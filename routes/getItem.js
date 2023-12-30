const express = require("express");
const getItemRouter = express.Router();
const scrapItem = require("../functions/scrapItem");

getItemRouter.post("/", (req, res) => {
  const { itemUrl } = req.body;

  if (itemUrl) {
    scrapItem(itemUrl)
      .then((response) => {
        console.log(">>>", response);
        if (response?.title) {
          res.json({ item: response });
        } else {
          res.json({ message: "failed to scrap data" });
        }
      })
      .catch((error) => {
        console.log("---", error);
        res.status(500).json({ error: error.message });
      });
  } else {
    res.json({
      message: "provide product url from amazon in your request body",
    });
  }
});

module.exports = getItemRouter;
