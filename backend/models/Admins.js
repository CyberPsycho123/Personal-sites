import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
    email:String,
    password:String
});

export const Admins = mongoose.model('admins', blogSchema)