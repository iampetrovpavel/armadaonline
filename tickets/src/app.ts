import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import {errorHandler, NotFoundError, currentUser} from "@dallasstudio/common";
import cookieSession from 'cookie-session'
import { createTicketRouter } from './routes/new'
import {showTicketRouter} from './routes/show'
import {indexTicketRouter} from './routes/index'
import {updateTicketRouter} from './routes/update'
import { directionsRouter } from './routes/directions';
import { scheduleRouter } from './routes/schedule';
import { lessonsRouter } from './routes/lessons';


const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))

app.use(currentUser)

app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(indexTicketRouter)
app.use(updateTicketRouter)

app.use(directionsRouter)
app.use(scheduleRouter)
app.use(lessonsRouter)

app.all('*', (req, res)=>{
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }