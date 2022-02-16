import {useEffect, useState} from 'react'
import DirectionCart from '../components/DirectionCart'
import data from '../data'
import {monthList} from '@iampetrovpavel/time'

const Price = () => {
    const [selected, Select] = useState(0)
    const [tickets, setTickets] = useState([])
    const {directions = []} = data
    useEffect(()=>{
        setTickets(data.tickets.filter(ticket => ticket.directionId === selected))
    }, [selected])
    return (
        <>
            <ul className='sub' style={{width:'100%'}}>
                {directions.map((directions, i) => (
                        <li style={{display: 'inline-block'}} key={directions.id} className={i === selected? 'selected': ''}>
                            <a href="#" onClick={()=>Select(i)}>{directions.name}</a>
                        </li>
                ))}
            </ul>
            <div className='row' style={{marginTop:'10px'}}>
                <div className='col-2 col-m-4'>
                    <DirectionCart direction={directions[selected]}/>
                </div>
                <div className='col-2 col-m-4'>
                    <div className='row'>
                        {tickets.map(ticket =><div key={ticket.title} className='col-2 col-t-4 mb-1'><Ticket  ticket={ticket}/></div>)}
                    </div>
                </div>
            </div>
        </>

    )
}

export default Price

const Ticket = ({ticket}) => {
    return (
        <div className='card p-2'>
            <h2 className=' mt-0'>{ticket.title}</h2>
            <p>{monthList[ticket.month]}</p>
            Количество занятий: {ticket.count}
            <h3>
                Стоимость: {ticket.price} руб
            </h3>
            <button>Купить</button>
        </div>
    )
}

