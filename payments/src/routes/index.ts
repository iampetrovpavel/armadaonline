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

router.get(
  '/api/payments',
  requireAuth,
  async (req: Request, res: Response) => {

    const payments = await Payment.find({})

    return res.send({payments})
  }
);

export { router as allPaymentsRouter };
