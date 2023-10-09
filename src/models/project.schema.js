import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true,},
    description: { type: String, required: true,},
    author: { type: String, required: true, },
    issues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue',},],
    labels: [{ type: String,},],
},
  {
    timestamps: true,
  }
);

export default mongoose.model('Project', projectSchema);
