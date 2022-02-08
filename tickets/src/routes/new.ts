import express , {NextFunction, Request, Response} from 'express'
import { body } from 'express-validator'
import { isAdmin, requireAuth, ValidateRequest } from '@dallasstudio/common'
import { Ticket} from '../models/ticket'
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router();

router.post('/api/tickets', requireAuth, (req:Request, res:Response, next:NextFunction)=>{console.log(req.currentUser); next()}, isAdmin, [
	body('title').not().isEmpty().withMessage('Title is required'),
	body('directionId').isMongoId().withMessage('Direction must be valid'),
	body('price').isFloat({ gt: 0 })
		.withMessage('Price must be greater than 0'),
	body('count').isInt({gt:0, lt: 10})
		.withMessage('Count must be valid'),
	body('month').isInt({gt:0, lt: 11})
		.withMessage('Month must be valid'),
	body('year').isInt({gt:2021})
		.withMessage('Year must be valid'),
], 
ValidateRequest,
async (req: Request, res: Response) => {
	const { title, directionId, price, count, month, year } = req.body
	const ticket = Ticket.build({
		title, directionId ,price, 
		userId: req.currentUser!.id,
		count,
		month,
		year
	})
	await ticket.save()
	new TicketCreatedPublisher(natsWrapper.client).publish({
		id: ticket.id,
		version: ticket.version,
		title: ticket.title,
		price: ticket.price,
		userId: ticket.userId
	})

	res.status(201).send(ticket)
})

export { router as createTicketRouter }