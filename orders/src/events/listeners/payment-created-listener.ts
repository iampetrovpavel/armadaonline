import {
  Subjects,
  Listener,
  PaymentCreatedEvent,
  OrderStatus,
} from '@dallasstudio/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    if(order.status === OrderStatus.Cancelled || order.status === OrderStatus.Complete) {
      throw new Error('Order has been cancelled or complited');
    }

    order.set({
      status: OrderStatus.AwaitingPayment,
    });

    await order.save();
    msg.ack();
  }
}
