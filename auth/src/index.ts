import mongoose from "mongoose"
import { app } from './app'

const start = async () => {
    console.log("Starting...")
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY undefined')
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI undefined')
    }
    try {
        const mongo_link = process.env.MONGO_URI+process.env.MONGO_DB
        await mongoose.connect(mongo_link);
        console.log('Connected to MongoDb');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!');
    });
};

start();