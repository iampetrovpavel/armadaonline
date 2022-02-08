import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'

const createTicket = async () => {
	await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({
			title: 'asdasd',
			price: 20,
			directionId: new mongoose.Types.ObjectId().toHexString(),
			count: 8,
			month: 2,
			year: 2022,
			userId: new mongoose.Types.ObjectId().toHexString(),
		})
}

it('can fetch a list of tickets', async () => {
	await createTicket()
	await createTicket()
	await createTicket()

	const response = await request(app)
		.get('/api/tickets')
		.send()
		.expect(200)

	expect(response.body.length).toEqual(3)
})