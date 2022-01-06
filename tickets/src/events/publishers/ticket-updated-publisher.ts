import { Publisher, Subjects, TicketUpdatedEvent } from '@dallasstudio/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
	readonly subject = Subjects.TicketUpdated
}