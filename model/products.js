import { model, Schema } from 'mongoose';

const schema = new Schema({
    name: {
        type: String, required: true
    },
    mrp: {
        type: Number, required: true
    },
    description: {
        type: String, required: true
    },
    image2: {
        type: String, required: true
    },
    userId:{
        type: String
    },
    businessId:{
        type: String
    }
}, { timestamps: true });

schema.index({ name: -1 }, function (err, result) {
    if (err) console.log(`getting error to create index in product Model`)
    else console.log(`Indexing created for name Field in product Model.`)
})

const product = model('product', schema);
export default product;
