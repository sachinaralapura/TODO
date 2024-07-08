import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    userName: String

})


export const userModel = mongoose.model("User", userSchema);
