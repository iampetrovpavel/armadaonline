import mongoose from 'mongoose';

interface TrialAttrs {
  name: string,
  phone: string
}

interface TrialDoc extends mongoose.Document {
    name: string,
    phone: string,
    createdAt: string
}

interface TrialModel extends mongoose.Model<TrialDoc> {
  build(attrs: TrialAttrs): TrialDoc;
}

const trialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    createdAt: {
      type: mongoose.Schema.Types.Date,
      default: new Date()
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

trialSchema.statics.build = (attrs: TrialAttrs) => {
  return new Trial(attrs);
};

const Trial = mongoose.model<TrialDoc, TrialModel>('Trial', trialSchema);

export { Trial };
