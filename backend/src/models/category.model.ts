import mongoose, { type ObjectId } from 'mongoose';
import * as Yup from 'yup';

const Schema = mongoose.Schema;

export const categoryDAO = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  icon: Yup.string().required(),
  iconId: Yup.string().required()
});

export type TCategory = Yup.InferType<typeof categoryDAO>;
export interface ICategory extends Omit<TCategory, 'iconId'>{
  iconId: ObjectId
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    icon: {
      type: Schema.Types.String,
      required: true,
    },
    iconId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Image'
    }
  },
  {
    timestamps: true,
  },
);

const CategoryModel = mongoose.model('Category', CategorySchema);

export default CategoryModel;
