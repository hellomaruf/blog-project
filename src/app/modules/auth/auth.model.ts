import { model, Schema } from "mongoose";
import { TUser } from "./auth.interface";
import bcrypt from "bcrypt";

const UserSchema: Schema<TUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// hash passoword ---------------->
UserSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(process.env.BCRYPT_SOLT_ROUND)
  );
  next();
});

UserSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const UserModel = model<TUser>("User", UserSchema);
