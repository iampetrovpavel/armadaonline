import { OrderCreatedListener } from '../order-created-listener'
import { natsWrapper } from '../../../nats-wrapper'
import { Ticket } from '../../../models/ticket'
import mongoose from 'mongoose'
import { OrderCreatedEvent, OrderStatus } from '@dallasstudio/common'
import { Message } from 'node-nats-streaming'

const setup = async () => {
	const listener = new OrderCreatedListener(natsWrapper.client)
	const ticket = Ticket.build({
		title: 'string',
		price: 10,
		directionId: new mongoose.Types.ObjectId().toHexString(),
		count: 8,
		month: 2,
		year: 2022,
		userId: new mongoose.Types.ObjectId().toHexString()
	})
	await ticket.save()
	const data: OrderCreatedEvent['data'] = {
		id: new mongoose.Types.ObjectId().toHexString(),
		version: 0,
		status: OrderStatus.Created,
		userId: new mongoose.Types.ObjectId().toHexString(),
		expiresAt: 'yuyiyui',
		ticket: {
			id: ticket.id,
			price: ticket.price
		}
	}
	// @ts-ignore
	const msg: Message = {
		ack: jest.fn()
	}

	return {listener, ticket, data, msg}
}

it('sets the orderId to the ticket', async () => {
	const {listener, ticket, data, msg} = await setup()
	await listener.onMessage(data, msg)
	const updatedTicket = await Ticket.findById(ticket.id)
	expect(updatedTicket!.orderId).toEqual(data.id)
})

it('ack the message', async () => {
	const {listener, ticket, data, msg} = await setup()
	await listener.onMessage(data, msg)
	expect(msg.ack).toHaveBeenCalled()
})

it('publish a ticket updated event', async () => {
	const {listener, ticket, data, msg} = await setup()
	await listener.onMessage(data, msg)
	expect(natsWrapper.client.publish).toHaveBeenCalled()
	const ticketUpatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1])
	expect(data.id).toEqual(ticketUpatedData.orderId)
})