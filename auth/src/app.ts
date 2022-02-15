import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import {currentUserRouter} from "./routes/current-user";
import {signoutRouter} from "./routes/signout";
import {signupRouter} from "./routes/signup";
import {signinRouter} from "./routes/signin";
import {errorHandler, NotFoundError} from "@dallasstudio/common";
import cookieSession from 'cookie-session'
import { usersRouter } from './routes/users';

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test'
}))

app.use((req, res, next)=>{
    console.log("SESSION: ", req.session?.jwt)
    next()
})

app.use(currentUserRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(signinRouter)

app.use(usersRouter)

app.all('*', (req, res)=>{
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }