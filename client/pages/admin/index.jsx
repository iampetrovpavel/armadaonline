const { useState, useEffect } = require("react")
import useRequest from '../../hooks/use-request'
import Router from "next/router";

const AdminMain = ({initTickets}) => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [tickets, setTickets] = useState(initTickets)
    const {doRequest, errors} = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {title, price},
        onSuccess: (ticket) => {
            console.log("DEBUG", ticket)
            setTickets([...tickets, ticket])
        }
    })
    return (
        <div>
            <span>Title</span>
            <input value={title} onChange={(e)=>setTitle(e.target.value)}></input>
            <span>Price</span>
            <input value={price} onChange={(e)=>setPrice(e.target.value)}></input>
            <button onClick={doRequest}>Create Ticket</button>
            <hr/>
            {errors}
            <ul>
                {tickets.map(ticket=>(
                    <li key={ticket.id}>
                        {ticket.title} | {ticket.price}руб
                    </li>
                ))}
            </ul>
        </div>
    )
}

AdminMain.getInitialProps = async (ctx, client)=>{
    const res = await client.get('/api/tickets')
    return {initTickets: res.data}
}

export default AdminMain