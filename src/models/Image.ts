// import mongoose, {Document, Schema} from "mongoose";

// interface IImage  extends Document {
//     filename: string;
//     path: string;
//     _id: mongoose.Types.ObjectId;
// }

// let ImageSchema = new Schema<IImage>({
//     filename: { type: String, required: true },
//     path: { type: String, required: true },
// });

// const Image: mongoose.Model<IImage> = mongoose.model<IImage>('Offer', ImageSchema)

// export {IImage, Image}

import { Schema, model, Document } from 'mongoose';

export interface IImage extends Document {
    filename: string;
    path: string;
}

const ImageSchema = new Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
});

const Image = model<IImage>('Image', ImageSchema);

export default Image;
