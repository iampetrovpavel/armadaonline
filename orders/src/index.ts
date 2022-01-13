import mongoose from "mongoose"
import { app } from './app'
import { natsWrapper } from './nats-wrapper'
import { TicketCreatedListener } from './events/listeners/ticket-created-listener';
import { TicketUpdatedListener } from './events/listeners/ticket-updated-listener';
import { ExpirationCompliteListener } from "./events/listeners/expiration-complite-listener";
import { PaymentCreatedListener } from "./events/listeners/payment-created-listener";

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY undefined')
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI undefined')
    }
    if(!process.env.NATS_CLIENT_ID){
        throw new Error('NATS_CLIENT_ID undefined')
    }
        if(!process.env.NATS_URL){
        throw new Error('NATS_URL undefined')
    }
        if(!process.env.NATS_CLUSTER_ID){
        throw new Error('NATS_CLUSTER_ID undefined')
    }
    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID, 
            process.env.NATS_CLIENT_ID, 
            process.env.NATS_URL
        )
        console.log('Connected to NATS')
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!')
            process.exit()
        })
        process.on('SIGINT', () => natsWrapper.client.close())
        process.on('SIGTERM', () => natsWrapper.client.close())

        new TicketCreatedListener(natsWrapper.client).listen()
        new TicketUpdatedListener(natsWrapper.client).listen()
        new ExpirationCompliteListener(natsWrapper.client).listen()
        new PaymentCreatedListener(natsWrapper.client).listen()

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