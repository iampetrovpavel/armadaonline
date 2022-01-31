import express, {Request, Response} from "express"
import  {body} from 'express-validator'
import jwt from 'jsonwebtoken'
import {User, UserAttrs} from '../models/user'
import {BadRequestError, ValidateRequest} from "@dallasstudio/common";

const router = express.Router();

router.post('/api/users/signup',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().isLength({min:4, max: 20})
        .withMessage('Password must be between 4 and 20 characters'),
        body('name').isLength({min:2, max: 50}).withMessage('Name must be valid')
    ],
    ValidateRequest,
    async (req: Request, res: Response)=>{
        const { name, email, password, admin } = req.body

        const existingUser = await User.findOne({email})
        if(existingUser){
            throw new BadRequestError('Email in use')
        }

        const userAttrs:UserAttrs = {name, email, password}

        if(admin){
            const countUsers = await User.countDocuments({})
            if(countUsers === 0) {userAttrs.admin = admin}
        }

        const user = User.build(userAttrs)
        await user.save()

        const userJwt = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name
        }, process.env.JWT_KEY!)

        req.session = {
            jwt: userJwt
        }


        return res.status(201).send(user)
    }
)

export {router as signupRouter}