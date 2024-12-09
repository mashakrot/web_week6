import mongoose, {Document, Schema} from "mongoose";
import { IImage } from "./Image";

interface IOffer extends Document {
    title: string;
    description: string;
    price: number;
    imageId?: mongoose.Types.ObjectId | IImage;
}

let offerSchema = new Schema<IOffer>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: "Image" }, 
});

const Offer: mongoose.Model<IOffer> = mongoose.model<IOffer>('Offer', offerSchema)

export {Offer, IOffer}