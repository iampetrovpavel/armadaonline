import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose'
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
import { PaymentCompletePublisher } from '../events/publishers/payment-complete-publisher';
import { natsWrapper } from '../nats-wrapper';
import { ukassa } from '../ukassa'
import { Mongoose } from 'mongoose';

const router = express.Router();

router.get(
  '/api/payments/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const {  orderId } = req.params;
    if (!mongoose.isValidObjectId(orderId)) {
      throw new BadRequestError('Invalid Id');
    }
    const order = await Order.findById(orderId);
    
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    // if (order.status === OrderStatus.Cancelled) {
    //   throw new BadRequestError('Order cancelled');
    // }
    if (order.status === OrderStatus.Complete) {
      return res.send(PaymentStatus.Succeeded)
    }

    const existPayment = await Payment.findOne({
      $and:[
        {orderId}, 
        {$or:[
          {status: PaymentStatus.Pending},
          // {status: PaymentStatus.Cancelled},
        ]}
      ]})

    if(!existPayment){
        throw new NotFoundError()
    }
    const ukassaPayment = await ukassa.check(existPayment.paymentId)

    if(ukassaPayment.type && ukassaPayment.type === "error"){
        throw new BadRequestError(ukassaPayment.description)
    }

    if (ukassaPayment.status === PaymentStatus.Succeeded) {
      existPayment.status = PaymentStatus.Succeeded
      await existPayment.save()
      order.status = OrderStatus.Complete
      await order.save()
      new PaymentCompletePublisher(natsWrapper.client).publish({
        id: existPayment.id,
        orderId: existPayment.orderId,
        paymentId: existPayment.paymentId,
      });
      return res.send(PaymentStatus.Succeeded)
    }

    if (ukassaPayment.status === PaymentStatus.Canceled) {
      existPayment.status = PaymentStatus.Canceled
      await existPayment.save()
      return res.send(PaymentStatus.Canceled)
    }
    return res.send(ukassaPayment.status)
  }
);

export { router as checkChargeRouter };
