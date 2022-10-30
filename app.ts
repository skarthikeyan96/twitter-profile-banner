import dotenv from "dotenv";
import { TwitterClient } from "twitter-api-client";
import fs from "fs";
import sharp from "sharp";

dotenv.config();

const client = new TwitterClient({
  apiKey: process.env.CONSUMER_API_KEY,
  apiSecret: process.env.CONSUMER_API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
});

const  getRandomInt = (max)  => {
	return Math.floor(Math.random() * max);
}

const fetchRandomQuote = () => {
	const quotes = JSON.parse(fs.readFileSync('quotes.json',{
		encoding: "utf-8"
	}))
	const randomQuote = quotes[getRandomInt(quotes.length)].text
	return randomQuote.length <= 70 ? randomQuote : "You carry the passport to your own happiness."
}


async function addTextOnImage() {
	try {
	  const width = 1500;
	  const height = 500;

	  const svgImage = `
	  <svg width="${width}" height="${height}">
		<style>
		.title { fill: #fff; font-size: 28px; font-weight: bold; font-family: 'Noto Sans'; padding: 10px; width: calc(50% - 100px);
		height: calc(50% - 10px);}
		</style>
		<text  x="50%" y="50%" text-anchor="middle" class="title">
		<tspan> 
		“${fetchRandomQuote()}”
		</tspan>
		</text>
	  </svg>
	  `;
	  const svgBuffer = Buffer.from(svgImage);
	  await sharp("assets/twitter-header-no-quote.png")
		.composite([
		  {
			input: svgBuffer,
			top: 220,
			left: 0
		  },
		])
		.toFile("twitter-header-quote.png");
	} catch (error) {
	  console.log(error);
	}
  }

const updateBanner = async () => {
    try {
		
	  await addTextOnImage()
      // convert the image to base64
      const base64Banner = fs.readFileSync("twitter-header-quote.png", {
        encoding: "base64",
      });

      // update the banner

      await client.accountsAndUsers.accountUpdateProfileBanner({
        banner: base64Banner,
      });

      console.log("update success")

	  fs.unlinkSync('twitter-header-quote.png')
    } catch (error) {
      console.error(error);
    }
};

updateBanner();
