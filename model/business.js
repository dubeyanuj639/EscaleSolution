import { model, Schema } from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    registrationNo: {
        type: String,
        required: true,
        unique: true
    },
    productId: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }]
}, { timestamps: true });

schema.index({ email: -1 }, function (err, result) {
    if (err) console.log(`getting error to create index in business Model`)
    else console.log(`Indexing created for email Field in business Model.`)
})

const business = model('business', schema);
export default business;
