import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.ATLAS_URI;
const options = {};

export const client = new MongoClient(uri, options);
export async function connect() {
    try {
        await client.connect();
        console.log("Mongo Connected Successfully");
    }
    catch(err) {
        console.log("Could not connect");
        console.error(err);

    }
}