import axios from 'axios'


export class Ukassa {
    api = 'https://api.yookassa.ru/v3/payments'
    idempotenceKey = null
    data = {
        "amount":{"value": "0.00","currency":"RUB"},
        "payment_method_data": {"type": "bank_card"},
        "confirmation": {"type": "redirect","return_url": "dallasstudio.ru/auth/lk"},
        "capture": true,
    }
    headers = {
            Authorization: 'Basic ' + process.env.UKASSA_AUTH,
            // Authorization: 'Basic ' + 'ODQxNzE4OmxpdmVfaHQ5ZHZ4MU54XzRwOEJPaTJHOGx1blU2ZE5mSll2MUJvbTRib2ZlQzJOOA==',
            'Idempotence-Key': '',
            'Content-Type': 'application/json'
    }
    pay = async (orderId: string, amount:string) => {
        console.log("ENV ",process.env.UKASSA_AUTH)
        console.log("ENV ",process.env.JWT_KEY)
        this.headers['Idempotence-Key'] = orderId
        this.data['amount']['value'] = amount
        const response = await axios.post(this.api, this.data, {headers: this.headers})
        return response.data
    }
    check = async (paymentId: string) => {
        const response = await axios.get(`${this.api}/${paymentId}`, {headers: this.headers})
        return response.data
    }
    getToken = async (orderId: string, amount:string) => {
        this.headers['Idempotence-Key'] = orderId
        this.data['amount']['value'] = amount
        const data = {
            "amount":{"value": "0.00","currency":"RUB"},
            "confirmation": {"type": "embedded"},
            "capture": true,
        }
        try{
            console.log("DATA ", this.data)
            const response = await axios.post(this.api, data, {headers: this.headers})
            return response
        }catch(err){
            console.log("CUSTOM ERROR", err)
        }
    }
}

export const ukassa = new Ukassa()