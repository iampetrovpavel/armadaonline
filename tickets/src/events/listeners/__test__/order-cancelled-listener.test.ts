import { OrderCancelledListener } from '../order-cancelled-listener'
import { natsWrapper } from '../../../nats-wrapper'
import { Ticket } from '../../../models/ticket'
import mongoose from 'mongoose'
import { OrderCancelledEvent, OrderStatus } from '@dallasstudio/common'

const setup = async () => {
	const listener = new OrderCancelledListener(natsWrapper.client)
	const ticket = Ticket.build({
		title: 'string',
		price: 10,
		userId: new mongoose.Types.ObjectId().toHexString()
	})
	const orderId = new mongoose.Types.ObjectId().toHexString()
	ticket.set({orderId})
	await ticket.save()
	const data: OrderCancelledEvent['data'] = {
		id: new mongoose.Types.ObjectId().toHexString(),
		version: 0,
		ticket: {
			id: ticket.id,
		}
	}
	// @ts-ignore
	const msg: Message = {
		ack: jest.fn()
	}

	return {listener, ticket, data, msg, orderId}
}

it('updates the ticket, publish event', async () => {
	const {listener, ticket, data, msg, orderId} = await setup()
	await listener.onMessage(data, msg)

	const updatedTicket = await Ticket.findById(ticket.id)
	expect(updatedTicket!.orderId).not.toBeDefined()
})

it('ack the message', async () => {
	const {listener, ticket, data, msg} = await setup()
	await listener.onMessage(data, msg)
	expect(msg.ack).toHaveBeenCalled()
	expect(natsWrapper.client.publish).toHaveBeenCalled()
})