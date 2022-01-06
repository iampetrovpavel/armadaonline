import { Publisher, Subjects, TicketCreatedEvent } from '@dallasstudio/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	readonly subject = Subjects.TicketCreated;
}