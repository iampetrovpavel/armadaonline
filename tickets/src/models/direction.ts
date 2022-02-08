import mongoose from 'mongoose'

interface DirectionAttrs {
    name: string;
    description: string;
    teacherId: string;
    img: string;
}

interface DirectionDoc extends mongoose.Document{
    name: string;
    description: string;
    teacherId: string;
    img: string;
}

interface DirectionModel extends mongoose.Model<DirectionDoc> {
    build(attrs: DirectionAttrs):DirectionDoc
}

const directionSchema = new mongoose.Schema({
        name: {type: String},
        description: {type: String},
        teacherId: {type: String},
        img: {type: String},
    }, {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
            }
        }
})

directionSchema.statics.build = (attrs: DirectionAttrs) => {
    return new Direction(attrs)
}

const Direction = mongoose.model<DirectionDoc, DirectionModel>('Direction', directionSchema)

export { Direction }