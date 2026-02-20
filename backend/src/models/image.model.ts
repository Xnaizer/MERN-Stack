import mongoose, { type ObjectId } from 'mongoose';
import * as Yup from 'yup';

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

const _ImageDAO = Yup.object({
    url: Yup.string().required(),
    publicImgId: Yup.string().required(),
    status: Yup.mixed<StatusImage>()
        .oneOf(Object.values(StatusImage))
        .default(StatusImage.TEMPORARY),

    usedBy: Yup.mixed<UsedByImage>()
        .oneOf(Object.values(UsedByImage))
        .nullable()
        .default(null),
    createdBy: Yup.string().required()
})

export type TImage = Yup.InferType<typeof _ImageDAO>;

export interface IImage extends Omit<TImage, 'createdBy'>{
    createdBy: ObjectId
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


// seharusnya menambahkan expiredAt tapi kelupaan
