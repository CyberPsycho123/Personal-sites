import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
    email:String,
    image:String,
    title:String,
    desc:String,
    gitlink:String
});

export const Projects = mongoose.model('projects', blogSchema)