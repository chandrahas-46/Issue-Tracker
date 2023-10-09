import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
    title: { type: String, trim: true, required: true,},
    description: { type: String, trim: true, required: true,},
    author: { type: String, trim: true, required: true,},
    labels: [{ type: String, trim: true, required: true,},],
},
  {
    timestamps: true,
  }
);

export default mongoose.model('Issue', issueSchema);

