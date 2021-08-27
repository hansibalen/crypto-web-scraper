# Crypto Web Scraper

A web scraper, which scrapes cryptocurrency data.\
[Live site](https://crypto-web-scraper.herokuapp.com/)

## Description

I created a web scraper, which scrapes cryptocurrency data from the [CoinMarketCap](https://coinmarketcap.com/) website.\
By using [Axios](https://axios-http.com/docs/intro), I defined which site was going to be scraped and how it would get scraped.\
I looked the source code to find a pattern about the information displayed.\
Information was stored in table-data tags. So, by using the Dev-Tools, I copy the selector of that element.

![Crypto data tag info](https://i.ibb.co/t3P7QmC/img3.png)

After I copied the selector, I created a variable to store it. The selector code:

```
const elementSelector = #__next > div.bywovg-1.sXmSU > div.main-content > div.sc-57oli2-0.comDep.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr:nth-child(1)
```

But, this line of code only gave back the information about the first row. That was easily fixed by removing this part:

```
:nth-child(1)
```

Then, I used [Cheerio](https://cheerio.js.org/) to target the table-data element which was going to be used to retreive back the data.\
Right after, I created an array to store the crypto details, an object which would be populated by said crypto\
details, and an array of objects, which would display the details for only the first 10 entries.\
Finally, I initialized an [Express](https://expressjs.com/) server to output the data.

![Initial output](https://i.ibb.co/LgFXM8r/img1.png)

Although console logging the data would return a readable JSON of the crypto information, as you can see, that's not the case on the express server.\
Needless to say that not everyone has a JSON Formatter extension, so I had to make the output readable.\
All I needed to do was to add this line inside the express server:

```
    app.set("json spaces", 2);
```

As you can, a much better data output.

![Final output](https://i.ibb.co/whMJFJ7/img2.png)

## Note regarding the elementSelector

I would like to note that websites, such as [CoinMarketCap](https://coinmarketcap.com/) might be prone to change, thus, resulting in the web scraper not working (the array will show up empty in the final output).\
To fix that, just copy again the new selector and replace it on the source code, and it should be working again.

## Installation

- Download / fork the project.

- Install dependencies:

```
npm install
```

- Initialize project.

```
npm run dev
```
