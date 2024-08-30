import mongoose, { Schema, Document } from "mongoose";

interface IRequest extends Document {
  name: string;
  location: string;
  request: number;
}

const RequestSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  request: { type: Number, required: true },
});

const Request = mongoose.model<IRequest>("Request", RequestSchema);

export default Request;