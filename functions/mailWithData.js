const nodemailer = require("nodemailer");
require("dotenv").config();
const mailBody = require("./mailBody");
const subscribedMailBody = require("./subscribedMailBody");

const appPass = process.env.GMAIL_PASSWORD;

function mailWithData(event, data, email) {
  let mailContent;
  let mailSubject;
  let mailTo = email;

  if (event === "reached") {
    mailContent = mailBody(
      data.title,
      data.imageUrl,
      data.currentPrice,
      data.productUrl
    );
    mailSubject = "Price Update: Amazon Price Tracker";
  }
  if (event === "subscribed") {
    mailContent = subscribedMailBody(
      data.product,
      data.imageUrl,
      data.price,
      data.priceSelected,
      data.productUrl
    );
    mailSubject = "Successfully Subscribed: Amazon Price Tracker";
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "parash@sirpi.io",
      pass: appPass,
    },
  });

  const sendMail = async () => {
    let info = await transporter.sendMail({
      from: "parash@sirpi.io",
      to: mailTo,
      subject: mailSubject,
      html: mailContent,
    });

    if (info.messageId) {
      console.log("Mail sent, id: ", info.messageId);
    }
  };

  sendMail().catch((error) => {
    console.log(
      "------------------------Failed to send mail----------------------------"
    );
    console.log(error);
  });
}

module.exports = mailWithData;
