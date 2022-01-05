import { Publisher, Subjects, TicketCreatedEvent } from '@dallasstudio/common';__dirname

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	readonly subject = Subjects.TicketCreated;
}

// new TicketCreatedPublisher