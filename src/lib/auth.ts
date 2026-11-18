
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGO_DB_URI as string);
const db = client.db('PizzaHub-DataBase');

export const auth = betterAuth({
  emailAndPassword: { 
    enabled: true, 
  },
  user: {
       additionalFields: {
          role: {
              type:['customer','vendor','admin'],
              input: true,
              defaultValue:'customer',
            } 
        }
    },
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
  database: mongodbAdapter(db, {
    client,
  }),
});