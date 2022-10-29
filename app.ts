import {Client} from 'twitter-api-sdk'
import dotenv from 'dotenv'

dotenv.config()

const client = new Client(process.env.BEARER_TOKEN);

const main = async () => {
	const tweet = await client.tweets.findTweetById("1585523669630976002");
	console.log(tweet.data);
}

main()

