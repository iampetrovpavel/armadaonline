import express , {Request, Response} from 'express'
import { requireAuth, ValidateRequest, NotFoundError, BadRequestError } from '@dallasstudio/common'
import { body } from 'express-validator'
import mongoose from 'mongoose'
import { Trial } from '../models/trial'

const router = express.Router()


router.post('/api/orders/trial', [
		body('name')
			.not()
			.isEmpty()
			.withMessage('Name must be providet'),
        body('phone')
			.not()
			.isEmpty()
			.withMessage('Phone must be providet'),    
	],
	ValidateRequest,
	async (req: Request, res: Response) => {
		const { name , phone } = req.body
		console.log(name, phone)
		const trial = Trial.build({
            name, phone
		})
		await trial.save()

		return res.status(201).send(trial)
	}
)

router.get('/api/orders/trial', requireAuth,
async (req: Request, res: Response) => {
    const {skip = 0} = req.query
    const trials = await Trial.find({}).sort({createdAt: -1}).limit(40).skip(+skip)

    return res.status(200).send(trials)
}
)

export {router as trialRouter}