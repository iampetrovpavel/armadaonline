import Router from 'next/router'
import { useEffect, useState } from 'react'
import useRequest from '../../hooks/use-request'

const Lk = ({currentUser}) => {
    const [orders, setOrders] = useState([])
    const {doRequest: fetchOrders, errorsOrders} = useRequest({
        url:'/api/orders', method:'get',
        onSuccess: (data) => {
            setOrders(data)
        }
    })
    function fetch(){
        fetchOrders({query:`?${new URLSearchParams({userId:currentUser.id}).toString()}`})
    }
    const { doRequest: pay, errorsPay } = useRequest({
        url: '/api/payments',
        method: 'post',
        onSuccess: ({redirect}) => {
            if(redirect){
                Router.push(redirect)
            }
        }
    })
    const { doRequest: check, errorsCheck } = useRequest({
        url: '/api/payments',
        method: 'get',
        onSuccess: (status) => {
            fetch()
        }
    })
    useEffect(()=>{
        fetch()
    }, [])
    return (
        <div className='p-1'>
            <table className='card'>
                <thead>
                    <tr>
                        <th>Статус</th>
                        <th>Состав заказа</th>
                        <th>Стоимость</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    <Orders orders = {orders} pay = {pay} check = {check}/>
                </tbody>
            </table>
            <button className='button button-filled mt-1' onClick={()=>Router.push('/auth/signout')}>Выход</button>
        </div>
    )
}

const Orders = ({orders = [], pay, check}) => {
    return orders.map(({id, status, ticket}) => {

        return <Order id={id} status={status} ticket={ticket} check={check} pay={pay}/>
    })
}

const Order = ({id, status, ticket, check, pay}) => { 
    useEffect(()=>{
        if(status === 'created' || status === 'awaiting:payment') {
            check({params:'/'+id})
        }
    }, [])
    return (
    <tr key={id}>
        <td>{status === 'created'?'Создан': status === 'cancelled'?'Отменен': status === 'complete'?'Оплачен': status === 'awaiting:payment'?'Ожидает оплаты':''}</td>
        <td>{ticket.title}</td>
        <td>{ticket.price} руб</td>
        <td>{(status === 'created' || status === 'awaiting:payment') && 
        <button className='button button-filled' onClick={() => {pay({body:{orderId: id}})}}>Оплатить</button>}</td>
    </tr>
)}

export default Lk