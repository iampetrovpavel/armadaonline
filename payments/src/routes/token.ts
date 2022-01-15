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
import axios from 'axios';

const router = express.Router();

router.post(
  '/api/payments/token',
  requireAuth,
  async (req: Request, res: Response) => {
    const {  orderId } = req.body;
    console.log("ORDERID ", orderId)
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
    if (order.status === OrderStatus.Complete) {
        throw new BadRequestError('Order complited');
    }

    const data = await ukassa.getToken(orderId, "12.00")
    console.log("DATA ", data);
    return res.send({})
  }
);

export { router as tokenRouter };
