import request from 'supertest'
import { app } from '../../app';
import { Ticket } from '../../models/ticket'
import { natsWrapper } from '../../nats-wrapper'
import mongoose from 'mongoose'

it('has route handler listening to /api/tickets for post request', async () => {
	const response = await request(app)
		.post('/api/tickets')
		.send({})
	expect(response.status).not.toEqual(404)
})

it('can only be access if user sign in', async () => {
	const response = await request(app)
		.post('/api/tickets')
		.send({})
		.expect(401)
})

it('return a status other than 401 if the user is signed in', async () => {
	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({})

	expect(response.status).not.toEqual(401)
})

it('return error if invalid title is provided', async () => {
	await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({
			title: '',
			price: 10,
			directionId: '',
			userId: 'string',
			count: 12,
			month: 1,
			year: 2021,
		})
		.expect(400)

	await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({
			price: 10
		})
		.expect(400)
})

it('return error if invalid price is provided', async () => {
	await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({
			title: 'dadad',
			price: -10
		})
		.expect(400)
		
	await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({
			title: 'dadad',

		})
		.expect(400)
})

it('create tickets with valid inputs', async () => {
		let tickets = await Ticket.find({})
		expect(tickets.length).toEqual(0)

		const title = 'sdcsdf'

		await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({
			title,
			price: 10,
			directionId: new mongoose.Types.ObjectId().toHexString(),
			count: 8,
			month: 2,
			year: 2022,
			userId: new mongoose.Types.ObjectId().toHexString(),
		})
		.expect(201)

		tickets = await Ticket.find({})
		expect(tickets.length).toEqual(1)
		expect(tickets[0].price).toEqual(10)
		expect(tickets[0].title).toEqual(title)
})

it('publish new ticket', async () => {
	const title = 'sdcsdf'

	await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({
			title,
			price: 10,
			directionId: new mongoose.Types.ObjectId().toHexString(),
			count: 8,
			month: 2,
			year: 2022,
			userId: new mongoose.Types.ObjectId().toHexString(),
		})
		.expect(201)

	expect(natsWrapper.client.publish).toHaveBeenCalled()
})