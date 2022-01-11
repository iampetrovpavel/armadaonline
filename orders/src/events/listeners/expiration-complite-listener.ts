import { Listener, Subjects, ExpirationCompliteEvent, OrderStatus } from '@dallasstudio/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';
import { Order } from '../../models/order';

export class ExpirationCompliteListener extends Listener<ExpirationCompliteEvent> {
    readonly subject = Subjects.ExpirationComplite;
    queueGroupName = queueGroupName
    async onMessage(data: ExpirationCompliteEvent['data'], msg: Message): Promise<void> {
        const order = await Order.findById(data.orderId).populate('ticket')
        if(!order){
            throw new Error('Order not found!')
        }
        order.set({
            status: OrderStatus.Cancelled,
        })
        await order.save()
        await  new OrderCancelledPublisher(this.client).publish({
            id: order.id,
            version: order.version,
            ticket: {id: order.ticket.id}
        })
        msg.ack()
    }
}