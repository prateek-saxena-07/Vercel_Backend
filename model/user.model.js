import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String, default:'' },
    subscribers: { type: Number, default: 0 },
    channel_name: { type: String ,default:''},
    handle: { type: String },
    profileImg: { type: String },
    banner:{type:String}

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
