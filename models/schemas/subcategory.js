import { Schema } from 'mongoose';

const subcategorySchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      require: true,
    },
    subCategoryName: {
      type: String,
      require: true,
    },
  },
  {
    collection: 'subcategories',
  },
);

export default subcategorySchema;
