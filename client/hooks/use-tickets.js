import { useState, useEffect } from 'react'
import useRequest from './use-request'

const useTickets = (initTickets) => {
    const [tickets, setTickets] = useState(initTickets)
    const {doRequest, errors} = useRequest({
        url: '/api/tickets',
        method: 'post',
        // body: {title, directionId, price, count, month, year},
        onSuccess: (ticket) => {
            setTickets([...tickets, ticket])
        }
    })
    return { tickets, createTicket: doRequest, ticketsErrors: errors}
}

export default useTickets