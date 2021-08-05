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

    $(elementSelector).each((parentIndex, parentElement) => {
      //Get the top 10
      if (parentIndex <= 9) {
        $(parentElement)
          .children()
          .each((childIndex, childElement) => {
            console.log($(childElement).text());
          });
      }
    });
  } catch (err) {
    console.error(err);
  }
}

getPriceFeed();
