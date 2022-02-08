import mongoose from 'mongoose'

const enum Days {
    'Sunday' = 0,
    'Monday' = 1,
    'Tuesday' = 2,
    'Wednesday' = 3,
    'Thursday' = 4,
    'Friday' = 5,
    'Saturday' = 6
}

interface ScheduleAttrs {
    day: Days;
    hour: number;
    minutes: number;
    directionId: string;
}

interface ScheduleDoc extends mongoose.Document{
    day: Days;
    hour: number;
    minutes: number;
    directionId: string;
}

interface ScheduleModel extends mongoose.Model<ScheduleDoc> {
    build(attrs: ScheduleAttrs):ScheduleDoc
}

const scheduleSchema = new mongoose.Schema({
    day: {type: Number},
    hour: {type: Number},
    minutes: {type: Number},
    directionId: {type: mongoose.Types.ObjectId},
    }, {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
            }
        }
})

scheduleSchema.statics.build = (attrs: ScheduleAttrs) => {
    return new Schedule(attrs)
}

const Schedule = mongoose.model<ScheduleDoc, ScheduleModel>('Schedule', scheduleSchema)

export { Schedule, Days }