import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  ValidateRequest,
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  PaymentStatus
} from '@dallasstudio/common';
import { Order } from '../models/order';
import { Payment } from '../models/payment';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import { ukassa } from '../ukassa'

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('orderId').not().isEmpty()],
  ValidateRequest,
  async (req: Request, res: Response) => {
    const {  orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Cannot pay for an cancelled order');
    }
    if (order.status === OrderStatus.Complete) {
      throw new BadRequestError('Cannot pay for an complite order');
    }

    const existPayment = await Payment.findOne({
      $and:[
        {orderId}, 
        {$or:[
          {status: PaymentStatus.Pending},
          // {status: PaymentStatus.Cancelled},
        ]}
      ]})

    if(existPayment && (existPayment.status === PaymentStatus.Pending)){
      // return res.redirect(existPayment.confirmation_url)
      return res.send({redirect: existPayment.confirmation_url})
    }

    const idempotenceKey = Math.floor(new Date().getTime() + (Math.random() * 10000)).toString()

    const ukassaPayment = await ukassa.pay(idempotenceKey, order.price.toString())

    if(!ukassaPayment || !ukassaPayment.confirmation || !ukassaPayment.confirmation.confirmation_url){
      throw new BadRequestError('Ukassa confirmation error!');
    }

    const payment = Payment.build({
      orderId,
      paymentId: ukassaPayment.id,
      confirmation_url: ukassaPayment.confirmation.confirmation_url,
      paid: ukassaPayment.paid,
      status: PaymentStatus.Pending,
      idempotenceKey
    });

    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      paymentId: payment.paymentId,
    });

    return res.send({redirect: ukassaPayment.confirmation.confirmation_url})
  }
);

export { router as createChargeRouter };
