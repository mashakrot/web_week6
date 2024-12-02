import mongoose, {Document, Schema} from "mongoose";

interface ITodo extends Document {
    todo: string;
    checked: boolean;
}

interface IUser extends Document {
    name: string;
    todos: ITodo[];
}

let todoSchema = new Schema<ITodo>({
    todo: { type: String, required: true },
    checked: { type: Boolean, default: false }, 
});

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    todos: { type: [todoSchema], required: true },
});

const User: mongoose.Model<IUser> = mongoose.model<IUser>('User', userSchema)

export {User, ITodo, IUser}