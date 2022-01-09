import { TicketUpdatedListener } from '../ticket-updated-listener'
import { natsWrapper } from '../../../nats-wrapper'
import { TicketUpdatedEvent } from '@dallasstudio/common'
import mongoose from 'mongoose'
import { Message } from 'node-nats-streaming'
import { Ticket } from '../../../models/ticket'

const setup = async () => {
	const listener = new TicketUpdatedListener(natsWrapper.client)
	const ticket = Ticket.build({
		id: new mongoose.Types.ObjectId().toHexString(),
		title: 'concert',
		price: 20
	})
	await ticket.save()
	const data: TicketUpdatedEvent['data'] = {
		version: ticket.version + 1,
		id: ticket.id,
		title: 'party',
		price: 50,
		userId: new mongoose.Types.ObjectId().toHexString(),
	}
	// @ts-ignore
	const msg: Message = {
		ack: jest.fn()
	}
	return { data, listener, ticket, msg}
}

it('find, update, save a ticket', async () => {
	const { data, listener, ticket, msg} = await setup()
	await listener.onMessage(data, msg)
	const updatedTicket = await Ticket.findById(ticket.id)

	expect(updatedTicket!.title).toEqual(data.title)
	expect(updatedTicket!.price).toEqual(data.price)
	expect(updatedTicket!.version).toEqual(data.version)
})

it('ack the message', async () => {
	const { data, listener, msg} = await setup()
	await listener.onMessage(data, msg)
	expect(msg.ack).toHaveBeenCalled()
})