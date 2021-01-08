import { model, Schema } from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
        required: 'Name is required.'
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    bio: {
        type: String,
        required: 'Bio is required.'
    },
    profilePic: {
        type: String,
        required: 'Profile Picture is required.'
    },
    businessId: [{
        type: Schema.Types.ObjectId,
        ref: 'business'
    }],
    productId:[{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }]
}, { timestamps: true });

schema.index({ email: -1 }, function (err, result) {
    if (err) console.log(`getting error to create index in user Model`)
    else console.log(`Indexing created for email Field in user Model.`)
})

const user = model('user', schema);
export default user;