import express , {Request, Response} from 'express'
import { requireAuth } from '@dallasstudio/common'
import { Order } from '../models/order';

const router = express.Router()

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
	const orders = await Order.find({
		userId: req.currentUser!.id
	}).sort({date: -1}).populate('ticket')

	return res.send(orders)
})

export {router as indexOrderRouter}
