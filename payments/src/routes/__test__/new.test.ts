import mongoose from 'mongoose';
import request from 'supertest';
import { OrderStatus } from '@dallasstudio/common';
import { app } from '../../app';
import { Order } from '../../models/order';
import { ukassa } from '../../ukassa';
import { Payment } from '../../models/payment';

// it('returns a 404 when purchasing an order that does not exist', async () => {
//   await request(app)
//     .post('/api/payments')
//     .set('Cookie', global.signin())
//     .send({
//       orderId: mongoose.Types.ObjectId().toHexString(),
//     })
//     .expect(404);
// });

// it('returns a 401 when purchasing an order that doesnt belong to the user', async () => {
//   const order = Order.build({
//     id: mongoose.Types.ObjectId().toHexString(),
//     userId: mongoose.Types.ObjectId().toHexString(),
//     version: 0,
//     price: 20,
//     status: OrderStatus.Created,
//   });
//   await order.save();

//   await request(app)
//     .post('/api/payments')
//     .set('Cookie', global.signin())
//     .send({
//       orderId: order.id,
//     })
//     .expect(401);
// });

// it('returns a 400 when purchasing a cancelled order', async () => {
//   const userId = mongoose.Types.ObjectId().toHexString();
//   const order = Order.build({
//     id: mongoose.Types.ObjectId().toHexString(),
//     userId,
//     version: 0,
//     price: 20,
//     status: OrderStatus.Cancelled,
//   });
//   await order.save();

//   await request(app)
//     .post('/api/payments')
//     .set('Cookie', global.signin(userId))
//     .send({
//       orderId: order.id,
//     })
//     .expect(400);
// });

it('returns a 302 with valid inputs', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const price = Math.floor(Math.random() * 100000);
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin(userId))
    .send({
      orderId: order.id,
    })
  expect(302)

  const payment = await Payment.findOne({
    orderId: order.id,
  });
  expect(payment).not.toBeNull();

  const ukassaPayment = await ukassa.check(payment!.paymentId)
  
  expect(ukassaPayment!.status).toEqual('pending');
});
