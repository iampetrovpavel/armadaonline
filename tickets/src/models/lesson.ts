import mongoose from 'mongoose'

interface LessonAttrs {
	directionId: string,
	date: string
	teacherId: string,
	// studentsId: string[],
}

interface LessonDoc extends mongoose.Document {
	directionId: string,
	date: string
	teacherId: string,
	studentsId: string[],
}

interface LessonModel extends mongoose.Model<LessonDoc> {
	build(attrs: LessonAttrs): LessonDoc
}

const lessonSchema = new mongoose.Schema({
	directionId: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	teacherId: {
		type: String,
		required: true
	},
	studentsId: {
		type: [String],
		default: []
	},
}, {
	toJSON: {
		transform(doc, ret) {
			ret.id = ret._id
			delete ret._id
		}
	}
})

lessonSchema.set('versionKey', 'version')

lessonSchema.statics.build = (attrs: LessonAttrs) => {
	return new Lesson(attrs)
}

const Lesson = mongoose.model<LessonDoc, LessonModel>('Lesson', lessonSchema)

export { Lesson }