// import { Document, Schema, Model, model, NativeError } from "mongoose";

export class User {
    public name: string;
    public password: string;
    public email: string;
    public profilePicture: string;
    public description: string;
}

/*
export interface User {
    username: string;
    password: string;
    email: string;
    profilePicture: string;
    description: string;
}

export interface UserModel extends User, Document {
    passwordsMatch(password: string): boolean;
}

export let UserSchema: Schema = new Schema({
    username: String,
    password: String,
    email: String,
    profilePicture: String,
    description: String,
    created_at: Date,
});

UserSchema.pre("save", function(next: (err?: NativeError) => void) {
    let now = new Date();
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

UserSchema.methods.passwordsMatch = function(password: string) {
    return this.password === password;
};

export const User: Model<UserModel> = model<UserModel>("user", UserSchema);*/