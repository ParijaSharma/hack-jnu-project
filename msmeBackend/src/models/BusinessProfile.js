import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  businessOwnerName: String,
  businessName: String,
  businessType: String,
  msmeCategory: String,
  city: String,
  state: String,
  email: String,
  mobileNumber: String,
  gstNumber: String,
  registrationDate: String,
  picture: String,

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Business", businessSchema);