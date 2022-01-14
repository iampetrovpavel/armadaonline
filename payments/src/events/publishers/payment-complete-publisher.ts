import { Subjects, Publisher, PaymentCompleteEvent } from '@dallasstudio/common';

export class PaymentCompletePublisher extends Publisher<PaymentCompleteEvent> {
  subject: Subjects.PaymentComplete = Subjects.PaymentComplete;
}
