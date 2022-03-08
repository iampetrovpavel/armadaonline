import express , {Request, Response} from "express";
import  {body} from 'express-validator'
import {BadRequestError, currentUser, isAdmin, requireAuth} from '@dallasstudio/common'
import {User} from '../models/user'
const router = express.Router();
import mongoose from 'mongoose'


router.get('/api/users', currentUser, requireAuth, isAdmin, async (req, res)=>{
    let filter = req.query || {}
    const users = await User.find(filter)
    res.send(users)
})

router.get('/api/users/teachers', async (req, res)=>{
    const teachers = await User.find({groups: 'teacher'})
    res.send(teachers)
})

router.put('/api/users', currentUser, requireAuth, isAdmin,
    [
        body('userId').custom(value=>mongoose.isValidObjectId(value)).withMessage('User Id must be defined.'),
        body('update').isArray().withMessage('Update must be defined.'),
    ], async (req: Request, res: Response)=>{
    const user = await User.findById(req.body.userId)
    if(!user) throw new BadRequestError('User not exist.')
    req.body.update.map((item:{field:string, value: string, action: string})=>{
        if(item.field === 'groups'){
            if(item.action === 'add'){
                if(user.groups.indexOf(item.value)<0){
                    user.groups.push(item.value)
                }
            }
            if(item.action === 'remove'){
                if(user.groups.indexOf(item.value)>=0){
                    user.groups.splice(user.groups.indexOf(item.value), 1)
                }
            }
        }
    })
    await user.save()
    res.send(user)
})

export {router as usersRouter}