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
        await mongoose.connect(process.env.MONGO_URI+process.env.MONGO_DB);
        console.log('Connected to MongoDb');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!');
    });
};

start();