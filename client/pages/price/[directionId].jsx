import {useEffect, useState} from 'react'
import DirectionCart from '../../components/DirectionCart'
import data from '../../data'
import {monthList} from '@iampetrovpavel/time'
import useRequest from '../../hooks/use-request'
import useDirections from '../../hooks/use-directions'
import Router, {useRouter} from 'next/router'

const Price = ({currentUser}) => {
    const router = useRouter()
    const { directionId } = router.query
    // const [selected, Select] = useState(directionId)
    const [tickets, setTickets] = useState([])
    const {directions = []} = useDirections()
    const { doRequest: fetchTickets, errors } = useRequest({
        url: '/api/tickets',
        method: 'get',
        onSuccess: (tickets) => {
            console.log(directionId)
            setTickets(tickets.filter(t => (t.directionId === directionId)))
            console.log(tickets.filter(t => (t.directionId === directionId)))
        }
    })
    useEffect(()=>{
        fetchTickets()
    }, [directionId])
    if(directions.length === 0) return <h1>Loading directions...</h1>
    return (
        <>
            <ul className='sub mb-1 blue' style={{width:'100%'}}>
                {directions.map((direction, i) => (
                        <li style={{display: 'inline-block'}} key={directions.id} 
                            className={direction.id === directionId? 'selected shadow': 'shadow'}>
                            <a href="#" className='blue' onClick={()=>Router.push(`/price/${direction.id}`)}>{direction.name}</a>
                        </li>
                ))}
            </ul>
            <div className='row'>
                <div className='col-2 col-m-4'>
                    <DirectionCart direction={directions.find(d=>d.id === directionId)}/>
                </div>
                <div className='col-2 col-m-4 mt-m-1'>
                    <div className='row'>
                        {tickets.map(ticket =><div key={ticket.id} className='col-4 col-t-4 mb-1'><Ticket currentUser = {currentUser} ticket={ticket}/></div>)}
                    </div>
                </div>
            </div>
        </>

    )
}

export default Price

const Ticket = ({ticket, currentUser}) => {
    const { doRequest, errors } = useRequest({
        url: '/api/orders',
        method: 'post',
        body: {
            ticketId: ticket.id
        },
        onSuccess: (order) => {
            Router.push(`/auth/lk`)
        }
    })
    function handlePay() {
        if (!currentUser) Router.push('/auth/signup')
        doRequest()
    }
    return (
        <div className=''>
            <div className='card br-1 p-0'>
                <h3 className='m-0 back-blue p-1 brt-1 white'>{ticket.title}</h3>
                <div className='p-1'>
                    <p>{monthList[ticket.month]}</p>
                    Количество занятий: {ticket.count}
                    <h3>
                        Стоимость: {ticket.price} руб
                    </h3>
                    <div className='flex jce'>
                        <button className='button' onClick={handlePay}>Купить</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

