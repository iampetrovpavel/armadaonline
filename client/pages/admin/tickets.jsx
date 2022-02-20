const { useState, useEffect } = require("react")
import {monthList} from '@iampetrovpavel/time'
import Router from "next/router";
import AdminLayout from '../../components/AdminLayout';
import useDirections from '../../hooks/use-directions'
import useTickets from '../../hooks/use-tickets'

const AdminMain = ({initTickets, url}) => {
    const { tickets, createTicket, ticketsErrors } = useTickets([])
    const { directions } = useDirections()
    const [newTicketForm, showNewTicketForm] = useState(false)

    function getDirectionName(directionId){
        const direction = directions.find(direction => direction.id === directionId)
        if(direction)return direction.name
        return 'Not found'
    }

    return (
        <AdminLayout url = {url}>
                {newTicketForm ?<NewTicket createTicket={createTicket} directions={directions} close={()=>showNewTicketForm(false)}/>
                    :<button className='button button-filled' onClick={()=>showNewTicketForm(true)}>Создать</button>}
                <hr/>
                { ticketsErrors }
                <ul>
                    {tickets.map(ticket=>(
                        <li key={ticket.id}>
                            {ticket.title}
                            |  {getDirectionName(ticket.directionId)}
                            |Users: {ticket.users && ticket.users.length} | Count: {ticket.count}| Month: {monthList[ticket.month]}| Year: {ticket.year}| Price: {ticket.price}руб
                        </li>
                    ))}
                </ul>
        </AdminLayout>
    )
}

const NewTicket = ({createTicket, directions, close}) => {
    const [directionId, setDirectionId] = useState()
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [count, setCount] = useState(8)
    const [month, setMonth] = useState((new Date()).getMonth()+1)
    const [year, setYear] = useState((new Date()).getFullYear())
    const nowYear = (new Date()).getFullYear()
    
    useEffect(()=>{
        if(directions.length>0)setDirectionId(directions[0].id)
    }, [directions])

    function handleCreateTicket (){
        createTicket({body: {title, directionId, price, count, month, year}})
    }
    return (
        <table>
            <tbody>
                <tr>
                    <th>Название</th>
                    <td>
                        <input  className='mr-1' value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                    </td>
                </tr>
                <tr>
                    <th>
                        Направления
                    </th>
                    <td>
                        {directions.length === 0?<span className='mr-1'>Нет направлений</span>:
                        <select value={directionId} onChange={(e)=>{setDirectionId(e.target.value)}}>
                            {directions.map(direction=><option key={direction.id} value={direction.id}>{direction.name}</option>)}
                        </select>}
                    </td>
                </tr>
                <tr>
                    <th>Цена</th>
                    <td>
                        <input value={price} onChange={(e)=>setPrice(e.target.value)}></input>
                    </td>
                </tr>
                <tr>
                    <th>Количество занятий</th>
                    <td>
                        <input value={count} onChange={(e)=>setCount(e.target.value)}></input>
                    </td>
                </tr>
                <tr>
                    <th>Месяц</th>
                    <td>
                        <select value={month} onChange={(e)=>{setMonth(e.target.value)}}>
                            {monthList.map((m, i)=><option key={m} value={i}>{m}</option>)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Год</th>
                    <td>
                        <select value={year} onChange={(e)=>{setYear(e.target.value)}}>
                            {[nowYear, nowYear+1].map((y, i)=><option key={y} value={y}>{y}</option>)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>
                    </th>
                    <td>
                        <button className='button button-filled mr-1' onClick={handleCreateTicket}>Создать</button>
                        {/* <button className='button' onClick={close}>Отмена</button> */}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

AdminMain.getInitialProps = async (ctx, client)=>{
    const res = await client.get('/api/tickets')
    return {initTickets: res.data}
}

export default AdminMain