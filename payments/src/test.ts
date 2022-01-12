import { YooCheckout, ICreatePayment  } from '@a2seven/yoo-checkout';

const checkout = new YooCheckout({ shopId: '841718', secretKey: 'live_ht9dvx1Nx_4p8BOi2G8lunU6dNfJYv1Bom4bofeC2N8' });

const idempotenceKey = Math.floor(Math.random()*1000000).toString();

const createPayload: ICreatePayment = {
    amount: {
        value: '2.00',
        currency: 'RUB'
    },
    payment_method_data: {
        type: 'bank_card'
    },
    confirmation: {
        type: 'redirect',
        return_url: 'yandex.ru'
    },
};
// @ts-ignore
const run = async () => {
    try {
        const payment = await checkout.createPayment(createPayload, idempotenceKey);
        console.log(payment)
        const createdPayment = await checkout.getPayment(payment.id);
        console.log(createdPayment)
    } catch (error) {
         console.error(error);
    }
    return
}

run()

