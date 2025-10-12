import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: {
      type: String,
      enum: ["superadmin", "admin", "staff"],
      default: "admin",
    },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    subscriptionExpiry: Date,
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.matchPassword = function (p) {
  return bcrypt.compare(p, this.password);
};
export default mongoose.model("User", userSchema);
