import {
  Subjects,
  Listener,
  PaymentCompleteEvent,
  OrderStatus,
} from '@dallasstudio/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';
import {OrderComplitePublisher} from '../publishers/order-complite-publisher'

export class PaymentCompleteListener extends Listener<PaymentCompleteEvent> {
  subject: Subjects.PaymentComplete = Subjects.PaymentComplete;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCompleteEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    console.log("ORDER ", order?.toObject())

    if (!order) {
      throw new Error('Order not found');
    }

    if(order.status === OrderStatus.Cancelled || order.status === OrderStatus.Complete) {
      return msg.ack();
    }

    order.set({
      status: OrderStatus.Complete,
    });
    await order.save();

    await  new OrderComplitePublisher(this.client).publish({
      id: order.id,
      ticketId: order.ticket._id,
      userId: order.userId
  })
    msg.ack();
  }
}
