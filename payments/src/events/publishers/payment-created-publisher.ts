import { Subjects, Publisher, PaymentCreatedEvent } from '@dallasstudio/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
