import express from 'express'
import {User} from './types/user'

const app = express();
const port = 4001;

const users:[User] = [
    {name:'Paul'}
]

app.get('/users', (request, response) => {
    console.log("TEST")
    response.send('Hello Everybody!');
});
app.listen(port, () => console.log(`Running on port ${port}`));