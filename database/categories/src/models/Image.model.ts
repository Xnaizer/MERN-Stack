import mongoose, { type ObjectId } from 'mongoose';

const Schema = mongoose.Schema;

enum StatusImage {
    TEMPORARY = "temporary",
    PERMANENT = "permanent"
}

enum UsedByImage {
    CATEGORY = "category",
    EVENT = "event",
    POST = "post",
}

export interface IImage {
    url: string;
    publicImgId: string;
    status: StatusImage;
    usedBy: UsedByImage;
    createdBy: ObjectId;
}

const ImageSchema = new Schema<IImage>({
    url: {
        type: Schema.Types.String,
        required: true
    },
    publicImgId: {
        type: Schema.Types.String,
        required: true
    },
    status: {
        type: Schema.Types.String,
        enum: [StatusImage.TEMPORARY, StatusImage.PERMANENT],
        default: StatusImage.TEMPORARY,
        index: true
    },
    usedBy: {
        type: Schema.Types.String,
        enum: Object.values(UsedByImage),
        default: null
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
});

ImageSchema.index({ status: 1, createdAt: 1});

const ImageModel = mongoose.model('Image', ImageSchema);
export default ImageModel;