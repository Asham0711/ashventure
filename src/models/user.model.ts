import mongoose, {Schema, Document} from 'mongoose';

export interface IUser extends Document{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    gender?: string;
    trips: mongoose.Types.ObjectId;
    blogs: mongoose.Types.ObjectId;
    token: string;
    resetTokenExpiry: Date;
    authProvider: string;
}

const UserSchema : Schema<IUser> = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: {type: String},
    gender: {type: String, enum: ["Male", "Female", "Other"], required: false},
    authProvider: { type: String, enum: ["credentials", "google"], default: "credentials",},
    token: {type: String, default: null},
    resetTokenExpiry: { type: Date, default: null },
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }],
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}]
},{
    timestamps:true
})

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;