import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
    email:String,
    image:String,
    pdf:String,
    title:String,
    provider:String,
    Date:String
});

export const Certs = mongoose.model('certs', blogSchema)