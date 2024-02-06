import mongoose from 'mongoose';

import { fileConstant } from '@constants/index';

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = new Schema(
  {
    ...fileConstant,

    User: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    Products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default model("ProductVideo", schema);
