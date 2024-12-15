// import mongoose, {Document, Schema} from "mongoose";
// import { IImage } from "./Image";

// interface IOffer extends Document {
//     title: string;
//     description: string;
//     price: number;
//     imageId?: mongoose.Types.ObjectId | IImage;
// }

// let offerSchema = new Schema<IOffer>({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     imageId: { type: mongoose.Schema.Types.ObjectId, ref: "Image" }, 
// });

// const Offer: mongoose.Model<IOffer> = mongoose.model<IOffer>('Offer', offerSchema)

// export {Offer, IOffer}

import { Schema, model, Document } from 'mongoose';

export interface IOffer extends Document {
    title: string;
    description: string;
    price: number;
    imageId?: string; 
}


const OfferSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageId: { type: String, required: false },
});

const Offer = model<IOffer>('Offer', OfferSchema);

export default Offer;
