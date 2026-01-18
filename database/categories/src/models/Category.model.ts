import mongoose from 'mongoose';

export type TCategory = {
    name: string;
    description: string;
    icon: string;
}

const Schema = mongoose.Schema;

const CategorySchema = new Schema<TCategory>(
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
  },
  {
    timestamps: true,
  },
);

const CategoryModel = mongoose.model('Category', CategorySchema);

export default CategoryModel;
