const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

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
            const cryptoInfo = $(childElement).text();

            //Store crypto Information inside the array
            if (cryptoInfo) {
              coinObject[keys[keyIndex]] = cryptoInfo;

              keyIndex++;
            }
          });
        console.log(coinObject);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

getPriceFeed();
