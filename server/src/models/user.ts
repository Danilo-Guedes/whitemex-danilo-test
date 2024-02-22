import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(
      this.password,
      Number(process.env.SALT_ROUNDS as string)
    );
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err as Error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
