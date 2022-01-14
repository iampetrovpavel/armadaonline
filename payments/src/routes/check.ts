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
import { PaymentCompletePublisher } from '../events/publishers/payment-complete-publisher';
import { natsWrapper } from '../nats-wrapper';
import { ukassa } from '../ukassa'

const router = express.Router();

router.get(
  '/api/payments/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const {  orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Order cancelled');
    }

    const existPayment = await Payment.findOne({orderId})
    if(!existPayment){
        throw new NotFoundError()
    }

    const ukassaPayment = await ukassa.check(existPayment.paymentId)

    if(ukassaPayment.type && ukassaPayment.type === "error"){
        throw new BadRequestError(ukassaPayment.description)
    }

    new PaymentCompletePublisher(natsWrapper.client).publish({
        id: existPayment.id,
        orderId: existPayment.orderId,
        paymentId: existPayment.paymentId,
      });

    return res.send(ukassaPayment.status)
  }
);

export { router as checkChargeRouter };
