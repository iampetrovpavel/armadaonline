import express , {Request, Response} from 'express'
import {Ticket} from '../models/ticket'

const router = express.Router()

router.get('/api/tickets', async (req: Request, res: Response) => {
    let filter = req.query || {}
	const tickets = await Ticket.find(filter)
	return res.send(tickets)
})

export {router as indexTicketRouter}