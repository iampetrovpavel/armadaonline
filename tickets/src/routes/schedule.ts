import { isAdmin, requireAuth, ValidateRequest } from '@dallasstudio/common'
import express , { Request, Response } from 'express'
import { param, body } from 'express-validator'
import { Schedule } from '../models/schedule'

const router = express.Router()

router.get('/api/schedule', 
    // [param('directionId').isMongoId().withMessage('Direction Id must be valid')],
    // ValidateRequest,
    async (req: Request, res: Response) => {
        // const { directionId } = req.params;
        const schedule = await Schedule.find({})
        return res.send(schedule)
    }
)

router.get('/api/schedule/:directionId', 
    [param('directionId').isMongoId().withMessage('Direction Id must be valid')],
    ValidateRequest,
    async (req: Request, res: Response) => {
        const { directionId } = req.params;
        const schedule = await Schedule.find({directionId})
        return res.send(schedule)
    }
)

router.post('/api/schedule', requireAuth, isAdmin, [
        body('day').isInt({min: 0, max: 6}).withMessage('Day must be valid'),
        body('hour').isInt({min: 0, max: 24}).withMessage('Hour must be valid'),
        body('minutes').isInt({min: 0, max: 60}).withMessage('Minutes must be valid'),
        body('directionId').isMongoId().withMessage('Direction Id must be valid'),
    ], ValidateRequest, 
    async (req: Request, res: Response) => {
        const {day, hour, minutes, directionId} = req.body;
        const schedule = await Schedule.build({
            day, hour, minutes, directionId
        })
        await schedule.save()
        return res.send(schedule)
})

router.delete('/api/schedule/:scheduleId', requireAuth, isAdmin, [
    param('scheduleId').isMongoId().withMessage('Schedule Id must be valid'),
], ValidateRequest, 
async (req: Request, res: Response) => {
    const {scheduleId} = req.params;
    await Schedule.findByIdAndDelete(scheduleId)
    return res.send({})
})

export {router as scheduleRouter}