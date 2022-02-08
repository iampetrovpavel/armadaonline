import { Publisher, OrderCompliteEvent, Subjects } from '@dallasstudio/common'

export class OrderComplitePublisher extends Publisher<OrderCompliteEvent> {
	readonly subject= Subjects.OrderComplite
}