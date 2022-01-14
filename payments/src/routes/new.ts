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
    const charge = await ukassa.pay(orderId, "2.00")

    if(!charge || !charge.confirmation || !charge.confirmation.confirmation_url){
      if(charge.status === 'cancelled'){
        console.log("Order cancelled by Ukassa!")
      }
      throw new BadRequestError('Ukassa confirmation error!');
    }
    const existPayment = await Payment.findOne({orderId})
    if(existPayment !== null){
      console.log("Payment exist!")
      return res.redirect(existPayment.confirmation_url)
    }

    const payment = Payment.build({
      orderId,
      paymentId: charge.id,
      confirmation_url: charge.confirmation.confirmation_url,
      paid: charge.paid,
      status: charge.status,
    });

    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      paymentId: payment.paymentId,
    });

    return res.redirect(charge.confirmation.confirmation_url)
  }
);

export { router as createChargeRouter };
