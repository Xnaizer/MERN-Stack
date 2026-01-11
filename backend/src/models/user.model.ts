import mongoose from 'mongoose';
import { encrypt } from '../utils/encryption';
import { renderMailHtml, sendEmail } from '../utils/mail/mail';
import { CLIENT_HOST, EMAIL_SMTP_USER } from '../utils/env';
import { ROLES } from '../utils/constant';
import { IUser } from '../utils/interfaces';

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: Schema.Types.String,
      required: true,
    },
    username: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    role: {
      type: Schema.Types.String,
      enum: [ROLES.ADMIN, ROLES.MEMBER],
      default: ROLES.MEMBER,
    },
    profilePicture: {
      type: Schema.Types.String,
      default: 'user.jpg',
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: false,
    },
    activationCode: {
      type: Schema.Types.String,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  try {
    this.password = await encrypt(this.password);
    this.activationCode = await encrypt(this.id);
    next();
  } catch (error) {
    next(error as Error);
  }
});

UserSchema.post('save', function (doc, next) {
  const user = doc;

  setImmediate(async () => {
    try {
      console.log('Send email to:', user.email);

      const contentMail = await renderMailHtml('registration-success.ejs', {
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt,
        activationLink: `${CLIENT_HOST}/auth/activation?code=${user.activationCode}`,
      });

      await sendEmail({
        from: EMAIL_SMTP_USER,
        to: user.email,
        subject: 'Aktivasi Akun Anda',
        content: contentMail,
      });
    } catch (error) {
      console.log(error);
    }
  });

  next();
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
