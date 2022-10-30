import dotenv from "dotenv";
import { TwitterClient } from "twitter-api-client";

dotenv.config();


const client = new TwitterClient({
  apiKey: process.env.CONSUMER_API_KEY,
  apiSecret: process.env.CONSUMER_API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
});

async function updateBanner() {
	// update the quote to the image
	// upload the new image 
	// update the banner
}

updateBanner();
