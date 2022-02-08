import mongoose from 'mongoose'
import {updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface TicketAttrs {
	title: string,
	directionId: string,
	price: number,
	userId: string
	count: number,
	month: number,
	year: number,
}

interface TicketDoc extends mongoose.Document {
	title: string,
	directionId: string,
	price: number,
	userId: string,
	version: number,
	orderId?: string,
	users: string[]
}

interface TicketModel extends mongoose.Model<TicketDoc> {
	build(attrs: TicketAttrs): TicketDoc
}

const ticketSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	directionId: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	orderId: {
		type: String
	},
	count: {
		type: Number
	},
	month: {
		type: Number
	},
	year: {
		type: Number
	},
	users: {
		type: [mongoose.Types.ObjectId]
	}
}, {
	toJSON: {
		transform(doc, ret) {
			ret.id = ret._id
			delete ret._id
		}
	}
})

ticketSchema.set('versionKey', 'version')
ticketSchema.plugin(updateIfCurrentPlugin)

ticketSchema.statics.build = (attrs: TicketAttrs) => {
	return new Ticket(attrs)
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export { Ticket }