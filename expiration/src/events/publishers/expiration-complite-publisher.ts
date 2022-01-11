import { Publisher, ExpirationCompliteEvent, Subjects } from '@dallasstudio/common';

export class ExpirationComplitePublisher extends Publisher<ExpirationCompliteEvent> {
    readonly subject = Subjects.ExpirationComplite;
}