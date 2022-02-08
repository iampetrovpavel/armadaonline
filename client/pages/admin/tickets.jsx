const { useState, useEffect } = require("react")
import useRequest from '../../hooks/use-request'
import {monthList} from '@iampetrovpavel/time'
import Router from "next/router";
import AdminLayout from '../../components/AdminLayout';

const AdminMain = ({initTickets}) => {
    const [title, setTitle] = useState('')
    const [directionId, setDirectionId] = useState()
    const [price, setPrice] = useState(0)
    const [count, setCount] = useState(8)
    const [month, setMonth] = useState((new Date()).getMonth()+1)
    const [year, setYear] = useState((new Date()).getFullYear())
    const [tickets, setTickets] = useState(initTickets)
    const {doRequest, errors} = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {title, directionId, price, count, month, year},
        onSuccess: (ticket) => {
            setTickets([...tickets, ticket])
        }
    })
    const {directions} = useDirections()
    useEffect(()=>{
        if(directions.length>0)setDirectionId(directions[0].id)
    }, [directions])
    function getDirectionName(directionId){
        const direction = directions.find(direction => direction.id === directionId)
        if(direction)return direction.name
        return 'Not found'
    }
    return (
        <AdminLayout>
            <div>
                <span>Title</span>
                <input value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                <select value={directionId} onChange={(e)=>{setDirectionId(e.target.value)}}>
                    {directions.map(direction=><option key={direction.id} value={direction.id}>{direction.name}</option>)}
                </select>
                <span>Price</span>
                <input value={price} onChange={(e)=>setPrice(e.target.value)}></input>
                <span>Count</span>
                <input value={count} onChange={(e)=>setCount(e.target.value)}></input>
                <span>Month</span>
                <select value={month} onChange={(e)=>{setMonth(e.target.value)}}>
                    {monthList.map((m, i)=><option key={m} value={i}>{m}</option>)}
                </select>
                <span>Year</span>
                <input value={year} onChange={(e)=>setYear(e.target.value)}></input>
                <button onClick={doRequest}>Create Ticket</button>
                <hr/>
                {errors}
                <ul>
                    {tickets.map(ticket=>(
                        <li key={ticket.id}>
                            {ticket.title}
                            |  {getDirectionName(ticket.directionId)}
                            |Users: {ticket.users && ticket.users.length} | Count: {ticket.count}| Month: {monthList[ticket.month]}| Year: {ticket.year}| Price: {ticket.price}руб
                        </li>
                    ))}
                </ul>
            </div>
        </AdminLayout>
    )
}

AdminMain.getInitialProps = async (ctx, client)=>{
    const res = await client.get('/api/tickets')
    return {initTickets: res.data}
}

const useDirections = () => {
    const [directions, setDirections] = useState([])
    const {doRequest, errors} = useRequest({
        url: '/api/directions',
        method: 'get',
        onSuccess: (data) => {
            setDirections(data)
        }
    })
    useEffect(()=>{
        doRequest()
    }, [])
    return {directions}
}

export default AdminMain