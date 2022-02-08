import { Message } from 'node-nats-streaming';
import { Listener, OrderCompliteEvent, Subjects } from '@dallasstudio/common';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher'


export class OrderCompliteListener extends Listener<OrderCompliteEvent> {
  subject: Subjects.OrderComplite = Subjects.OrderComplite;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCompliteEvent['data'], msg: Message) {
    console.log("DATA ", data)
    const ticket = await Ticket.findById(data.ticketId)
    if(!ticket){
      throw new Error('Ticket not found')
    }
    ticket.users.push(data.userId)
    await ticket.save()
    const {id, version, price, orderId, title, userId} = ticket
    await new TicketUpdatedPublisher(this.client).publish({
      id, version, price, orderId, title, userId
    })
    msg.ack()
  }
}
