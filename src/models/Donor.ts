import mongoose, { Schema, Document } from "mongoose";

interface IDonor extends Document {
  name: string;
  age: number;
  gender: string;
  location: string;
  bloodType: string;
  availableOn: Date;
  slot: string;
  medicalHistory: string;
  donationEligibility: string;
}

const DonorSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  location: { type: String, required: true },
  bloodType: { type: String, required: true },
  availableOn: { type: Date, required: true },
  slot: { type: String, required: true },
  medicalHistory: { type: String, required: true },
  donationEligibility: { type: String, required: true },
});

const Donor = mongoose.model<IDonor>("Donor", DonorSchema);

export default Donor;
