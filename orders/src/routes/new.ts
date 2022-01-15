import express , {Request, Response} from 'express'
import { requireAuth, ValidateRequest, NotFoundError, BadRequestError } from '@dallasstudio/common'
import { body } from 'express-validator'
import mongoose from 'mongoose'
import { Ticket } from '../models/ticket'
import { Order } from '../models/order'
import { OrderStatus } from '@dallasstudio/common'
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher'
import { natsWrapper } from '../nats-wrapper'
import { ukassa } from '../ukassa'

const router = express.Router()

const EXPIRATION_WINDOW_SECONDS = 60

router.post('/api/orders', requireAuth, [
		body('ticketId')
			.not()
			.isEmpty()
			.custom((input: string) => mongoose.Types.ObjectId.isValid(input))
			.withMessage('TicketId must be providet')
	],
	ValidateRequest,
	async (req: Request, res: Response) => {
		const { ticketId } = req.body
		const ticket = await Ticket.findById(ticketId)
		if(!ticket) {
			throw new NotFoundError()
		}
		const isReserved = await ticket.isReserved()
		if (isReserved){
			throw new BadRequestError('Ticket is already reserved')
		}
		const expiration = new Date()
		expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)
		
	    // const idempotenceKey = (new Date().getTime() * (Math.random() * 10000)).toString()

		// const payment = await ukassa.pay(idempotenceKey, "2.00")
	    // console.log("CHARGE ", payment)

	    // if(!payment || !payment.confirmation || !payment.confirmation.confirmation_url){
	    //   throw new BadRequestError('Ukassa confirmation error!');
	    // }

		const order = Order.build({
			userId: req.currentUser!.id,
			status: OrderStatus.Created,
			expiresAt: expiration,
			ticket,
			// payment: {
			// 	id: payment.id,
			// 	confirmation_url: payment.confirmation.confirmation_url,
			// 	status: payment.status
			// }
		})
		await order.save()

		new OrderCreatedPublisher(natsWrapper.client).publish({
			id: order.id,
			version: order.version,
			status: order.status,
			userId: order.userId,
			expiresAt: order.expiresAt.toISOString(),
			ticket: {
				id: ticket.id,
				price: ticket.price
			}
		})

		return res.status(201).send(order)
	}
)

export {router as newOrderRouter}