const express = require("express");
const getItemRouter = express.Router();
const scrapItem = require("../functions/scrapItem");

getItemRouter.post("/", (req, res) => {
  const { itemUrl } = req.body;

  if (itemUrl) {
    const data = scrapItem(itemUrl);
    console.log("DATA --->", data);
    data
      .then((response) => {
        console.log(">>>", response);
        if (response.error) {
          res.status(403).json({ error: response.error });
        } else {
          res.json({ item: response });
        }
      })
      .catch((error) => {
        console.log("---", error);
        res.json({ error });
      });
  } else {
    res.json({
      message: "provide product url from amazon in your request body",
    });
  }
});

module.exports = getItemRouter;
