const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

//Set up express server
const app = express();

app.get("/", async (req, res) => {
  try {
    const priceFeed = await getPriceFeed();
    //Format data into vertical JSON
    app.set("json spaces", 2);
    return res.status(200).json({
      result: priceFeed,
    });
  } catch (err) {
    return res.status(500).json({
      err: err.toString(),
    });
  }
});

app.listen(process.env.PORT || 3000);

//Function which returns crypto price feed
async function getPriceFeed() {
  try {
    //Define site which will be scraped
    const siteUrl = "https://coinmarketcap.com/";

    const { data } = await axios({
      method: "GET",
      url: siteUrl,
    });

    //Initialize Cheerio, target site elements
    const $ = cheerio.load(data);
    const elementSelector =
      "#__next > div > div.main-content > div.sc-57oli2-0.dEqHl.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr";

    //Create array for storing crypto information
    const keys = [
      "rank",
      "name",
      "price",
      "24hourChange",
      "7dChange",
      "marketCap",
      "volume",
      "circulatingSupply",
    ];

    //Set up array to collect all information
    const coinArray = [];

    $(elementSelector).each((parentIndex, parentElement) => {
      let keyIndex = 0;

      //Create object which will populate the array
      const coinObject = {};

      //Get the top 10
      if (parentIndex <= 9) {
        $(parentElement)
          .children()
          .each((childIndex, childElement) => {
            //Set up crypto info const
            //Change from const to let to redefine it on the if statement below
            let cryptoInfo = $(childElement).text();

            //Clean off the crypto infomartion text format by targetting the first paragraph tag
            if (keyIndex === 1 || keyIndex === 6) {
              cryptoInfo = $("p:first-child", $(childElement).html()).text();
            }

            //Store crypto Information inside the array
            if (cryptoInfo) {
              coinObject[keys[keyIndex]] = cryptoInfo;
              keyIndex++;
            }
          });

        coinArray.push(coinObject);
      }
    });
    return coinArray;
  } catch (err) {
    console.error(err);
  }
}
