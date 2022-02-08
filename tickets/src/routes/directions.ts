import { isAdmin, requireAuth, ValidateRequest } from '@dallasstudio/common'
import express , { Request, Response } from 'express'
import { body, param } from 'express-validator'
import { Direction } from '../models/direction'

const router = express.Router()

router.get('/api/directions', async (req: Request, res: Response) => {
	const directions = await Direction.find({})
	return res.send(directions)
})

router.get('/api/directions/:directionId', 
    [param('directionId').isMongoId().withMessage('Direction Id must be valid')],
    ValidateRequest,
    async (req: Request, res: Response) => {
        const { directionId } = req.params;
        const direction = await Direction.findById(directionId)
        return res.send(direction)
    }
)

router.post('/api/directions', requireAuth, isAdmin, [
        body('name').not().isEmpty().withMessage('Name must be valid'),
        body('description').not().isEmpty().withMessage('Description must be valid'),
        body('teacherId').isMongoId().withMessage('Teacher Id must be valid'),
    ], ValidateRequest, 
    async (req: Request, res: Response) => {
        const {name, description, teacherId, img = '/images/default.jpg'} = req.body;
        const direction = await Direction.build({
            name,
            description,
            teacherId,
            img
        })
        await direction.save()
        return res.send(direction)
})

export {router as directionsRouter}