import { useEffect, useState } from "react"
import useRequest from '../../hooks/use-request'
import Router from 'next/router'
import axios from 'axios'

const OrderShow = ({order}) => {
    const [timeLeft, setTimeLeft] = useState(0)

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date()
            setTimeLeft(Math.round(msLeft/1000))
        }
        findTimeLeft()
        const timerId = setInterval(findTimeLeft, 1000)
        return () => clearInterval(timerId)
    }, [order])

    const getToken = async () => {
        console.log("ORDER ", order)
        const {data} = await axios.post('/api/payments/token',{
            orderId: order.id
        })
        console.log("TOKEN ", data.token)
    }

    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body:{orderId: order.id},
        onSuccess: ({redirect}) => {
            if(redirect){
                Router.push(redirect)
            }
        }
    })

    const Pay = () => {
        doRequest()
    }

    const renderCheckout = (paymentToken) => {
        const checkout = new window.YooMoneyCheckoutWidget({
            confirmation_token: paymentToken,
            return_url: 'https://dallasstudio.ru/', 
            error_callback: function(error) {
                console.log(error)
            }
        });
        checkout.render('payment-form');
    }

    if (timeLeft < 0) {
        return <div>Order expired</div>
    }
    return (
        <div>
            Time left to pay: {timeLeft} seconds
            {errors}
            <div id="payment-form"></div>
            <button className="btn btn-success" onClick={getToken}>Pay with CreditCard</button>
        </div>
    )
}

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query
    const { data } = await client.get(`/api/orders/${orderId}`)
    return {order: data}
}

export default OrderShow