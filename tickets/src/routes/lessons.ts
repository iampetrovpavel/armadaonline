import { isAdmin, requireAuth, ValidateRequest, BadRequestError } from '@dallasstudio/common'
import express , { Request, Response } from 'express'
import { body, param } from 'express-validator'
import { Lesson } from '../models/lesson'

const router = express.Router()

router.get('/api/lessons', async (req: Request, res: Response) => {
    let filter = req.query || {}
    if(filter.date) {
        const test = filter.date as string
        filter.date = JSON.parse(test)
    }
    // console.log("FILTER ", filter)
	const lessons = await Lesson.find(filter)
	return res.send(lessons)
})

router.get('/api/lessons/:lessonId', 
    [param('lessonId').isMongoId().withMessage('lesson Id must be valid')],
    ValidateRequest,
    async (req: Request, res: Response) => {
        const { lessonId } = req.params;
        const lesson = await Lesson.findById(lessonId)
        return res.send(lesson)
    }
)

router.post('/api/lessons', requireAuth, isAdmin, [
        body('date').not().isEmpty().withMessage('date must be valid'),
        body('directionId').isMongoId().withMessage('Direction Id must be valid'),
        body('teacherId').isMongoId().withMessage('Teacher Id must be valid'),
    ], ValidateRequest, 
    async (req: Request, res: Response) => {
        const {directionId, date, teacherId, studentsId} = req.body;
        const lesson = await Lesson.build({
            directionId,
            date,
            teacherId,
        })
        await lesson.save()
        return res.send(lesson)
    }
)

router.put('/api/lessons', requireAuth, isAdmin,
    [
        body('lessonId').isMongoId().withMessage('Lesson Id must be defined.'),
        body('update').isArray().withMessage('Update must be defined.'),
    ], async (req: Request, res: Response)=>{
    const lesson = await Lesson.findById(req.body.lessonId)
    if(!lesson) throw new BadRequestError('Lesson not exist.')
    req.body.update.map((item:{field:string, value: string, action: string})=>{
        if(item.field === 'studentsId'){
            if(item.action === 'add'){
                if(lesson[item.field].indexOf(item.value)<0){
                    lesson[item.field].push(item.value)
                }
            }
            if(item.action === 'remove'){
                if(lesson[item.field].indexOf(item.value)>=0){
                    lesson[item.field].splice(lesson[item.field].indexOf(item.value), 1)
                }
            }
        }
    })
    await lesson.save()
    res.send(lesson)
})

export {router as lessonsRouter}