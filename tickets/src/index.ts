import mongoose from "mongoose"
import { app } from './app'
import { natsWrapper } from './nats-wrapper'

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY undefined')
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI undefined')
    }
    try {
        await natsWrapper.connect('ticketing', 'random', 'http://nats-srv:4222')
        console.log('Connected to NATS')
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!')
            process.exit()
        })
        process.on('SIGINT', () => natsWrapper.client.close())
        process.on('SIGTERM', () => natsWrapper.client.close())
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDb');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!');
    });
};

start();