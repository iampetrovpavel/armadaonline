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
    const { doRequest: pay, errorsPay } = useRequest({
        url: '/api/payments',
        method: 'post',
        // body:{orderId: order.id},
        onSuccess: ({redirect}) => {
            if(redirect){
                Router.push(redirect)
            }
        }
    })
    useEffect(()=>{
        fetchOrders({query:`?${new URLSearchParams({userId:currentUser.id}).toString()}`})
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
                    <Orders orders = {orders} pay = {pay}/>
                </tbody>
            </table>
            <button className='button button-filled mt-1' onClick={()=>Router.push('/auth/signout')}>Выход</button>
        </div>
    )
}

const Orders = ({orders = [], pay}) => orders.map(({id, status, ticket}) => (
    <tr>
        <td>{status === 'created'?'Создан': status === 'cancelled'?'Отменен': status === 'complete'?'Завершен': status === 'awaiting:payment'?'Ожидает оплаты':''}</td>
        <td>{ticket.title}</td>
        <td>{ticket.price} руб</td>
        <td>{(status === 'created' || status === 'awaiting:payment') && 
        <button className='button button-filled' onClick={() => {pay({body:{orderId: id}})}}>Оплатить</button>}</td>
    </tr>
))

export default Lk