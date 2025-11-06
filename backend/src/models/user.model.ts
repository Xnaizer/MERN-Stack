import mongoose from "mongoose";
import { encrypt } from "../utils/encryption";
import { renderEmailHtml, sendEmail } from "../utils/mail/mail";
import { CLIENT_HOST, EMAIL_SMTP_USER } from "../utils/env";



export interface IUser {
    fullName: string;
    username: string;
    email: string;
    password: string;
    role: string;
    profilePicture: string;
    isActive: boolean;
    activationCode: string;
    createdAt?: string;
}

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser>({
    fullName: {
        type : Schema.Types.String,
        required: true
    },
    username: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    role: {
        type: Schema.Types.String,
        enum: ['admin', 'user']
    },
    profilePicture: {
        type: Schema.Types.String,
        default: "user.jpg",
    },
    isActive: {
        type: Schema.Types.Boolean,
        default: false
    },
    activationCode: {
        type: Schema.Types.String
    }
},{
    timestamps: true,
});


UserSchema.pre("save", function(next) {
    const user = this;
    user.password = encrypt(user.password);
    next();
});

UserSchema.post("save", async function(doc, next){
    try {
        const user = doc as IUser;

        console.log("Send Email to: ", user.email);

        const contentEmail = await renderEmailHtml("registration.success.ejs", {
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            createdAt: user.createdAt,
            activationLink: `${CLIENT_HOST}/auth/activation?code=${user.activationCode}`
        });

        await sendEmail({
            from: EMAIL_SMTP_USER,
            to: user.email,
            subject: "Activation Your Account App",
            content: contentEmail
        });
        console.log("✅ Activation email sent successfully");
    } catch (error) {
        console.log("error: ", error)
    } finally {
        next();
    }

});

UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
}

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;