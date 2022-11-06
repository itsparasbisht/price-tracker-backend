function mailBody(title, imageUrl, price, priceSelected, productUrl) {
  return `<body>
  <div>
      <h2 style="width: 100%; text-align: center; padding: 5px; font-size: 1.7rem; background-color: black; color:
          white;">Amazon Price Tracker</h2>
      <img style=" width: 300px; height: auto; display: block; margin: 0px auto"
          src=${imageUrl} alt="">
      <h1 style="padding: 20px;">${title}
      </h1>
      <h3 style="font-size: 1.3rem; width: fit-content; margin-left: 20px;">
          "You are now subscribed to price-tracking, we will notify you whenever the price drops to Rs. ${priceSelected}"
          <br>
          Current price - Rs. ${price}
      </h3>
      <button
          style="font-size: 1rem; border: none; border-radius: 10px; padding: 7px 10px; cursor: pointer; background-color: #000000; outline: none; transition: all 0.3s; margin-top: 15px; margin-left: 20px; margin-bottom: 40px; border: 2px solid #F3A847"><a
              style="color: #ffffff; text-decoration: none; font-weight: 600;"
              href=${productUrl} target="_blank">Product
              Link</a></button>
  </div>
</body>`;
}

module.exports = mailBody;
