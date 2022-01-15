import mongoose from 'mongoose';
import { PaymentStatus } from '@dallasstudio/common'

interface PaymentAttrs {
  orderId: string;
  paymentId: string;
  confirmation_url: string,
  paid: boolean,
  status: PaymentStatus,
  idempotenceKey: string
}

interface PaymentDoc extends mongoose.Document {
  orderId: string;
  paymentId: string;
  confirmation_url: string,
  idempotenceKey: string,
  status: PaymentStatus,
}

interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc;
}

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      required: true,
      type: String,
    },
    paymentId: {
      required: true,
      type: String,
    },
    confirmation_url: String,
    idempotenceKey: String,
    status: String
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

paymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  'Payment',
  paymentSchema
);

export { Payment };
